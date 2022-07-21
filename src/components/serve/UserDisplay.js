import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Colors } from '../../constants/colors';
import { printObject } from '../../utils/helpers';

const UserDisplay = (profile) => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {}, []);
    if (isLoading) {
        <View>
            <ActivityIndicator />
        </View>;
    }
    return (
        <>
            <View>
                <Text>User Details</Text>
            </View>
            <View style={styles.userWrapper}>
                <View>
                    <Text style={[styles.userText, styles.userName]}>
                        {profile.firstName} {profile.lastName}
                    </Text>
                </View>
                <View>
                    <Text style={[styles.userText, styles.userLocation]}>
                        {profile?.residence?.city}{' '}
                        {profile?.residence?.stateProv}
                    </Text>
                </View>
            </View>
        </>
    );
};

export default UserDisplay;

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
    },
});
