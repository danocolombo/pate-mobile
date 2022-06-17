import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { List, Badge } from 'react-native-paper';
import CardDate from '../components/ui/RallyCardDate';
import ProfileForm from '../components/Profile.Form';
function ProfileScreen() {
    return (
        <>
            <ImageBackground
                source={require('../components/images/background.png')}
                style={styles.bgImageContainer}
            >
                <ProfileForm />
            </ImageBackground>
        </>
    );
}
export default ProfileScreen;
const styles = StyleSheet.create({
    bgImageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});
