import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UsersList from './UsersList';
import { getAllProfiles, getProfile } from '../../providers/users';
import { loadProfiles } from '../../features/profiles/profilesSlice';
import { Colors } from '../../constants/colors';
import { printObject } from '../../utils/helpers';
import { Headline } from 'react-native-paper';

const UsersDisplay = () => {
    const dispatch = useDispatch();
    const profilesData = useSelector((state) => state.profiles.allProfiles);
    const [allProfiles, setAllProfiles] = useState([]);
    const [regionLeaders, setRegionLeaders] = useState([]);
    const [regionUsers, setRegionUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getProfileData = async () => {
        const allProfilesData = await getAllProfiles();
        // printObject('PL:11-->allProfileData', allProfilesData);
        if (allProfilesData.statusCode === 200) {
            const region = 'us#test#south';
            const allTheProfiles = allProfilesData.profiles;
            setAllProfiles(allProfilesData.profiles);
            dispatch(loadProfiles(allTheProfiles));
            const leaders = allTheProfiles.filter((p) => p.stateRep === 'TT');
            // printObject('UD:31--> leaders', leaders);
            const regionalUsers = allTheProfiles.filter(
                (p) => p.region === 'us#test#south#tt' && p.stateRep !== 'TT'
            );

            setRegionLeaders(leaders);
            setRegionUsers(regionalUsers);
        }
        return;
    };
    useEffect(() => {
        setIsLoading(true);
        // if (allProfiles.length < 0) {
        // load the profiles
        getProfileData().then((resp) => {
            setIsLoading(false);
        });
        // }
        setIsLoading(false);
    }, []);
    useEffect(() => {
        // this reloads the leaders and guests based on profile value changes
        const leaders = profilesData.filter((p) => p.stateRep === 'TT');
        // printObject('UD:31--> leaders', leaders);
        const regionalUsers = profilesData.filter(
            (p) => p.region === 'us#test#south#tt' && p.stateRep !== 'TT'
        );
        setRegionLeaders(leaders);
        setRegionUsers(regionalUsers);
    }, [profilesData]);
    if (isLoading) {
        <View>
            <ActivityIndicator />
        </View>;
    }
    return (
        <View>
            <ScrollView>
                <UsersList
                    data={regionLeaders}
                    key={1}
                    title='LEADERS'
                    customStyle={{
                        backgroundColor: Colors.primary,
                        borderTopStartRadius: 20,
                        borderTopEndRadius: 20,
                        marginBottom: 10,
                    }}
                />

                <UsersList
                    data={regionUsers}
                    key={2}
                    title='USERS'
                    customStyle={{
                        backgroundColor: Colors.secondary,
                        borderBottomStartRadius: 20,
                        borderBottomEndRadius: 20,
                    }}
                />
            </ScrollView>
        </View>
    );
};

export default UsersDisplay;

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
    },
});
