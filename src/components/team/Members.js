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
    const leaders = useSelector((state) => state.profiles.leaders);
    const guests = useSelector((state) => state.profiles.guests);
    if (isLoading) {
        <View>
            <ActivityIndicator />
        </View>;
    }
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ marginBottom: 10 }}>
                <UsersList
                    data={leaders}
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
                    data={guests}
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

export default Members;

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
    },
});
