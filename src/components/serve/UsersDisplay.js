import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import UsersList from './UsersList';
import { getAllProfiles, getProfile } from '../../providers/users';
import { loadProfiles } from '../../features/profiles/profilesSlice';
import { Colors } from '../../constants/colors';
import { printObject } from '../../utils/helpers';
import { Headline } from 'react-native-paper';

const UsersDisplay = () => {
    const dispatch = useDispatch();
    const [allProfiles, setAllProfiles] = useState([]);
    const [regionLeaders, setRegionLeaders] = useState([]);
    const [regionUsers, setRegionUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getProfileData = async () => {
        const allProfilesData = await getAllProfiles();
        // printObject('PL:11-->allProfileData', allProfilesData);
        if (allProfilesData.statusCode === 200) {
            const region = 'us#test#south';
            setAllProfiles(allProfilesData.profiles);
            dispatch(loadProfiles(allProfilesData.profiles));
            const leaders = allProfiles.filter((p) => p.stateRep === 'TT');
            printObject('UD:31--> leaders', leaders);
            const regionalUsers = allProfiles.filter(
                (p) => p.region === 'us#test#south#tt' && p.stateRep !== 'TT'
            );
            // r.eventDate >= tDay && r.eventRegion === eventRegion;
            // const leaders = allProfiles.map((u) => {
            //     return u;
            // });
            // setRegionLeaders(leaders);
            // setRegionUsers(regionalUsers);
            setRegionLeaders(leaders);
            setRegionUsers(regionalUsers);
        }
        return;
    };
    useEffect(() => {
        setIsLoading(true);
        const getTheData = async () => {
            const response = await getProfileData();
            return;
        };
        getTheData().then((resp) => {
            setIsLoading(false);
        });
    }, []);
    if (isLoading) {
        <View>
            <ActivityIndicator />
        </View>;
    }
    return (
        <View>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.headerText}>LEADERS</Text>
                </View>
                <UsersList
                    data={regionLeaders}
                    customStyle={{
                        backgroundColor: Colors.primary,
                        borderTopStartRadius: 20,
                        borderTopEndRadius: 20,
                        marginBottom: 20,
                    }}
                />
                <View style={styles.header}>
                    <Text style={styles.headerText}>USERS</Text>
                </View>
                <UsersList
                    data={regionUsers}
                    customStyle={{
                        backgroundColor: Colors.secondary,
                        borderBottomStartRadius: 20,
                        borderBottomEndRadius: 20,
                    }}
                />
            </ScrollView>
            {/* {!!allProfiles ? (
                allProfiles.map((p) => {
                    if (
                        p.region === 'us#test#south#tt' &&
                        p.stateRep === 'TT'
                    ) {
                        return (
                            <View>
                                <Text>{p.firstName}</Text>
                            </View>
                        );
                    }
                })
            ) : (
                <View>
                    <Text>No</Text>
                </View>
            )} */}
        </View>
    );
};

export default UsersDisplay;

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
    },
    headerText: {
        fontSize: 26,
        fontWeight: '500',
    },
});
