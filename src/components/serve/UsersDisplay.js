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
    const user = useSelector((state) => state.users.currentUser);
    const [allProfiles, setAllProfiles] = useState([]);
    const [regionLeaders, setRegionLeaders] = useState([]);
    const [regionUsers, setRegionUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getProfileData = async () => {
        const allProfilesData = await getAllProfiles();
        // printObject('PL:11-->allProfileData', allProfilesData);
        if (allProfilesData.statusCode === 200) {
            const allTheProfiles = allProfilesData.profiles;
            setAllProfiles(allProfilesData.profiles);
            dispatch(loadProfiles(allTheProfiles));
            const leaders = allTheProfiles.filter((p) => {
                if (
                    p.stateRep === user.stateLead &&
                    p.region === user.region &&
                    p.uid !== user.uid
                ) {
                    return p;
                }
            });

            const regionalUsers = allTheProfiles.filter(
                (p) =>
                    p.region === user.region &&
                    (p.stateRep !== user.stateLead) & (p.uid !== user.uid)
            );
            setRegionLeaders((prevState) => ({
                ...prevState,
                leaders,
            }));
            setRegionUsers(regionalUsers);
        }
        return;
    };
    useEffect(() => {
        setIsLoading(true);

        getProfileData().then((resp) => {
            setIsLoading(false);
        });

        setIsLoading(false);
    }, []);
    useEffect(() => {
        // this reloads the leaders and guests based on profile value changes
        const leaders = profilesData.filter(
            (p) =>
                p.stateRep === user.stateLead &&
                p.region === user.region &&
                p.uid !== user.uid
        );

        const regionalUsers = profilesData.filter(
            (p) =>
                p.region === user.region &&
                p.stateRep !== user.stateLead &&
                p.uid !== user.uid
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
