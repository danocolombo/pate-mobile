import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Surface, Headline, Subheading } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../../constants/colors';
import { prettyName, printObject } from '../../../utils/helpers';
import { ScrollView } from 'react-native-gesture-handler';
const RallyStatusDetails = ({ rally, onCoordinatorPress }) => {
    const navigation = useNavigation();
    // printObject('RSI:9 --> rally', rally);
    const user = useSelector((state) => state.users.currentUser);
    const onCoordinatorClick = () => {
        onCoordinatorPress();
    };
    const displayEventCompKey = () => {
        if (!rally.eventCompKey) {
            return;
        }
        let parts = rally.eventCompKey.split('#');
        let results =
            'Year: ' +
            parts[0] +
            '\nMonth:' +
            parts[1] +
            '\nDay:' +
            parts[2] +
            '\nState:' +
            parts[3] +
            '\nEvent ID:' +
            parts[4] +
            '\nUser ID:' +
            parts[5];
        return results;
    };
    return (
        <>
            <View style={styles.rootContainer}>
                <ScrollView>
                    <View style={styles.detailsContainer}>
                        <Surface style={styles.detailsSurface}>
                            <View style={styles.statusDataWrapper}>
                                <View style={styles.statusRow}>
                                    <View>
                                        <Text style={{ fontSize: 18 }}>
                                            STATUS:{' '}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 18 }}>
                                            {rally?.status}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.statusRow}>
                                    <View>
                                        <Text style={{ fontSize: 18 }}>
                                            Division/Region:{' '}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 18 }}>
                                            {rally?.division?.code}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.statusRow}>
                                    <View>
                                        <Text style={{ fontSize: 18 }}>
                                            Organization:{' '}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 18 }}>
                                            {
                                                rally?.division?.organization
                                                    ?.description
                                            }
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 18 }}>
                                            {
                                                rally?.division?.organization
                                                    ?.code
                                            }
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.statusRow}>
                                    <View>
                                        <Text style={{ fontSize: 18 }}>
                                            Coordinator:{' '}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 18 }}>
                                            {prettyName(
                                                rally?.coordinator?.firstName
                                            )}{' '}
                                            {prettyName(
                                                rally?.coordinator?.lastName
                                            )}
                                        </Text>
                                    </View>
                                    {(user.role === 'lead' ||
                                        user.role === 'director' ||
                                        user.role === 'guru') && (
                                        <View style={{ paddingLeft: 10 }}>
                                            <TouchableOpacity
                                                key={rally.id}
                                                onPress={() =>
                                                    onCoordinatorClick()
                                                }
                                                style={({ pressed }) =>
                                                    pressed && styles.pressed
                                                }
                                            >
                                                <MaterialCommunityIcons
                                                    name='account-switch'
                                                    size={24}
                                                    color='black'
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    {user.affiliations.active.role ===
                                        'rep' && (
                                        <View style={{ paddingLeft: 10 }}>
                                            <TouchableOpacity
                                                key={rally.id}
                                                onPress={() =>
                                                    setShowTranferModal(true)
                                                }
                                                style={({ pressed }) =>
                                                    pressed && styles.pressed
                                                }
                                            >
                                                <MaterialCommunityIcons
                                                    name='account-switch'
                                                    size={24}
                                                    color='black'
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                                <View style={styles.statusRow}>
                                    <View>
                                        <Text style={{ fontSize: 14 }}>
                                            Event ID: {rally?.id}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.statusRow}>
                                    <View>
                                        <Text style={{ fontSize: 14 }}>
                                            {displayEventCompKey(
                                                rally?.eventCompKey
                                            )}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </Surface>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};

export default RallyStatusDetails;

const styles = StyleSheet.create({
    rootContainer: {
        alignItems: 'center',
        marginTop: 15,
    },
    detailsContainer: {
        // alignItems: 'center',
    },
    detailsSurface: {
        height: '100%',
        width: '100%',
        borderRadius: 15,
        elevation: 5,
    },

    statusRow: {
        flexDirection: 'row',
        // justifyContent: 'center',
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
    content: {
        // padding: 20,
        // backgroundColor: '#fff',
    },
    collapsibleHeaderRow: {
        //backgroundColor: '#F5FCFF',
        flexDirection: 'row',
        // marginTop: 5,
        alignItems: 'center',
        textAlign: 'center',
    },
    collapsibleHeaderText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
    },
    collapsibleHeaderIcon: {
        paddingLeft: 5,
    },
    modalSurface: {
        marginTop: '50%',
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        // elevation: 3,
        shadowColor: Colors.primary500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    modalInfoWrapper: {
        alignItems: 'center',
        marginHorizontal: 20,
    },
    modalTitle: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalButtonContainer: {
        marginVertical: 20,
        flexDirection: 'column',
    },
    modalButtonWrapper: {
        marginHorizontal: 10,
        flexDirection: 'row',
    },
});
