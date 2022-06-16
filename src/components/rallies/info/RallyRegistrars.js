import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Surface, Headline, Subheading } from 'react-native-paper';
import { Badge } from 'react-native-paper';
import CustomSmallButton from '../../ui/CustomSmallButton';
import RegistrarListItem from './Registrar.List.Item';
import { Colors } from '../../../constants/colors';
import { REGISTRARS } from '../../../../data/getRegistrationsForEventOrdered';
import { printObject } from '../../../utils/helpers';
import { getRegistrarsForEvent } from '../../../providers/registrations';
const RallyRegistrars = ({ rally, onPress }) => {
    const navigation = useNavigation();
    const [regs, setRegs] = useState();
    useEffect(() => {
        if (process.env.ENV === 'DEBUG') {
            setRegs(REGISTRARS.body.Items);
        } else {
            //get registrars from ddb
            const config = {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            };
            let obj = {
                operation: 'getRegistrationsForEvent',
                payload: {
                    eid: rally.uid,
                },
            };
            let body = JSON.stringify(obj);
            printObject('body going to DBDBDBDBDBDBDBDBDBDBDB', body);
            console.log('\n###########################\n');
            let api2use = process.env.AWS_API_ENDPOINT + '/registrations';

            axios.post(api2use, body, config).then((response) => {
                printObject('RR:22 response', response);
                setRegs(response.data.body.Items);
            });
            printObject("regs", regs);
        }
    }, []);
    const handleRegistrationRequest = (reg) => {
        onPress(reg);
    };
    return (
        <>
            <View style={styles.rootContainer}>
                <Surface style={[styles.surface, { elevation: 5 }]}>
                    <View style={styles.statusOutline}>
                        <View style={styles.statusDataWrapper}>
                            <View style={styles.row}>
                                <Text style={styles.regName}>Registrar(s)</Text>
                                <View style={styles.attendance}>
                                    <View style={styles.textWrapper}>
                                        <Text style={styles.attenandanceText}>
                                            #
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.mealCount}>Meal</Text>
                                </View>
                            </View>

                            {regs ? (
                                regs.map((reg) => {
                                    return (
                                        <TouchableOpacity
                                            key={reg.uid}
                                            onPress={() =>
                                                handleRegistrationRequest(reg)
                                            }
                                        >
                                            <RegistrarListItem
                                                key={reg.uid}
                                                reg={reg}
                                            />
                                        </TouchableOpacity>
                                    );
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
    row: {
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 2,
        borderColor: 'black',
        marginBottom: 10,
    },
    regName: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 20,
    },
    attendance: {
        paddingHorizontal: 10,

        width: 50,
    },
    textWrapper: {
        textAlign: 'center',
    },
    attenandanceText: {
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    mealCount: {
        paddingHorizontal: 5,
        marginRight: 5,
        textAlign: 'center',
        width: 50,
        fontWeight: 'bold',
        fontSize: 16,
    },
});
