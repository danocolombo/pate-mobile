import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../../../components/ui/CustomInput';
import CustomButton from '../../../components/ui/Auth/CustomButton/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { printObject } from '../../../utils/helpers';
const ForgotPasswordScreen = () => {
    const route = useRoute();
    const { control, handleSubmit } = useForm({
        defaultValues: { username: route?.params?.user },
    });
    const navigation = useNavigation();

    const onSendPressed = async (data) => {
        const { username } = data;
        try {
            const response = await Auth.forgotPassword(username);
            console.log('forgotPassword response', response);
            navigation.navigate('NewPassword', { username });
        } catch (e) {
            switch (e.code) {
                case 'UserNotFoundException':
                    Alert.alert(
                        'Username not found.\nMake sure to provide your username, not your email.'
                    );
                    break;

                default:
                    Alert.alert('Yikes', e.message);
                    break;
            }
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
                    name='username'
                    control={control}
                    placeholder='Username'
                    rules={{
                        required: 'Username is required',
                    }}
                />

                <CustomButton
                    text='Send'
                    onPress={handleSubmit(onSendPressed)}
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

export default ForgotPasswordScreen;
