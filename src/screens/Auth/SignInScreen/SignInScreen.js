import {
    View,
    Image,
    ScrollView,
    StyleSheet,
    useWindowDimensions,
    Alert,
} from 'react-native';
import React, { useState } from 'react';
import Logo from '../../../../assets/images/P8-Logo150.png';
import CustomInput from '../../../components/ui/CustomInput';
import CustomButton from '../../../components/ui/Auth/CustomButton/CustomButton';
import SocialSignInButtons from '../../../components/ui/Auth/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { updateCurrentUser } from '../../../features/users/usersSlice';
import { getProfile } from '../../../providers/users';

const SignInScreen = () => {
    const [loading, setLoading] = useState(false);
    const { height } = useWindowDimensions();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    console.log('Errors', errors);
    // need this to pass the username on to forgot password
    const user = watch('username');
    const onSignInPressed = async (data) => {
        const { username, password } = data;
        let alertPayload = {};
        // this loading feature prevents user from sending another request before the first one returns
        if (loading) {
            return;
        }
        setLoading(true);
        // authenticate with AWS cognito
        let setAlert = {};
        await Auth.signIn(username, password)
            .then((user) => {
                if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
                    Auth.completeNewPassword(
                        username, // the Cognito User Object
                        password,
                        []
                    )
                        .then((user) => {
                            // at this time the user is logged in if no MFA required
                            console.log(user);
                        })
                        .catch((e) => {
                            const alertPayload = {
                                msg: 'Authentication failed. Please check your credentials',
                                alertType: 'danger',
                            };
                            setAlert(alertPayload);
                            console.log(' need to return');
                            // return;
                        });
                } else {
                    // console.log('the user is good...');
                }
            })
            .catch((e) => {
                switch (e.code) {
                    case 'UserNotFoundException':
                        alertPayload = {
                            msg: e.message,
                            alertType: 'danger',
                        };
                        break;
                    case 'PasswordResetRequiredException':
                        alertPayload = {
                            msg: e.message,
                            alertType: 'danger',
                        };
                        break;
                    case 'NotAuthorizedException':
                        alertPayload = {
                            msg: e.message,
                            alertType: 'danger',
                        };
                        break;
                    default:
                        alertPayload = {
                            msg: 'Signin error: [' + e.message + ']',
                            alertType: 'danger',
                        };
                        break;
                }
            });
        // if we have error loaded, let's return
        if (alertPayload.msg) {
            Alert.alert(alertPayload.msg);
            alertPayload = {};
            setLoading(false);
            return;
        }
        let currentUserInfo = {};
        let currentSession = {};
        await Auth.currentUserInfo().then((u) => {
            currentUserInfo = u;
        });
        await Auth.currentSession().then((data) => {
            currentSession = data;
        });

        //   WAIT
        let i = currentSession?.idToken?.payload?.sub;
        let u = currentSession?.idToken?.payload['cognito:username'];
        let e = currentSession?.idToken?.payload?.email;
        let j = currentSession?.idToken?.jwtToken;
        let g = currentSession?.idToken?.payload['cognito:groups'];
        let theUser = {};

        theUser.uid = i;
        theUser.username = u;
        theUser.email = e;
        theUser.jwtToken = j;
        theUser.groups = g;

        // console.log('theUser: ', theUser);
        let fullUserInfo = {};
        await getProfile(theUser.uid).then((profileResponse) => {
            // console.log('profileResponse', profileResponse);
            switch (profileResponse.statusCode) {
                case 200:
                    // profile found
                    let profileInfo = profileResponse.userProfile;
                    fullUserInfo = { ...theUser, ...profileInfo };
                    fullUserInfo.profile = true;
                    break;
                case 404:
                    // no profile for uid
                    fullUserInfo = theUser;
                    fullUserInfo.profile = false;
                default:
                    // we should get the error code, message and error
                    console.log('StatusCode: ', profileResponse.statusCode);
                    console.log('Message: ', profileResponse.message);
                    console.log('Error:', profileResponse.error);
                    // Alert.alert('Error getting the profile information');
                    fullUserInfo = theUser;
                    break;
            }
            dispatch(updateCurrentUser(fullUserInfo));

            //====================================
            setLoading(false);
            return;
        });
    };
    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
    };
    const forgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword', { user });
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image
                    source={Logo}
                    styles={[styles.logo, { height: height * 0.3 }]}
                    resizeMode='stretch'
                />
                <CustomInput
                    name='username'
                    rules={{
                        required: 'Username is required',
                        minLength: {
                            value: 6,
                            message: 'Username minimum length is 6',
                        },
                    }}
                    placeholder='Username'
                    control={control}
                />
                <CustomInput
                    name='password'
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 3,
                            message: 'Password length too short',
                        },
                    }}
                    placeholder='Password'
                    control={control}
                    secureTextEntry
                />

                <CustomButton
                    text={loading ? 'Loading...' : 'Sign In'}
                    onPress={handleSubmit(onSignInPressed)}
                />
                <CustomButton
                    text='Forgot Password'
                    onPress={forgotPasswordPressed}
                    type='TERTIARY'
                />
                <SocialSignInButtons />
                <CustomButton
                    text="Don't have an account? Create one"
                    onPress={onSignUpPressed}
                    type='TERTIARY'
                />
            </View>
        </ScrollView>
    );
};

export default SignInScreen;
const styles = StyleSheet.create({
    root: {
        // flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 80,
        // width: '100%',
        marginHorizontal: 20,
    },
    logo: {
        width: '70%',
        maxheight: 400,
        maxWidth: 400,
    },
});
