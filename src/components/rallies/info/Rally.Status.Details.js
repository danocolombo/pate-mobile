import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Surface, Headline, Subheading } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { AntDesign } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import CustomSmallButton from '../../ui/CustomSmallButton';
import { Colors } from '../../../constants/colors';
import { printObject } from '../../../utils/helpers';
import { ScrollView } from 'react-native-gesture-handler';
const RallyStatusDetails = ({ rally, onPress }) => {
    const navigation = useNavigation();
    // printObject('RSI:9 --> rally', rally);
    const user = useSelector((state) => state.users.currentUser);
    const [collapsed, setCollapsed] = useState(true); //collapsible
    let tColor = 'gold';
    let bColor = 'blue';
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
                                            Region:{' '}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 18 }}>
                                            {rally?.region}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.statusRow}>
                                    <View>
                                        <Text style={{ fontSize: 18 }}>
                                            EventRegion:{' '}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 18 }}>
                                            {rally?.eventRegion}
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
                                        <TouchableOpacity
                                            key={rally.uid}
                                            onPress={() =>
                                                navigation.navigate(
                                                    'Coordinators',
                                                    {
                                                        rally: rally,
                                                    }
                                                )
                                            }
                                            style={({ pressed }) =>
                                                pressed && styles.pressed
                                            }
                                        >
                                            <Text style={{ fontSize: 18 }}>
                                                {rally?.coordinator?.name}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.statusRow}>
                                    <View>
                                        <Text style={{ fontSize: 14 }}>
                                            {rally?.uid}
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
});
