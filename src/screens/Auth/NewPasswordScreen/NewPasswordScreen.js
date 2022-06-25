import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../../../components/ui/CustomInput';
import CustomButton from '../../../components/ui/Auth/CustomButton/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
const NewPasswordScreen = () => {
    const route = useRoute();
    const { control, handleSubmit } = useForm({
        defaultValues: { username: route?.params?.username },
    });

    const navigation = useNavigation();

    const onSubmitPressed = async (data) => {
        try {
            await Auth.forgotPasswordSubmit(
                data.username,
                data.code,
                data.password
            );
            navigation.navigate('SignIn');
        } catch (e) {
            Alert.alert('Oops', e.message);
        }
    };

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Reset your password</Text>

                <CustomInput
                    placeholder='Username'
                    name='username'
                    control={control}
                    rules={{ required: 'Username is required' }}
                />

                <CustomInput
                    placeholder='Code'
                    name='code'
                    control={control}
                    rules={{ required: 'Code is required' }}
                />

                <CustomInput
                    placeholder='Enter your new password'
                    name='password'
                    control={control}
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

                <CustomButton
                    text='Submit'
                    onPress={handleSubmit(onSubmitPressed)}
                />

                <CustomButton
                    text='Back to Sign in'
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

export default NewPasswordScreen;
