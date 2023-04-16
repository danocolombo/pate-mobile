import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from './styles';
const ModalMembership = ({ profile }) => {
    return (
        <View style={styles.modalTeamRow}>
            <View style={styles.modalDataContainer}>
                <Text style={styles.modalDataText}>
                    {profile?.user?.memberships?.items[0]?.name}
                </Text>
                <Text style={styles.modalDataText}>
                    {profile?.user?.residence?.city},{' '}
                    {profile?.user?.residence?.stateProv}
                </Text>
            </View>
        </View>
    );
};

export default ModalMembership;
