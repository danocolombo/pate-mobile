import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { List, Badge } from 'react-native-paper';
import { useSelector } from 'react-redux';
import CardDate from '../components/ui/RallyCardDate';
import ProfileForm from '../components/Profile.Form';
import Personal from '../components/profile/personal';
function PersonalEdits() {
    let user = useSelector((state) => state.users.currentUser);
    return (
        <>
            <ImageBackground
                source={require('../components/images/splash.png')}
                style={styles.bgImageContainer}
            >
                <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Text>Personal</Text>
                </View>
            </ImageBackground>
        </>
    );
}
export default PersonalEdits;
const styles = StyleSheet.create({
    bgImageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});
