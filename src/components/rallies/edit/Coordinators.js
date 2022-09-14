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
import CoordinatorsList from './CoordinatorsList';
import { getAffiliateProfiles } from '../../../providers/users';
import profilesSlice, {
    loadProfiles,
} from '../../../features/profiles/profilesSlice';
import { Colors } from '../../../constants/colors';
import { printObject } from '../../../utils/helpers';

const Coordinators = (props) => {
    const rally = props.rally;
    const [isLoading, setIsLoading] = useState(true);
    const leaders = useSelector((state) => state.profiles.leaders);
    if (isLoading) {
        <View>
            <ActivityIndicator />
        </View>;
    }
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ marginBottom: 10 }}>
                <CoordinatorsList
                    data={leaders}
                    key={1}
                    title='Leaders'
                    customStyle={{
                        backgroundColor: Colors.primary,
                        borderTopStartRadius: 20,
                        borderTopEndRadius: 20,
                        marginBottom: 10,
                    }}
                />
            </ScrollView>
        </View>
    );
};

export default Coordinators;

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
    },
});
