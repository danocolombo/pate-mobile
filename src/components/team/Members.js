import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import UsersList from './UsersList';
import { getAffiliateProfiles } from '../../providers/users';
import profilesSlice, {
    loadProfiles,
} from '../../features/profiles/profilesSlice';
import { Colors } from '../../constants/colors';
import { printObject } from '../../utils/helpers';

const Members = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const currentUser = useSelector((state) => state.users.currentUser);
    const { actives, team, guests, nonActives } = useSelector(
        (state) => state.profiles
    );
    const [divisionMembers, setDivisionMembers] = useState(team || []);
    // printObject('M:24-->actives:\n', actives);
    // printObject('M:24-->team:\n', team);
    // printObject('M:24-->guests:\n', guests);
    // printObject('M:24-->nonActives:\n', nonActives);
    const removeMe = async (teamArray) => {
        // remove the current user from the list.
        const cleanedMembers = teamArray.filter((t) => {
            return t.user.id !== currentUser.id && t.user.username !== 'guru';
        });
        return cleanedMembers;
    };
    useLayoutEffect(() => {
        setIsLoading(true);
        removeMe(team).then((results) => {
            setDivisionMembers(results);
        });
        setIsLoading(false);
    }, []);
    if (isLoading) {
        return (
            <View>
                <ActivityIndicator />
            </View>
        );
    }
    printObject('M:53:-->divisionMembers:\n', divisionMembers);
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ marginBottom: 10 }}>
                {divisionMembers && (
                    <UsersList
                        data={divisionMembers}
                        key={1}
                        title='TEAM'
                        customStyle={{
                            backgroundColor: Colors.primary,
                            borderTopStartRadius: 20,
                            borderTopEndRadius: 20,
                            marginBottom: 10,
                        }}
                    />
                )}
                <UsersList
                    data={guests}
                    key={2}
                    title='VISITORS'
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

export default Members;

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
    },
});
