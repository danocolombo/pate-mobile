import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { ActivityIndicator, Surface } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
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
import { Colors } from '../constants/colors';
import { select } from '@react-native-material/core';
function CoordinatorScreen({ route }) {
    const rally = route.params.rally;
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const feo = useSelector((state) => state.system);

    const [isLoading, setIsLoading] = useState(true);
    const [availableCoordinators, setAvailableCoordinators] = useState([]);

    const [userStatus, setUserStatus] = useState('');
    const [selectedCoordinator, setSelectedCoordinator] = useState();
    const [leaderDetails, setLeaderDetails] = useState([]);
    let nameArray = [];

    const getProfiles = async () => {
        const all = await getAffiliateProfiles(feo.affiliation);
        // printObject('all', all);
        let leaders = [];
        let leaderArray = [];
        all.profiles.map((a) => {
            if (a?.affiliations?.options) {
                a.affiliations.options.map((o) => {
                    if (o.value === feo.affiliation) {
                        if (o?.role) {
                            if (
                                o.role === 'rep' ||
                                o.role === 'lead' ||
                                o.role === 'director'
                            ) {
                                leaders.push(a);
                            }
                        }
                    }
                });
            }
        });
        //   sort function on firstName
        function compare_firstName(a, b) {
            if (a.firstName < b.firstName) {
                return -1;
            }
            if (a.firstName > b.firstName) {
                return 1;
            }
            return 0;
        }

        leaders.sort(compare_firstName);

        // load the values for leaders to display availableCoordinators

        leaders.map((l) => {
            if (l.uid !== rally.coordinator.id) {
                nameArray.push(l.firstName);
                leaderArray.push(l);
            }
        });
        setLeaderDetails(leaderArray);
        setAvailableCoordinators(nameArray);
    };
    useEffect(() => {
        setIsLoading(true);
        getProfiles();
        setIsLoading(false);
    }, [route, isFocused]);
    const onChangePress = () => {
        let id = 0;
        if (selectedCoordinator !== undefined) {
            id = selectedCoordinator;
        }

        //   update rally, save to redux
        let newCoordinator = {
            name:
                leaderDetails[id].firstName + ' ' + leaderDetails[id].lastName,
            id: leaderDetails[id].uid,
            phone: leaderDetails[id].phone,
            email: leaderDetails[id].email,
        };
        let newRally = { ...rally, coordinator: newCoordinator };
        printObject('newRally:', newRally);
        dispatch(updateRally(newRally));
        navigation.goBack();
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
                        Manage Coordinator
                    </Text>
                </View>
                <RallyLocationInfo rally={rally} title='Event Impacted' />

                <Surface style={styles.manageWrapper}>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontWeight: '600' }}>
                            Current Coordinator: {rally.coordinator.name}
                        </Text>
                    </View>
                    <View style={styles.manageContainer}>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontSize: 18 }}>
                                New Coordinator
                            </Text>
                        </View>
                        <SelectDropdown
                            data={availableCoordinators}
                            defaultValue={availableCoordinators[0]}
                            onSelect={(selectedItem, index) => {
                                setSelectedCoordinator(index);
                                console.log(selectedItem, index);
                            }}
                            defaultButtonText={userStatus}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item;
                            }}
                            buttonStyle={styles.dropdown1BtnStyle}
                            buttonTextStyle={styles.dropdown1BtnTxtStyle}
                            renderDropdownIcon={(isOpened) => {
                                return (
                                    <Ionicons
                                        name={
                                            isOpened
                                                ? 'chevron-up-sharp'
                                                : 'chevron-down-sharp'
                                        }
                                        color={'black'}
                                        size={24}
                                    />
                                );
                            }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={styles.dropdown1DropdownStyle}
                            rowStyle={styles.dropdown1RowStyle}
                            rowTextStyle={styles.dropdown1RowTxtStyle}
                        />
                    </View>
                    <View style={styles.customButtonContainer}>
                        <View style={styles.modalConfirmButton}>
                            <CustomButton
                                title='CANCEL'
                                graphic={null}
                                cbStyles={{
                                    backgroundColor: Colors.gray35,
                                    color: 'black',
                                }}
                                txtColor='white'
                                onPress={() => onCancelPress()}
                            />
                        </View>

                        <View style={styles.customButton}>
                            <CustomButton
                                key={rally.uid}
                                title='UPDATE'
                                graphic={null}
                                cbStyles={{
                                    backgroundColor: Colors.primary,
                                    color: 'white',
                                }}
                                txtColor='white'
                                onPress={() => {
                                    onChangePress();
                                }}
                            />
                        </View>
                    </View>
                </Surface>
            </ImageBackground>
        </>
    );
}
export default CoordinatorScreen;
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
