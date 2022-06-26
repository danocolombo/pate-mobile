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
import { authenticateUser, appendUserProfile } from '../../../actions/auth';
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

        // this loading feature prevents user from sending another request before the first one returns
        if (loading) {
            return;
        }
        setLoading(true);
        // authenticate with AWS cognito
        let authResponse = await authenticateUser(username, password);
        if (authResponse.status === 404) {
            //todo --- Show modal that login failed.
            return;
        }
        if (authResponse.status === 400) {
            //todo ---- system error
            return;
        }
        if (authResponse.status !== 200) {
            //todo --- show an error
            return;
        }
        let signedInUser = authResponse.user;
        // get the user profile information
        let profileCheckResponse = await appendUserProfile(signedInUser);
        if (
            profileCheckResponse.status === 200 ||
            profileCheckResponse.status === 404
        ) {
            //user needs to be saved. status will determine navigation
            dispatch(updateCurrentUser(profileCheckResponse.user));
            if (profileCheckResponse.status === 200) {
                navigation.navigate('Home');
            } else {
                navigation.navigate('Profile', {
                    dialogAction: 'FINISH_PROFILE',
                });
            }
        } else {
            Alert.alert('System Error');
            return;
        }

        //====================================
        setLoading(false);
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
