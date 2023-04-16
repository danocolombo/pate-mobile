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
import { getAffiliateProfiles } from '../../providers/users';
import profilesSlice, {
    loadProfiles,
} from '../../features/profiles/profilesSlice';
import { Colors } from '../../constants/colors';
import { printObject } from '../../utils/helpers';

const Members = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const { actives, team, guests, nonActives } = useSelector(
        (state) => state.profiles
    );
    printObject('M:24-->actives:\n', actives);
    printObject('M:24-->team:\n', team);
    printObject('M:24-->guests:\n', guests);
    printObject('M:24-->nonActives:\n', nonActives);

    if (isLoading) {
        <View>
            <ActivityIndicator />
        </View>;
    }
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ marginBottom: 10 }}>
                <UsersList
                    data={team}
                    key={1}
                    title='TEAM'
                    customStyle={{
                        backgroundColor: Colors.primary,
                        borderTopStartRadius: 20,
                        borderTopEndRadius: 20,
                        marginBottom: 10,
                    }}
                />

                <UsersList
                    data={guests}
                    key={2}
                    title='GUESTS'
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
