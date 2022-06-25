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
import { saveCurrentUser } from '../../../features/users/usersSlice';

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
        let signInUser = {};
        let currentAuthUser = {};
        let currentUserInfo = {};
        let currentSession = {};
        // this loading feature prevents user from sending another request before the first one returns
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            console.log('username:', data.username);
            console.log('password:', data.password);
            Auth.signIn(data.username, data.password)
                .then((response) => {
                    console.log('login response:', response);
                    signInUser = response.attributes;
                    let currentUser = {
                        uid: response.attributes.sub,
                        username: response.username,
                        email: response.attributes.email,
                        groups: response.signInUserSession.idToken.payload[
                            'cognito:groups'
                        ],
                        jwtToken: response.signInUserSession.idToken.jwtToken,
                    };
                    console.log('currentUser (derived)', currentUser);
                    dispatch(saveCurrentUser(currentUser));
                })
                .catch((err) => {
                    console.log(
                        'Error getting current user database values: ',
                        err
                    );
                });
        } catch (error) {
            Alert.alert('Error\n' + error.message + '\nSIS:71');
        }
        setLoading(false);
        // console.log(data);
        // //todo validate user
        // navigation.navigate('Home');
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
