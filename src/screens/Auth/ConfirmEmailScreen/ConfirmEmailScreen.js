import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../../../components/ui/CustomInput';
import CustomButton from '../../../components/ui/Auth/CustomButton/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
const ConfirmEmailScreen = () => {
    const route = useRoute();
    const { control, handleSubmit, watch } = useForm({
        defaultValues: { username: route?.params?.username },
    });
    //used to reference username on resend code.
    const username = watch('username');

    const navigation = useNavigation();

    const onConfirmPressed = async (data) => {
        try {
            const response = await Auth.confirmSignUp(data.username, data.code);
            console.log('confirmSignUp_reponse', response);
            navigation.navigate('SignIn');
        } catch (e) {
            Alert.alert('Oops', e.message);
        }
    };

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    };

    const onResendPress = async () => {
        try {
            await Auth.resendSignUp(username);
            Alert.alert('Success', 'Code was resent to your email');
        } catch (e) {
            Alert.alert('Oops', e.message);
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Confirm your email</Text>

                <CustomInput
                    name='username'
                    control={control}
                    placeholder='Username'
                    rules={{
                        required: 'Username code is required',
                    }}
                />

                <CustomInput
                    name='code'
                    control={control}
                    placeholder='Enter your confirmation code'
                    rules={{
                        required: 'Confirmation code is required',
                    }}
                />

                <CustomButton
                    text='Confirm'
                    onPress={handleSubmit(onConfirmPressed)}
                />

                <CustomButton
                    text='Resend code'
                    onPress={onResendPress}
                    type='SECONDARY'
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

export default ConfirmEmailScreen;
