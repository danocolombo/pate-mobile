import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../../../components/ui/CustomInput';
import CustomButton from '../../../components/ui/Auth/CustomButton/CustomButton';
import SocialSignInButtons from '../../../components/ui/Auth/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
    const { loading, setLoading } = useState(false);
    const { control, handleSubmit, watch } = useForm();
    const pwd = watch('password');
    const navigation = useNavigation();

    const onRegisterPressed = async (data) => {
        if (loading) {
            return;
        }
        //setLoading(true);
        const { username, password, email, name } = data;
        try {
            const response = await Auth.signUp({
                username,
                password,
                attributes: { email, name, preferred_username: username },
            });
            console.log('response', response);
            navigation.navigate('ConfirmEmail', { username });
        } catch (e) {
            Alert.alert('Yikes', e.message);
        }
        //setLoading(false);
    };

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    };

    const onTermsOfUsePressed = () => {
        console.warn('onTermsOfUsePressed');
    };

    const onPrivacyPressed = () => {
        console.warn('onPrivacyPressed');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Create an account</Text>

                <CustomInput
                    name='name'
                    control={control}
                    placeholder='Name'
                    rules={{
                        required: 'Name is required',
                        minLength: {
                            value: 6,
                            message:
                                'Name should be at least 6 characters long',
                        },
                        maxLength: {
                            value: 24,
                            message: 'Name should be max 24 characters long',
                        },
                    }}
                />

                <CustomInput
                    name='username'
                    control={control}
                    placeholder='Username'
                    rules={{
                        required: 'Username is required',
                        minLength: {
                            value: 6,
                            message:
                                'Username should be at least 6 characters long',
                        },
                        maxLength: {
                            value: 24,
                            message:
                                'Username should be max 24 characters long',
                        },
                    }}
                />
                <CustomInput
                    name='email'
                    control={control}
                    placeholder='Email'
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: EMAIL_REGEX,
                            message: 'Email is invalid',
                        },
                    }}
                />
                <CustomInput
                    name='password'
                    control={control}
                    placeholder='Password'
                    secureTextEntry
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message:
                                'Password should be at least 8 characters long',
                        },
                    }}
                />
                <CustomInput
                    name='password-repeat'
                    control={control}
                    placeholder='Repeat Password'
                    secureTextEntry
                    rules={{
                        validate: (value) =>
                            value === pwd || 'Password do not match',
                    }}
                />

                <CustomButton
                    text={loading ? 'Signing up...' : 'Sign up'}
                    onPress={handleSubmit(onRegisterPressed)}
                />

                <Text style={styles.text}>
                    By registering, you confirm that you accept our{' '}
                    <Text style={styles.link} onPress={onTermsOfUsePressed}>
                        Terms of Use
                    </Text>{' '}
                    and{' '}
                    <Text style={styles.link} onPress={onPrivacyPressed}>
                        Privacy Policy
                    </Text>
                </Text>

                <SocialSignInButtons />

                <CustomButton
                    text='Have an account? Sign in'
                    onPress={onSignInPress}
                    type='TERTIARY'
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075',
    },
});

export default SignUpScreen;
