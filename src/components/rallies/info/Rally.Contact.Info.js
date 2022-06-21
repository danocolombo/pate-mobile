import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { Surface, Headline, Subheading } from 'react-native-paper';
import { getPhoneType, transformPatePhone } from '../../../utils/helpers';
const RallyContactInfo = ({ rally }) => {
    let phoneValueToDisplay;
    let pType = getPhoneType(rally?.contact?.phone);
    switch (pType) {
        case 'PATE':
            phoneValueToDisplay = transformPatePhone(rally.contact.phone);
            break;
        case 'MASKED':
            phoneValueToDisplay = rally.contact.phone;
            break;
        default:
            phoneValueToDisplay = null;
            break;
    }

    return (
        <>
            <View style={styles.rootContainer}>
                <Surface style={[styles.surface, { elevation: 5 }]}>
                    <View>
                        <Headline>Contact Information</Headline>
                    </View>
                    <View style={styles.textWrapper}>
                        <Text style={styles.text}>{rally?.contact?.name}</Text>

                        <Text style={styles.text}>{phoneValueToDisplay}</Text>

                        <Text style={styles.text}>{rally?.contact?.email}</Text>
                    </View>
                </Surface>
            </View>
        </>
    );
};

export default RallyContactInfo;

const styles = StyleSheet.create({
    rootContainer: {
        alignItems: 'center',
    },
    surface: {
        // margin: 24,
        // height: 80,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textWrapper: {
        alignItems: 'center',
        marginBottom: 5,
    },
    text: {},
});
