import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Surface, Headline, Subheading } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Badge } from 'react-native-paper';
//import for the animation of Collapse and Expand
import * as Animatable from 'react-native-animatable';
import { AntDesign } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import CustomSmallButton from '../../ui/CustomSmallButton';
import { Colors } from '../../../constants/colors';
import { printObject } from '../../../utils/helpers';
import { ScrollView } from 'react-native-gesture-handler';
const RallyStatusInfo = ({ rally, onPress }) => {
    // printObject('RSI:9 --> rally', rally);
    const user = useSelector((state) => state.users.currentUser);
    const [collapsed, setCollapsed] = useState(true); //collapsible
    let tColor = 'gold';
    let bColor = 'blue';

    switch (rally.status) {
        case 'pending':
            tColor = 'black';
            bColor = 'yellow';
            break;
        case 'draft':
            tColor = 'white';
            bColor = 'grey';
            break;
        case 'approved':
        case 'public':
            tColor = 'white';
            bColor = 'green';
            break;
        case 'public':
            tColor = 'white';
            bColor = 'green';
            break;
        default:
            break;
    }
    const toggleExpanded = () => {
        //Toggling the state of single Collapsible
        setCollapsed(!collapsed);
    };
    const renderContent = (section, _, isActive) => {
        //Accordion Content view
        return (
            <Animatable.View
                duration={400}
                style={[
                    styles.content,
                    isActive ? styles.active : styles.inactive,
                ]}
                transition='backgroundColor'
            >
                <Animatable.Text
                    animation={isActive ? 'bounceIn' : undefined}
                    style={{ textAlign: 'center' }}
                >
                    NOW YOU SEE ME
                </Animatable.Text>
            </Animatable.View>
        );
    };
    return (
        <>
            <View style={styles.rootContainer}>
                <ScrollView>
                    {/*Code for Single Collapsible Start*/}
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={toggleExpanded}>
                            <View style={styles.collapsibleHeaderRow}>
                                <Text style={styles.collapsibleHeaderText}>
                                    Event Details
                                </Text>
                                <View style={styles.collapsibleHeaderIcon}>
                                    {collapsed ? (
                                        <AntDesign
                                            name='caretright'
                                            size={18}
                                            color={Colors.gray60}
                                        />
                                    ) : (
                                        <AntDesign
                                            name='caretdown'
                                            size={18}
                                            color={Colors.gray60}
                                        />
                                    )}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/*Content of Single Collapsible*/}
                    <Collapsible collapsed={collapsed} align='center'>
                        <View style={styles.detailContainer}>
                            <Surface style={[styles.surface, { elevation: 5 }]}>
                                <View style={styles.statusOutline}>
                                    <View style={styles.statusDataWrapper}>
                                        {user?.stateLead ? (
                                            <View style={styles.statusRow}>
                                                <CustomSmallButton
                                                    title={rally?.status}
                                                    cbStyles={{
                                                        backgroundColor: bColor,
                                                        color: tColor,
                                                        fontSize: 14,
                                                    }}
                                                    onPress={onPress}
                                                />
                                            </View>
                                        ) : (
                                            <View style={styles.statusRow}>
                                                <View>
                                                    <Text
                                                        style={{ fontSize: 18 }}
                                                    >
                                                        STATUS: {rally?.status}
                                                    </Text>
                                                </View>
                                            </View>
                                        )}
                                        <View style={styles.statusRow}>
                                            <Text style={styles.textWrapper}>
                                                Region:
                                                {rally.region}
                                            </Text>
                                            <Text style={styles.textWrapper}>
                                                EventRegion: {rally.eventRegion}
                                            </Text>
                                        </View>
                                        <View style={styles.statusRow}>
                                            <Text style={styles.textWrapper}>
                                                UID: {rally.uid}
                                            </Text>
                                        </View>
                                        <View style={styles.statusRow}>
                                            <Text style={styles.textWrapper}>
                                                Coordinator:{' '}
                                                {rally?.coordinator?.name}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </Surface>
                        </View>
                    </Collapsible>
                    {/*Code for Single Collapsible Ends*/}
                </ScrollView>
            </View>
        </>
    );
};

export default RallyStatusInfo;

const styles = StyleSheet.create({
    rootContainer: {
        alignItems: 'center',
        marginTop: 15,
    },
    detailContainer: {
        alignItems: 'center',
    },
    surface: {
        // margin: 24,
        height: 80,

        width: '100%',

        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // statusOutline: {
    //     // borderWidth: 1,
    //     borderColor: Colors.primary,
    //     padding: 5,
    //     borderRadius: 15,
    //     width: '100%',
    // },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'center',
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
