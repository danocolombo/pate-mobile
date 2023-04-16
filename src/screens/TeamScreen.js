import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Members from '../components/team/Members';
// import { getProfiles } from '../features/profiles/profilesSlice';
import {
    getProfiles,
    getDivisionProfiles,
} from '../providers/profiles.provider';

import { printObject } from '../utils/helpers';
// import { getProfiles } from '../features/profiles/profilesSlice';
function TeamScreen(props) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const pCount = useSelector((state) => state.profiles.profileCount);
    const currentUser = useSelector((state) => state.users.currentUser);
    const { profiles } = useSelector((state) => state.profiles);
    const isLoading = useSelector((state) => state.profiles.isLoading);

    // const [version, setVersion] = useState(false);
    const feo = useSelector((state) => state.division);
    // const { allProfiles, leaders, guests, version, clearProfiles, isLoading } =
    //     useSelector((store) => store.cart);

    useEffect(() => {
        console.log('EFFECT');
        dispatch(
            getDivisionProfiles(currentUser.affiliations.active.divisionId)
        );
    }, [props, isFocused]);

    if (isLoading) {
        return <ActivityIndicator />;
    }
    return (
        <>
            <ImageBackground
                source={require('../components/images/background.png')}
                style={styles.bgImageContainer}
            >
                <View style={styles.screenHeader}>
                    <Text style={styles.screenHeaderText}>Members</Text>
                </View>

                <Members />
            </ImageBackground>
        </>
    );
}
export default TeamScreen;
const styles = StyleSheet.create({
    bgImageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    screenHeader: {
        alignItems: 'center',
    },
    screenHeaderText: {
        paddingVertical: 20,
        fontSize: 30,
        fontWeight: 'bold',
    },
});
