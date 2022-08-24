import React, {
    useState,
    useEffect,
    useRef,
    useMemo,
    useLayoutEffect,
} from 'react';
import axios from 'axios';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Modal,
    ScrollView,
    ImageBackground,
    Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Surface } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';

import RallyLocationInfo from './Rally.Location.Info';
import RallyLogisticsInfo from './Rally.Logistics.Info';
import RallyContactInfo from './Rally.Contact.Info';
import RallyMealInfo from './Rally.Meal.Info';
import RallyStatusDetails from './Rally.Status.Details';
import CustomButton from '../../ui/CustomButton';
import SelectDropdown from 'react-native-select-dropdown';
import RegScrollItem from '../../serve/ServeRegistrationScrollItem';
import BottomSheet from '@gorhom/bottom-sheet';
import ServeRegDetailModal from '../../serve/ServeRegDetailModal';
import { Colors } from '../../../constants/colors';
import { CONFIG, transformPatePhone } from '../../../utils/helpers';
import { printObject } from '../../../utils/helpers';
//import { ScrollView } from 'react-native-gesture-handler';
import { updateRally } from '../../../features/rallies/ralliesSlice';
import { getRegistrarsForEvent } from '../../../providers/registrations';
import RallyRegistrars from './RallyRegistrars';
import { blue } from '@material-ui/core/colors';
import RallyMap from '../Rally.Map';
const RallyDetails = ({ rallyId }) => {
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['8%', '75%'], []);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showRegDetail, setShowRegDetail] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const [regInquiry, setRegInquiry] = useState({});
    // let regInquiry = {};
    const [statusRally, setStatusRally] = useState();
    const [newStatus, setNewStatus] = useState();
    const navigation = useNavigation();
    const feo = useSelector((state) => state.system);
    const user = useSelector((state) => state.users.currentUser);
    const rallyEntry = useSelector((state) =>
        state.rallies.allRallies.filter((r) => r.uid === rallyId)
    );
    let rally = rallyEntry[0];
    const dispatch = useDispatch();
    //modal stuff
    const statusValues = ['draft', 'pending', 'approved'];
    const [registrations, setRegistrations] = useState([]);
    // create the Edit button in upper right navigation
    useLayoutEffect(() => {
        navigation.setOptions({
            title: feo.appName,
            headerRight: () => (
                <Button
                    onPress={() =>
                        navigation.navigate('RallyEditFlow', {
                            rallyId: rally.uid,
                            stage: 1,
                        })
                    }
                    color='white'
                    title='Edit'
                />
            ),
        });
    }, [navigation, feo]);
    useEffect(() => {
        const fetchData = async () => {
            // console.log('RI:54-->rallyId:', rallyId);
            getRegistrarsForEvent(rallyId)
                .then((regs) => {
                    let justRegs = regs.data.body.Items;
                    // printObject('RI:69 --> justRegs', justRegs);
                    // sort by last name
                    function asc_sort(a, b) {
                        // Use toUpperCase() to ignore character casing
                        // printObject('RI:61-->a:', a);
                        // printObject('RI:62-->b:', b);
                        const regA = a.registrar.lastName.toUpperCase();
                        const regB = b.registrar.lastName.toUpperCase();

                        let comparison = 0;
                        if (regA > regB) {
                            comparison = 1;
                        } else if (regA < regB) {
                            comparison = -1;
                        }
                        return comparison;
                    }
                    let displayData = justRegs.sort(asc_sort);
                    setRegistrations(displayData);
                })
                .catch((error) => {
                    console.log('RI:83 --> error getting registrations');
                    console.log(error);
                });
        };
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, []);

    const handleStatusPress = () => {
        // setStatusRally(rally);
        setNewStatus(rally?.status);
        setShowStatusModal(true);
    };
    const handleRegRequest = (reg) => {
        // printObject('RI:88-reg', reg);
        setRegInquiry(reg);
        // regInquiry = reg;
        setShowRegDetail(true);
    };
    const handleRegDetailDismiss = () => {
        setShowRegDetail(false);
    };
    const handleStatusChange = () => {
        // console.log('NEW STATUS WOULD BE ===>', newStatus);
        let approved = newStatus === 'approved' ? true : false;
        let newRally = { ...rally, status: newStatus, approved: approved };
        //   UPDATE EXISTING EVENT
        let obj = {
            operation: 'updateEvent',
            payload: {
                Item: newRally,
            },
        };
        let body = JSON.stringify(obj);

        let api2use = process.env.AWS_API_ENDPOINT + '/events';
        axios
            .post(api2use, body, CONFIG)
            .then((response) => {
                dispatch(updateRally(response.data.Item));
            })
            .catch((err) => {
                console.log('RI-57: error:', err);
            });

        setShowStatusModal(false);
    };
    const handleRegistrarRequest = (reg) => {
        // printObject('RI:122-reg', reg);
        navigation.navigate('RegistrationDetails', { reg: reg });
    };
    // printObject('RI:124-rally', rally);
    return (
        <>
            <ImageBackground
                source={require('../../../components/images/background.png')}
                style={styles.bgImageContainer}
            >
                <Modal visible={showRegDetail} animationStyle='slide'>
                    <Surface style={styles.modalSurface}>
                        <View>
                            <Text style={styles.modalTitle}>
                                Registrar Information
                            </Text>
                        </View>
                        <View>
                            <Text style={[styles.modalText, { marginTop: 20 }]}>
                                {regInquiry?.registrar?.firstName}{' '}
                                {regInquiry?.registrar?.lastName}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.modalText}>
                                {regInquiry?.registrar?.residence?.street}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.modalText}>
                                {regInquiry?.registrar?.residence?.city}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.modalText}>
                                {regInquiry?.registrar?.residence?.stateProv}
                                {', '}
                                {regInquiry?.registrar?.residence?.postalCode}
                            </Text>
                        </View>

                        <View>
                            <Text style={[styles.modalText, { marginTop: 10 }]}>
                                {transformPatePhone(
                                    regInquiry?.registrar?.phone
                                )}
                            </Text>
                        </View>

                        <View>
                            <Text style={styles.modalText}>
                                {regInquiry?.registrar?.email}
                            </Text>
                        </View>

                        <View>
                            <Text style={[styles.modalText, { marginTop: 20 }]}>
                                Registrations: {regInquiry?.attendeeCount}
                            </Text>
                        </View>

                        <View>
                            <Text style={styles.modalText}>
                                Meal Count: {regInquiry?.mealCount}
                            </Text>
                        </View>
                        <View>
                            <Text style={[styles.modalText, { marginTop: 20 }]}>
                                {regInquiry?.church?.name}
                            </Text>
                            <Text style={styles.modalText}>
                                {regInquiry?.church?.city}
                                {', '}
                                {regInquiry?.church?.stateProv}
                            </Text>
                        </View>

                        <View style={styles.modalButtonWrapper}>
                            <View style={styles.modalCancelButton}>
                                <CustomButton
                                    title='OK'
                                    graphic={null}
                                    cbStyles={{
                                        backgroundColor: Colors.gray50,
                                        color: 'white',
                                    }}
                                    txtColor='white'
                                    onPress={() => {
                                        handleRegDetailDismiss();
                                    }}
                                />
                            </View>
                        </View>
                    </Surface>
                </Modal>
                <Modal visible={showStatusModal} animationStyle='slide'>
                    <Surface style={styles.modalSurface}>
                        <View style={styles.modalInfoWrapper}>
                            <Text style={styles.modalTitle}>Manage Status</Text>
                            <RallyLocationInfo rally={rally} />
                        </View>
                        <View style={styles.radioButtonContainer}>
                            <SelectDropdown
                                data={statusValues}
                                // defaultValueByIndex={1}
                                defaultValue={rally.status}
                                onSelect={(selectedItem, index) => {
                                    setNewStatus(selectedItem);
                                    console.log(selectedItem, index);
                                }}
                                defaultButtonText={rally?.status}
                                buttonTextAfterSelection={(
                                    selectedItem,
                                    index
                                ) => {
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
                        <View style={styles.modalButtonContainer}>
                            <View style={styles.modalButtonWrapper}>
                                <View style={styles.modalConfirmButton}>
                                    <CustomButton
                                        title='CANCEL'
                                        graphic={null}
                                        cbStyles={{
                                            backgroundColor: Colors.gray35,
                                            color: 'black',
                                        }}
                                        txtColor='white'
                                        onPress={() =>
                                            setShowStatusModal(false)
                                        }
                                    />
                                </View>
                            </View>

                            <View style={styles.modalButtonWrapper}>
                                <View style={styles.modalCancelButton}>
                                    <CustomButton
                                        title='UPDATE'
                                        graphic={null}
                                        cbStyles={{
                                            backgroundColor: 'green',
                                            color: 'white',
                                        }}
                                        txtColor='white'
                                        onPress={() => {
                                            handleStatusChange();
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </Surface>
                </Modal>
                <Modal visible={showDetailModal} animationStyle='slide'>
                    <Surface style={{ marginTop: 60 }}>
                        <View>
                            <View
                                style={{ marginTop: 5, alignItems: 'center' }}
                            >
                                <Text style={styles.modalTitle}>Details</Text>
                            </View>
                            <RallyStatusDetails
                                rally={rally}
                                onPress={handleStatusPress}
                            />
                            <View style={styles.modalButtonContainer}>
                                <View style={styles.modalButtonWrapper}>
                                    <View style={styles.modalConfirmButton}>
                                        <CustomButton
                                            title='Dismiss'
                                            graphic={null}
                                            cbStyles={{
                                                backgroundColor: Colors.gray35,
                                                color: 'black',
                                            }}
                                            txtColor='white'
                                            onPress={() =>
                                                setShowDetailModal(false)
                                            }
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Surface>
                </Modal>
                <ScrollView>
                    <View style={styles.rootContainer}>
                        <Surface style={[styles.surface, { elevation: 5 }]}>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    paddingRight: 5,
                                    paddingTop: 5,
                                }}
                            >
                                <Pressable
                                    onPress={() => setShowDetailModal(true)}
                                >
                                    <Ionicons
                                        name='information-circle'
                                        size={24}
                                        color={Colors.gray35}
                                    />
                                </Pressable>
                            </View>
                        </Surface>
                    </View>
                    <RallyLocationInfo rally={rally} />
                    <RallyLogisticsInfo rally={rally} />

                    <RallyContactInfo rally={rally} />
                    <RallyMealInfo rally={rally} />

                    <View style={{ alignItems: 'center', height: 100 }}>
                        <Surface
                            style={{
                                paddingTop: 10,
                                width: '90%',
                                //height: '100%',
                                alignItems: 'center',
                                padding: 3,
                            }}
                        >
                            <View>
                                <Text
                                    style={{ fontWeight: 'bold', fontSize: 14 }}
                                >
                                    Registrations{' '}
                                    {registrations
                                        ? registrations.length
                                        : null}
                                </Text>
                            </View>

                            <View
                                style={{
                                    borderWidth: 2,
                                    borderRadius: 3,
                                    margin: 2,
                                    width: '100%',
                                    padding: 5,
                                    height: 85,
                                }}
                            >
                                <ScrollView
                                    style={{ width: '100%' }}
                                    showsVerticalScrollIndicator={true}
                                    persistentScrollbar={true}
                                >
                                    {registrations
                                        ? registrations.map((r) => {
                                              //   printObject(
                                              //       'RI:339-->registration:',
                                              //       r
                                              //   );
                                              return (
                                                  <Pressable
                                                      key={r.uid}
                                                      onPress={() =>
                                                          handleRegRequest(r)
                                                      }
                                                      style={({ pressed }) =>
                                                          pressed &&
                                                          styles.pressed
                                                      }
                                                  >
                                                      <RegScrollItem
                                                          key={r.uid}
                                                          reg={r}
                                                      />
                                                  </Pressable>
                                              );
                                          })
                                        : null}
                                </ScrollView>
                            </View>
                        </Surface>
                    </View>
                </ScrollView>
                <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
                    <View
                        style={{
                            alignItems: 'center',
                            marginBottom: 0,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: '600',
                                letterSpacing: 0.5,
                                paddingBottom: 5,
                            }}
                        >
                            See Map Location
                        </Text>
                    </View>
                    <View>
                        <View style={styles.mapContainer}>
                            <RallyMap
                                rally={rally}
                                mapHeight={0.5}
                                mapWidth={0.9}
                            />
                        </View>
                    </View>
                </BottomSheet>
            </ImageBackground>
        </>
    );
};

