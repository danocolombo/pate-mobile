import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from './styles';
const ModalResidence = ({ profile }) => {
    const { street, city, stateProv, postalCode } = profile?.user?.residence;
    const [line2, setLine2] = useState('');

    useEffect(() => {
        let tmpStr = '';
        if (city.length > 0) {
            tmpStr = city;
            if (stateProv.length > 0) {
                tmpStr = tmpStr + ', ' + stateProv;
                if (postalCode) {
                    tmpStr = tmpStr + ' ' + parseInt(postalCode);
                }
            }
        }
        setLine2(tmpStr);
    }, []);
    return (
        <View style={styles.modalTeamRow}>
            <View style={styles.modalDataContainer}>
                {street && <Text style={styles.modalDataText}>{street}</Text>}
                <Text style={styles.modalDataText}>
                    {city}, {stateProv} {postalCode}
                </Text>
            </View>
        </View>
    );
};

export default ModalResidence;
