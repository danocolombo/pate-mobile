import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ProfileForm from '../components/profile/Profile.Form';
import PersonalDetails from '../components/Profile.Form';
import PersonalHeader from '../components/profile/personalHeader';
import AffiliateForm from '../components/profile/Affiliate.Form';
import { printObject } from '../utils/helpers';
function ProfileScreen() {
    let user = useSelector((state) => state.users.currentUser);

    return (
        <>
            <ImageBackground
                source={require('../components/images/background.png')}
                style={styles.bgImageContainer}
            >
                <PersonalDetails user={user} />
                {/* <AffiliateForm /> */}
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