export default RallyDetails;
const styles = StyleSheet.create({
    bgImageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    rootContainer: {
        marginTop: 5,
        alignItems: 'center',
    },
    surface: {
        // marginTop: 10,
        // padding: 20,
        // height: 80,
        width: '90%',
        // alignItems: 'flex-end',
        // justifyContent: 'center',
        // paddingHorizontal: 5,
    },

    buttonContainer: {
        marginTop: 5,
        alignItems: 'center',
    },
    modalContainer: {
        marginTop: 50,
        // alignSelf: 'flex-end',
    },
    modalSurface: {
        marginTop: 80,
        marginHorizontal: 0,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    modalDetailSurface: {
        marginTop: 130,
        height: '90%',
        marginHorizontal: 0,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    modalInfoWrapper: {
        alignItems: 'center',
    },
    modalTitle: {
        marginTop: 15,
        fontSize: 24,
        fontWeight: 'bold',
    },
    modalText: {
        fontSize: 24,
    },
    radioButtonContainer: {
        marginTop: 20,
        marginHorizontal: 50,
    },
    statusRadioButton: {
        color: 'blue',
        backgroundColor: 'yellow',
    },
    modalButtonContainer: {
        marginVertical: 20,
        flexDirection: 'row',
    },
    modalButtonWrapper: {
        marginHorizontal: 10,
        marginVertical: 25,
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
    mapContainer: {
        flexDirection: 'row',
        // backgroundColor: 'lightgrey',
        marginTop: 8,
        // marginHorizontal: 10,
        alignItems: 'center',
    },
});
