import { View, Text } from 'react-native';
import React from 'react';
import CustomButton from '../CustomButton/CustomButton';

const SocialSignInButtons = () => {
    const onSignInFacebook = () => {
        console.warn('Facebook login');
    };
    const onSignInGoogle = () => {
        console.warn('Google login');
    };
    const onSignInApple = () => {
        console.warn('Apple login');
    };
    return (
        <>
            <CustomButton
                text='Sign in Facebook'
                onPress={onSignInFacebook}
                bgColor='#E7EAF4'
                fgColor='#4765A9'
            />
            <CustomButton
                text='Sign in Google'
                onPress={onSignInGoogle}
                bgColor='#FAE9EA'
                fgColor='#DD4DD4'
            />
            <CustomButton
                text='Sign in Apple'
                onPress={onSignInApple}
                bgColor='#e3e3e3'
                fgColor='#363636'
            />
        </>
    );
};

export default SocialSignInButtons;
