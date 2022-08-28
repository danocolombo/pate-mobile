import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Surface } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomButton from '../ui/CustomButton';
import SelectDropdown from 'react-native-select-dropdown';
import { transformPatePhone } from '../../utils/helpers';
import { updateProfile } from '../../features/profiles/profilesSlice';
import { updateProfile as DDBUpdateProfile } from '../../providers/users';
import { Colors } from '../../constants/colors';
import { colors } from '@material-ui/core';
import { printObject } from '../../utils/helpers';
import UserDisplayDetailsModal from './UserDisplayDetailsModal';
const UserDisplay = ({ profile }) => {
    const dispatch = useDispatch();
    const navigate = useNavigation();
    const user = useSelector((state) => state.users.currentUser);
    const [showMoreDetail, setShowMoreDetail] = useState(false);
    // printObject('UD:18--user:', user);
    // printObject('UD:19--profile:', profile);

    const [userStatus, setUserStatus] = useState(
        profile?.stateRep ? 'leader' : 'guest'
    );
    const [newStatus, setNewStatus] = useState();
    const statusValues = ['guest', 'leader'];
    useEffect(() => {}, []);
    const handleDismiss = () => {
        setShowMoreDetail(false);
    };
    const handleStatusChange = () => {
        let newProfile = { ...profile };
        if (newStatus !== userStatus) {
            //change detected.
            console.log(
                '🚀 ~ file: UserDisplay.js ~ line 27 ~ handleStatusChange ~ user',
                user
            );

            if (newStatus === 'leader') {
                // ...insert stateRep value
                console.log('LEADER');
                newProfile = {
                    ...profile,
                    stateRep: user.stateLead,
                    role: 'rep',
                };
                //   add stateRep to registration in REDUX
                dispatch(updateProfile(newProfile));
                //   update DDB p8Users with
                DDBUpdateProfile(newProfile)
                    .then((response) => {
                        console.log('DDBUpdateProfile successful');
                    })
                    .catch((err) =>
                        console.log(
                            'Error trying to update profile in DDB\n',
                            err
                        )
                    );
            } else {
                // updating as GUEST
                delete newProfile['stateRep'];
                newProfile['role'] = 'guest';

                //   remove stateRep from regisrations in REDUX
                dispatch(updateProfile(newProfile));
                //   update DDB by removing the stateRep info
                DDBUpdateProfile(newProfile)
                    .then((response) => {
                        console.log('DDBUpdateProfile successful');
                    })
                    .catch((err) =>
                        console.log(
                            'Error trying to update profile in DDB\n',
                            err
                        )
                    );
            }
        }
        console.log(
            'Setting ',
            profile.uid,
            ' status to ',
            newStatus,
            ' was ',
            userStatus
        );
        console.log(
            '🚀 ~ file: UserDisplay.js ~ line 65 ~ handleStatusChange ~ newProfile',
            newProfile
        );
        navigate.goBack();
    };

    return (
        <>
            <Modal visible={showMoreDetail} animationStyle='slide'>
                <UserDisplayDetailsModal
                    user={profile}
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
                        {profile.firstName} {profile.lastName}
                    </Text>
                </View>
                <View>
                    <Text style={styles.userResidence}>
                        {profile.residence.street}
                    </Text>
                </View>
                <View>
                    <Text style={styles.userResidence}>
                        {profile.residence.city}, {profile.residence.stateProv}
                        {'  '}
                        {profile.residence.postalCode}
                    </Text>
                </View>
                <View>
                    <Text style={styles.userPhone}>
                        {profile?.phone
                            ? transformPatePhone(profile.phone)
                            : null}
                    </Text>
                </View>
                <View>
                    <Text style={styles.userEmail}>{profile.email}</Text>
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
                            key={profile.uid}
                            title='UPDATE'
                            graphic={null}
                            cbStyles={{
                                backgroundColor: Colors.primary,
                                color: 'white',
                            }}
                            txtColor='white'
                            onPress={() => {
                                handleStatusChange();
                            }}
                        />
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
});
