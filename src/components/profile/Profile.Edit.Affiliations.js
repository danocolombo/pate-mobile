import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} from 'react-native';
import { Surface, List, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from 'react-native-paper-dropdown';
import { Formik } from 'formik';
import * as yup from 'yup';
import CustomButton from '../ui/CustomButton';
import { updateCurrentUser } from '../../features/users/usersSlice';
import { updateProfile } from '../../providers/users';
import {
    printObject,
    getPhoneType,
    createPatePhone,
    capitalize,
} from '../../utils/helpers';

export default function ProfileEditAffiliation() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    let user = useSelector((state) => state.users.currentUser);
    const [affiliationSelected, setAffiliationSelected] = useState(
        user?.affiliations?.active
    );
    const [showMultiSelectDropDown, setShowMultiSelectDropDown] =
        useState(false);
    const [affiliationsSelected, setAffiliationsSelected] = useState('');
    const [showDropDown, setShowDropDown] = useState(false);
    const affiliationList = [
        {
            label: 'FEO',
            value: 'FEO',
        },
        {
            label: 'CRP8',
            value: 'CRP8',
        },
    ];

    const affiliationsList = [
        {
            label: 'Pickleball',
            value: 'PBAL',
        },
        {
            label: 'Art Shows',
            value: 'ARTS',
        },
        {
            label: '5K Races',
            value: '5KS',
        },
        {
            label: 'Garage Sales',
            value: 'GARS',
        },
    ];
    const handleSubmit = (values) => {};

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Surface style={styles.personalSurface}>
                    <View style={styles.heading}>
                        <Text style={styles.headerText}>
                            Edit Affiliation Definition
                        </Text>
                    </View>
                    <View style={styles.instructionWrapper}>
                        <Text style={styles.instructionText}>
                            Select one of your affilates.
                        </Text>
                    </View>
                    <View style={styles.dropdownContainer}>
                        <DropDown
                            label={'Affiation'}
                            mode={'outlined'}
                            visible={showDropDown}
                            showDropDown={() => setShowDropDown(true)}
                            onDismiss={() => setShowDropDown(false)}
                            value={affiliationSelected}
                            setValue={setAffiliationSelected}
                            list={affiliationList}
                        />
                    </View>
                    <View style={styles.offerWrapper}>
                        <Text style={styles.offerText}>
                            You can request access to one of the follow
                            affilations
                        </Text>
                    </View>
                    <View style={styles.dropdownContainer}>
                        <DropDown
                            label={'Available Affiliations'}
                            mode={'outlined'}
                            visible={showMultiSelectDropDown}
                            showDropDown={() =>
                                setShowMultiSelectDropDown(true)
                            }
                            onDismiss={() => setShowMultiSelectDropDown(false)}
                            value={affiliationsSelected}
                            setValue={setAffiliationsSelected}
                            list={affiliationsList}
                            multiSelect
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <CustomButton
                            title='Update'
                            graphic=''
                            cbStyles={{
                                backgroundColor: 'green',
                                color: 'white',
                                width: '50%',
                            }}
                            onPress={() => {}}
                        />
                    </View>
                </Surface>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    personalSurface: {
        marginHorizontal: 10,
        paddingVertical: 0,
        marginTop: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    heading: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    instructionWrapper: {
        marginVertical: 10,
    },
    instructionText: {
        textAlign: 'center',
    },
    dropdownContainer: {
        marginHorizontal: 20,
    },
    offerWrapper: {
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    offerText: {
        textAlign: 'center',
        fontSize: 18,
        letterSpacing: 0.5,
    },
    inputContainer: {
        marginLeft: '10%',
        backgroundColor: 'white',
    },
    labelContainer: {
        marginTop: 3,
    },
    labelText: {
        fontSize: 14,
    },

    affiliateSurfaceContainter: {
        padding: 5,
        marginHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    affiliateTitle: {
        textAlign: 'center',
        fontSize: 24,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    submitButton: {
        width: '70%',
    },
});
