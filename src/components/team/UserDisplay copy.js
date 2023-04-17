import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Surface } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomButton from '../ui/CustomButton';
import SelectDropdown from 'react-native-select-dropdown';
import { transformPatePhone } from '../../utils/helpers';
import { updateAndMoveProfile } from '../../features/profiles/profilesSlice';
import { updateProfile as DDBUpdateProfile } from '../../providers/users';
import { Colors } from '../../constants/colors';
import { colors } from '@material-ui/core';
import { printObject } from '../../utils/helpers';
import UserDisplayDetailsModal from './UserDisplayDetailsModal';
const UserDisplay = ({ profile }) => {
    const dispatch = useDispatch();
    const navigate = useNavigation();
    const feo = useSelector((state) => state.division);
    const user = useSelector((state) => state.users.currentUser);
    const [showMoreDetail, setShowMoreDetail] = useState(false);
    const [showCompletionModal, setShowCompletionModal] = useState(false);
    const [userStatus, setUserStatus] = useState('');
    const [newStatus, setNewStatus] = useState(profile?.role);
    const statusValues = ['guest', 'leader'];
    const [okToUpdate, setOkToUpdate] = useState(false);
    useEffect(() => {
        // need to check to see if user has adequate profile, if not
        // we will prompt to request updates.
        if (
            !profile?.user?.residence?.city ||
            !profile?.user?.residence?.stateProv ||
            !profile?.user?.phone
        ) {
            setShowCompletionModal(true);
        }
        let role = null;

        // if (profile?.role === 'rep') {
        //     profile.role = 'leader';

        // }
        console.log('ROLE:', profile?.role);
        setUserStatus(profile?.role);
    }, []);
    // useEffect(() => {
    //     console.log(newStatus + ' vs ' + userStatus);
    //     if (newStatus !== userStatus) {
    //         setOkToUpdate(true);
    //     } else {
    //         setOkToUpdate(false);
    //     }
    // }, [newStatus]);
    const handleDismiss = () => {
        setShowMoreDetail(false);
    };
    const handleRoleChange = () => {
        console.log('newStatus:#', newStatus, '#');
        if (userStatus !== newStatus) {
            setOkToUpdate(false);
            return;
        }
        console.log('they are different');
        window.alert('CLICKED');
    };
    const handleStatusChange = () => {
        let originalProfile = profile;
        let newProfile = { ...profile };
        // printObject('UD:36originalProfile:', originalProfile);
        // printObject('UD:37---newProfile:', newProfile);
        // console.log('UD38:--newStatus:', newStatus);
        // console.log('UD:39--userStatus:', userStatus);

        let newProfileType = '';
        if (newStatus !== userStatus) {
            if (newStatus === 'leader') {
                newProfileType = 'rep';
            } else {
                newProfileType = 'guest';
            }
            //todo == WHEN IMPLEMENTING DIRECTOR ASSIGNING LEAD,
            //todo  TO UPDATE P8Affiliates.maagers WITH NEW LEAD
            //todo  OR REMOVE THE LEAD BEING DEMOTED.

            //todo == need to update active if feo.affiliation
            let origActive = profile.affiliations.active;
            if (origActive.value === feo.affiliation) {
                origActive = { ...origActive, role: newProfileType };
                origActive.role = newProfileType;
            }
            const optionUpdates = profile.affiliations.options.map((o) => {
                if (o.value === feo.affiliation) {
                    let newValues = { ...o, role: newProfileType };
                    return newValues;
                }
                return o;
            });

            let affiliations = {
                options: optionUpdates,
                active: origActive,
            };

            newProfile = {
                ...profile,
                affiliations,
                role: newProfileType,
            };
            if (newProfileType !== 'rep') {
                delete newProfile['stateRep'];
                newProfile['role'] = 'guest';
            }
            //   update REDUX
            dispatch(
                updateAndMoveProfile({
                    target: newProfileType,
                    newProfile: newProfile,
                })
            );

            //   update DDB p8Users with
            DDBUpdateProfile(newProfile)
                .then((response) => {
                    // printObject('DDB response:', response);
                    console.log('DDBUpdateProfile successful');
                })
                .catch((err) =>
                    console.log('Error trying to update profile in DDB\n', err)
                );
        }
        Alert.alert(
            'NOTE: changes not in effect until user logs out and back in.'
        );
        navigate.goBack();
    };
    const handleProfileAcknowledge = () => {
        setShowCompletionModal(false);
    };
    console.log('UD:140->okToUpdate:', okToUpdate);
    console.log('userStatus:', userStatus);
    console.log('newStatus:', newStatus);
    return (
        <>
            <Modal visible={showCompletionModal} animationStyle='slide'>
                <Surface style={styles.modalSurface}>
                    <View style={styles.modalInfoWrapper}>
                        <Text style={styles.modalTitle}>
                            Please request the user to complete their profile.
                        </Text>
                    </View>
                    <View style={styles.modalButtonContainer}>
                        <View style={styles.modalButtonWrapper}>
                            <View style={styles.modalCancelButton}>
                                <CustomButton
                                    title='OK'
                                    graphic={null}
                                    cbStyles={{
                                        backgroundColor: 'green',
                                        color: 'white',
                                    }}
                                    txtColor='white'
                                    onPress={() => {
                                        handleProfileAcknowledge();
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </Surface>
            </Modal>
            <Modal visible={showMoreDetail} animationStyle='slide'>
                <UserDisplayDetailsModal
                    profile={profile}
                    handleDismiss={handleDismiss}
                />
            </Modal>
            <Surface style={styles.userCardWrapper}>
                <View style={styles.detailsContainer}>
                    <Surface style={[styles.detailsSurface]}>
                        <View style={styles.detailsView}>
                            <TouchableOpacity
                                onPress={() => setShowMoreDetail(true)}
                            >
                                <Ionicons
                                    name='information-circle'
                                    size={24}
                                    color={Colors.gray35}
                                />
                            </TouchableOpacity>
                        </View>
                    </Surface>
                </View>
                <View>
                    <Text style={styles.userName}>
                        {profile?.user?.firstName} {profile?.user?.lastName}
                    </Text>
                </View>
                <View>
                    <Text style={styles.userResidence}>
                        {profile?.user?.residence?.street}
                    </Text>
                </View>
                {profile?.user?.residence?.city &&
                    profile?.user?.residence?.stateProv && (
                        <View>
                            <Text style={styles.userResidence}>
                                {profile?.user?.residence?.city},{' '}
                                {profile?.user?.residence?.stateProv}
                                {'  '}
                                {profile?.user?.residence?.postalCode}
                            </Text>
                        </View>
                    )}
                {profile?.phone && (
                    <View>
                        <Text style={styles.userPhone}>
                            {profile?.user?.phone
                                ? transformPatePhone(profile?.user?.phone)
                                : null}
                        </Text>
                    </View>
                )}
                <View>
                    <Text style={styles.userEmail}>{profile?.user?.email}</Text>
                </View>
            </Surface>
            <Surface style={styles.manageWrapper}>
                <View style={styles.manageContainer}>
                    <SelectDropdown
                        data={statusValues}
                        defaultValue={userStatus}
                        onSelect={(selectedItem, index) => {
                            setNewStatus(selectedItem);
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
                    {/* <View style={styles.modalConfirmButton}>
                        <CustomButton
                            title='CANCEL'
                            graphic={null}
                            cbStyles={{
                                backgroundColor: Colors.gray35,
                                color: 'black',
                            }}
                            txtColor='white'
                            onPress={() => setShowStatusModal(false)}
                        />
                    </View> */}

                    <View style={styles.customButton}>
                        <CustomButton
                            key={profile.id}
                            title='UPDATE'
                            graphic={null}
                            enabled={okToUpdate}
                            cbStyles={{
                                backgroundColor: Colors.primary,
                                color: 'white',
                            }}
                            txtColor='white'
                            onPress={() => {
                                handleRoleChange();
                            }}
                        />
                    </View>
                    <View>
                        <Text>okToUpdate:{okToUpdate ? 'YES' : 'NO'}</Text>
                    </View>
                </View>
            </Surface>
        </>
    );
};

export default UserDisplay;

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
    },

    detailsContainer: {
        width: '100%',
    },
    detailsSurface: {
        backgroundColor: colors.blueGrey,
        elevation: 5,
    },
    detailsView: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingRight: 5,
        paddingTop: 5,
    },
    userCardWrapper: {
        flexDirection: 'column',
        //alignItems: 'center',
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: 'black',
        marginHorizontal: '5%',
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
    },
    userName: {
        marginTop: 0,
        marginLeft: 10,
        fontSize: 30,
        fontWeight: '500',
    },
    userResidence: {
        fontSize: 20,
        fontWeight: '300',
        marginLeft: 30,
    },
    userPhone: {
        fontSize: 24,
        fontWeight: '300',
        marginTop: 10,
        marginLeft: 10,
    },
    userEmail: {
        fontSize: 22,
        fontWeight: '300',
        marginBottom: 30,
        marginLeft: 10,
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
        flexDirection: 'row',
    },
    modalButtonWrapper: {
        marginHorizontal: 10,
    },
});
