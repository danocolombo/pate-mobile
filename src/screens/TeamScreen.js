import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Profiles from '../components/team/profiles';
import { getAffiliateProfiles } from '../providers/users';
import { loadGuests, loadLeaders } from '../features/profiles/profilesSlice';
import { printObject } from '../utils/helpers';
import { getProfiles } from '../features/profiles/profilesSlice';
function TeamScreen(props) {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const feo = useSelector((state) => state.system);
    const leaderList = useSelector((state) => state.profiles.leaders);
    const guestList = useSelector((state) => state.profiles.guests);
    const [isLoading, setIsLoading] = useState(true);

    const getProfiles = async () => {
        const all = await getAffiliateProfiles(feo.affiliation);
        // printObject('all', all);
        let leaders = [];
        let guests = [];
        all.profiles.map((a) => {
            if (a?.affiliations?.options) {
                a.affiliations.options.map((o) => {
                    if (o.value === feo.affiliation) {
                        if (o?.role) {
                            if (o.role === 'rep' || o.role === 'lead') {
                                leaders.push(a);
                            } else {
                                guests.push(a);
                            }
                        } else {
                            guests.push(a);
                        }
                    }
                });
            }
        });
        dispatch(loadGuests(guests));
        dispatch(loadLeaders(leaders));
        console.log('leaders:', leaders.length);
        console.log('guests:', guests.length);
        console.log('total:', all.profiles.length);
        // all with have users with affiliations.option[x].value === feo.affiliation
    };
    useEffect(() => {
        setIsLoading(true);

        if (leaderList.length < 1) {
            console.log('no leaders');
        } else {
            console.log('leaders found');
        }
        if (guestList.length < 1) {
            console.log('no guests');
            getProfiles();
        } else {
            console.log('guests found');
        }
        setIsLoading(false);
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
                <View>
                    <Text>Team Info</Text>
                </View>
                <Profiles />
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
});
