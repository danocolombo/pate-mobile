import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { ActivityIndicator, Surface } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import {
    useNavigation,
    useIsFocused,
    StackActions,
} from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Coordinators from '../components/rallies/edit/Coordinators';
import SelectDropdown from 'react-native-select-dropdown';
import CustomButton from '../components/ui/CustomButton';
import RallyLocationInfo from '../components/rallies/info/Rally.Location.Info';
import { getAffiliateProfiles } from '../providers/users';
import { loadGuests, loadLeaders } from '../features/profiles/profilesSlice';
import { printObject } from '../utils/helpers';
import { getProfiles } from '../features/profiles/profilesSlice';
import { updateRally } from '../features/rallies/ralliesSlice';
import { updateEvent } from '../providers/rallies';
import { Colors } from '../constants/colors';
import { select } from '@react-native-material/core';
function CoordinatorTransferScreen({ route }) {
    const rally = route.params.rally;
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const feo = useSelector((state) => state.system);

    const [isLoading, setIsLoading] = useState(true);
    const [availableCoordinators, setAvailableCoordinators] = useState([]);

    const [userStatus, setUserStatus] = useState('');
    const [selectedCoordinator, setSelectedCoordinator] = useState();
    const [lead, setLead] = useState([]);
    let nameArray = [];
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'JONES',
            headerLeft: () => {
                return null;
            },
        });
    }, [navigation, feo]);
    const getLead = () => {
        let leads = feo.affiliate.managers.filter((m) => m.role === 'lead');
        if (leads.length < 1) {
            console.log('no leads');
            return;
        }
        setLead(leads[0]);
    };
    useEffect(() => {
        setIsLoading(true);
        getLead();
        setIsLoading(false);
    }, [route, isFocused]);
    const onConfirmPress = () => {
        // define the current affiliate lead

        //   rip and replace eventCompKey
        //   "2022#09#TT#10#86e55ed48c7c6bd0b2f373790de8aca3#bb3aa10a-0956-41ba-bcba-51e9ffd80985",
        let parts = rally.eventCompKey.split('#');
        let newCompKey =
            parts[0] +
            '#' +
            parts[1] +
            '#' +
            parts[2] +
            '#' +
            parts[3] +
            '#' +
            parts[4] +
            '#' +
            lead.uid;

        console.log('before:', rally.eventCompKey);
        console.log('after: ', newCompKey);
        //   update rally, save to redux
        let newCoordinator = {
            name: lead.firstName + ' ' + lead.lastName,
            id: lead.uid,
            phone: lead?.phone ? lead.phone : '',
            email: lead?.email ? lead.email : '',
        };
        let newRally = {
            ...rally,
            coordinator: newCoordinator,
            eventCompKey: newCompKey,
        };
        printObject('newRally:', newRally);
        updateEvent(newRally)
            .then((results) => {
                printObject('results:', results);
                dispatch(updateRally(newRally));
            })
            .catch((e) => {
                console.log('ERROR updating rally');
            });

        navigation.dispatch(StackActions.popToTop());
        return;
    };
    const onCancelPress = () => {
        navigation.goBack();
    };
    if (isLoading) {
        return <ActivityIndicator />;
    }
    return (
        <>
            <ImageBackground
                source={require('../components/images/background.png')}
                style={styles.bgImageContainer}
            >
                <View style={styles.screenHeader}>
                    <Text style={styles.screenHeaderText}>
                        Transfer Ownership
                    </Text>
                </View>
                <RallyLocationInfo rally={rally} title='' />

                <Surface style={styles.manageWrapper}>
                    <View style={styles.manageContainer}>
                        <View style={{ marginTop: 0 }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 24,
                                    fontWeight: '400',
                                    letterSpacing: '0.5',
                                }}
                            >
                                Confirm you want to transfer this event to your
                                lead/manager...
                            </Text>
                        </View>
                    </View>
                    <View style={styles.customButtonContainer}>
                        <View style={styles.modalCancelButton}>
                            <CustomButton
                                title='CANCEL'
                                graphic={null}
                                cbStyles={{
                                    backgroundColor: Colors.gray35,
                                    color: 'black',
                                    marginHorizontal: 5,
                                }}
                                txtColor='white'
                                onPress={() => onCancelPress()}
                            />
                        </View>

                        <View style={styles.customButton}>
                            <CustomButton
                                key={rally.uid}
                                title='CONFIRM'
                                graphic={null}
                                cbStyles={{
                                    backgroundColor: Colors.primary,
                                    color: 'white',
                                    marginHorizontal: 5,
                                }}
                                txtColor='white'
                                onPress={() => {
                                    onConfirmPress();
                                }}
                            />
                        </View>
                    </View>
                </Surface>
            </ImageBackground>
        </>
    );
}
export default CoordinatorTransferScreen;
const styles = StyleSheet.create({
    bgImageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    screenHeader: {
        alignItems: 'center',
    },
    screenHeaderText: {
        paddingVertical: 20,
        fontSize: 30,
        fontWeight: 'bold',
    },
    manageWrapper: {
        flexDirection: 'column',
        marginTop: 10,
        alignItems: 'center',
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: 'black',
        marginHorizontal: '5%',
        borderBottomStartRadius: 40,
        borderBottomEndRadius: 40,
    },
    manageContainer: {
        marginTop: 20,
        marginHorizontal: 50,
    },

    dropdown1BtnStyle: {
        width: '80%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
    },
    dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown1RowStyle: {
        backgroundColor: '#EFEFEF',
        borderBottomColor: '#C5C5C5',
    },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
    customButton: {
        // width: '100%',
    },
    customButtonContainer: {
        marginVertical: 20,
        flexDirection: 'row',
    },
});
