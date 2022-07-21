import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Surface } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomButton from '../ui/CustomButton';
import SelectDropdown from 'react-native-select-dropdown';
import { transformPatePhone } from '../../utils/helpers';
import { Colors } from '../../constants/colors';
import { printObject } from '../../utils/helpers';

const UserDisplay = ({ profile }) => {
    const dispatch = useDispatch();
    printObject('UD:09--profile:', profile);
    const [isLoading, setIsLoading] = useState(false);
    const [userStatus, setUserStatus] = useState(
        profile?.stateRep ? 'leader' : 'guest'
    );
    const [newStatus, setNewStatus] = useState();
    const statusValues = ['guest', 'leader'];
    useEffect(() => {}, []);
    if (isLoading) {
        <View>
            <ActivityIndicator />
        </View>;
    }
    return (
        <>
            <Surface style={styles.userCardWrapper}>
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
                        {transformPatePhone(profile.phone)}
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
        marginTop: 30,
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
    modalButtonWrapper: {
        marginHorizontal: 10,
        marginVertical: 25,
    },
});
