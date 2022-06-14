import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Surface, Headline, Subheading } from 'react-native-paper';
import { Badge } from 'react-native-paper';
import CustomSmallButton from '../../ui/CustomSmallButton';
import RegistrarListItem from './Registrar.List.Item';
import { Colors } from '../../../constants/colors';
import { REGISTRARS } from '../../../../data/getRegistrationsForEventOrdered';
import { printObject } from '../../../utils/helpers';
const RallyRegistrars = ({ rally, onPress }) => {
    const [regs, setRegs] = useState();
    useEffect(() => {
        if (process.env.ENV === 'DEBUG') {
            setRegs(REGISTRARS.body.Items);
        } else {
            //todo: make call to getRegistrationsForEventOrdered with...
        }
    }, []);

    return (
        <>
            <View style={styles.rootContainer}>
                <Surface style={[styles.surface, { elevation: 5 }]}>
                    <View style={styles.statusOutline}>
                        <View style={styles.statusDataWrapper}>
                            <Text>REGISTARS HERE</Text>
                            {regs ? (
                                regs.map((ral) => {
                                    return <RegistrarListItem reg={ral} />;
                                })
                            ) : (
                                <Text>
                                    No one has registered for this event.
                                </Text>
                            )}
                        </View>
                    </View>
                </Surface>
            </View>
        </>
    );
};

export default RallyRegistrars;

const styles = StyleSheet.create({
    rootContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    surface: {
        // margin: 24,
        // height: 80,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusOutline: {
        borderWidth: 1,
        borderColor: Colors.primary,
        padding: 10,
        width: '100%',
    },
    statusRow: {
        flexDirection: 'row',
        paddingHorizontal: 5,
    },
    statusTitle: {
        flex: 1,
    },
    statusBadge: {
        backgroundColor: 'yellow',
        color: 'black',
        fontSize: 14,
    },
    statusTitleText: {
        textAlign: 'center',
        fontWeight: '600',
        fontStyle: 'italic',
    },
    statusDataWrapper: {},
    textWrapper: {
        paddingHorizontal: 10,
    },
});
