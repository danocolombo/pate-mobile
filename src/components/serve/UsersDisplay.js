import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import UsersList from './UsersList';
import { getAllProfiles, getProfile } from '../../providers/users';
import { loadProfiles } from '../../features/profiles/profilesSlice';
import { Colors } from '../../constants/colors';
import { printObject } from '../../utils/helpers';

const UsersDisplay = (props) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const profilesData = useSelector((state) => state.profiles.allProfiles);
    const user = useSelector((state) => state.users.currentUser);
    const feo = useSelector((state) => state.system);
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
            //   get leaders from system.affiliate data

            let users = [];
            allTheProfiles.map((a) => {
                if (a.affiliations) {
                    if (a.affiliations.options) {
                        a.affiliations.options.map((o) => {
                            if (o.value === feo.affiliate.code) {
                                users.push(a);
                            }
                        });
                    }
                }
            });
            setRegionUsers(users);
            let userLeaders = [];
            allTheProfiles.map((a) => {
                if (a.affiliations) {
                    if (a.affiliations.options) {
                        a.affiliations.options.map((o) => {
                            if (
                                o.value === feo.affiliate.code &&
                                (o.role === 'lead' || o.role === 'rep')
                            ) {
                                userLeaders.push(a);
                            }
                        });
                    }
                }
            });
            setRegionLeaders(userLeaders);
        }
        return;
    };
    const getAffiliateProfiles = async () => {
        let users = [];
        profilesData.map((a) => {
            if (a.affiliations) {
                if (a.affiliations.options) {
                    a.affiliations.options.map((o) => {
                        if (o.value === feo.affiliate.code) {
                            users.push(a);
                        }
                    });
                }
            }
        });
        setRegionUsers(users);
        let userLeaders = [];
        profilesData.map((a) => {
            if (a.affiliations) {
                if (a.affiliations.options) {
                    a.affiliations.options.map((o) => {
                        if (
                            o.value === feo.affiliate.code &&
                            (o.role === 'lead' || o.role === 'rep')
                        ) {
                            userLeaders.push(a);
                        }
                    });
                }
            }
        });
        setRegionLeaders(userLeaders);
    };
    useEffect(() => {
        getAffiliateProfiles().then(() =>
            console.log('getAffiliateProfiles DONE')
        );
    }, [props, isFocused]);

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
