import React, { useLayoutEffect, useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    ImageBackground,
    Modal,
} from 'react-native';
import { Headline } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-native-material/core';
import { getGeoCode } from '../../../providers/google';
import { Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../constants/colors';
import CustomButton from '../../../components/ui/CustomButton';
// import { putRally } from '../../providers/rallies';
import { createTmp, updateTmp } from '../../../features/rallies/ralliesSlice';
import CustomNavButton from '../../ui/CustomNavButton';
import { printObject } from '../../../utils/helpers';
import { string } from 'prop-types';

// create validation schema for yup to pass to formik

export default function RallyLocationForm({ rallyId }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const feo = useSelector((state) => state.division);
    const [showEditWarningConfirm, setShowEditWarningConfirm] = useState(
        !!rally?.registrations > 0
    );
    const [displayRally, setDisplayRally] = useState({});
    const [locationName, setLocationName] = useState('');
    const [locationNameError, setLocationNameError] = useState('');
    const [locationStreet, setLocationStreet] = useState('');
    const [locationStreetError, setLocationStreetError] = useState('');
    const [locationCity, setLocationCity] = useState('');
    const [locationCityError, setLocationCityError] = useState('');
    const [locationStateProv, setLocationStateProv] = useState('');
    const [locationStateProvError, setLocationStateProvError] = useState('');
    const [locationPostalCode, setLocationPostalCode] = useState('');
    const [locationPostalCodeError, setLocationPostalCodeError] = useState('');
    let rallyEntry;
    if (rallyId !== 0) {
        rallyEntry = useSelector((state) =>
            state.division.gatherings.filter((r) => r.id === rallyId)
        );
    }
    let rally;
    if (rallyEntry) {
        rally = rallyEntry[0];
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            title: feo.appName || 'FEO',
        });
    }, [navigation, feo]);
    useLayoutEffect(() => {
        if (rally?.id) {
            printObject('rally:\n', rally);
            //save existing values to tmpEntry
            //change the postalCode to string
            const newLocationValues = {
                ...rally.location,
                postalCode: rally.location.postalCode.toString(),
            };
            const tmpRally = { ...rally, location: newLocationValues };
            // console.log('postalCode STRING: ', tmpRally.location.postalCode);
            // console.log(typeof tmpRally?.location?.postalCode);
            // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
            // printObject('tmpRally:\n', tmpRally);
            // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
            setLocationName(tmpRally.name);
            setLocationStreet(tmpRally?.location?.street);
            setLocationCity(tmpRally?.location?.city);
            setLocationStateProv(tmpRally?.location?.stateProv);
            setLocationPostalCode(tmpRally?.location?.postalCode);
            dispatch(createTmp(tmpRally));
        }
        if (parseInt(rally?.plannedCount) > 0) {
            setShowEditWarningConfirm((prevState) => true);
        }
    }, []);

    const handleNameChange = (value) => {
        setLocationName(value);
    };
    const handleStreetChange = (value) => {
        setLocationStreet(value);
    };
    const handleCityChange = (value) => {
        setLocationCity(value);
    };
    const handleStateProvChange = (value) => {
        setLocationStateProv(value);
    };
    const handlePostalCodeChange = (value) => {
        setLocationPostalCode(value);
    };
    const handleNext = async () => {
        const loc = {
            name: locationName,
            street: locationStreet,
            city: locationCity,
            stateProv: locationStateProv,
            postalCode: locationPostalCode,
        };
        if (rally.id) {
            loc.id = rally.id;
        }
        const values = {
            location: loc,
        };
        // gather data
        // console.log('in handleNext');
        if (rally?.id) {
            dispatch(updateTmp(values));
        } else {
            dispatch(createTmp(values));
        }
        navigation.navigate('RallyEditFlow', {
            rallyId: rallyId,
            stage: 2,
        });
    };
    // const dispatch = useDispatch();
    console.log('REL:124-->rallyId:', rallyId);
    return (
        <>
            <Modal visible={showEditWarningConfirm} animationStyle='slide'>
                <Surface style={styles.modalSurface}>
                    <View>
                        <Text style={styles.modalTitle}>
                            REGISTRATION WARNING
                        </Text>
                    </View>
                    <View style={styles.modalMessageWrapper}>
                        <Text style={styles.modalMessageText}>
                            Some registrations have been made.
                        </Text>
                    </View>
                    <View style={styles.modalMessageWrapper}>
                        <Text style={styles.modalMessageText}>
                            If you make edits to this event, it could impact
                            those already registered. Please be wise and
                            determine if your changes need to be communicated to
                            the registrars.
                        </Text>
                    </View>
                    <View style={styles.modalMessageWrapper}>
                        <Text style={styles.modalMessageText}>
                            You can see who has registered on the main serve
                            page in the Registrations scroll box.
                        </Text>
                    </View>
                    <View style={styles.modalButtonContainer}>
                        <View style={styles.modalButtonWrapper}>
                            <View style={styles.modalConfirmButton}>
                                <CustomButton
                                    title='OK'
                                    graphic={null}
                                    cbStyles={{
                                        backgroundColor: Colors.gray35,
                                        color: 'black',
                                    }}
                                    txtColor='white'
                                    onPress={() =>
                                        setShowEditWarningConfirm(false)
                                    }
                                />
                            </View>
                        </View>
                    </View>
                </Surface>
            </Modal>
            <ImageBackground
                source={require('../../../components/images/background.png')}
                style={styles.bgImageContainer}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.root}>
                        <ScrollView contentContainerStyle={styles.root}>
                            <View style={styles.root}>
                                <View style={styles.infoWrapper}>
                                    <View style={styles.formHeader}>
                                        <Text style={styles.titleText}>
                                            Location Information
                                        </Text>
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <View>
                                            <View style={styles.container}>
                                                <TextInput
                                                    label='Location Name'
                                                    placeholder='Location Name'
                                                    autoCapitalize='words'
                                                    autoCorrect={false}
                                                    required
                                                    size='small'
                                                    style={styles.input}
                                                    onChangeText={
                                                        handleNameChange
                                                    }
                                                    value={locationName}
                                                    error={
                                                        locationNameError !== ''
                                                    }
                                                    helperText={
                                                        locationNameError
                                                    }
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <View>
                                            <View style={styles.container}>
                                                <TextInput
                                                    label='Street'
                                                    placeholder='Street Address'
                                                    autoCapitalize='words'
                                                    autoCorrect={false}
                                                    required
                                                    size='small'
                                                    style={styles.input}
                                                    onChangeText={
                                                        handleStreetChange
                                                    }
                                                    value={locationStreet}
                                                    error={
                                                        locationStreetError !==
                                                        ''
                                                    }
                                                    helperText={
                                                        locationStreetError
                                                    }
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <View>
                                            <View style={styles.container}>
                                                <TextInput
                                                    label='City'
                                                    placeholder='City'
                                                    autoCapitalize='words'
                                                    autoCorrect={false}
                                                    required
                                                    size='small'
                                                    style={styles.input}
                                                    onChangeText={
                                                        handleCityChange
                                                    }
                                                    value={locationCity}
                                                    error={
                                                        locationCityError !== ''
                                                    }
                                                    helperText={
                                                        locationCityError
                                                    }
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <View>
                                            <View style={styles.container}>
                                                <TextInput
                                                    label='State'
                                                    placeholder='State'
                                                    autoCapitalize='words'
                                                    autoCorrect={false}
                                                    required
                                                    size='small'
                                                    style={styles.input}
                                                    onChangeText={
                                                        handleStateProvChange
                                                    }
                                                    value={locationStateProv}
                                                    error={
                                                        locationStateProvError !==
                                                        ''
                                                    }
                                                    helperText={
                                                        locationStateProvError
                                                    }
                                                />
                                            </View>
                                            <View style={styles.container}>
                                                <TextInput
                                                    label='Postal Code'
                                                    placeholder='Postal Code'
                                                    autoCorrect={false}
                                                    required
                                                    size='small'
                                                    style={styles.input}
                                                    onChangeText={
                                                        handlePostalCodeChange
                                                    }
                                                    value={locationPostalCode}
                                                    error={
                                                        locationPostalCodeError !==
                                                        ''
                                                    }
                                                    helperText={
                                                        locationPostalCodeError
                                                    }
                                                    keyboardType='numeric'
                                                    maxLength={5}
                                                    minLength={5}
                                                    pattern='[0-9]{5}'
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <CustomNavButton
                                        title='Next'
                                        graphic={{
                                            name: 'forward',
                                            color: 'white',
                                            size: 10,
                                        }}
                                        cbStyles={{
                                            backgroundColor: 'green',
                                            color: 'white',
                                            width: '50%',
                                        }}
                                        onPress={handleNext}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
            </ImageBackground>
        </>
    );
}
const styles = StyleSheet.create({
    root: {
        flex: 1,

        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    bgImageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    infoWrapper: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 20,
    },
    titleText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    formHeader: {
        marginVertical: 10,
        alignItems: 'center',
    },
    inputContainer: {
        marginLeft: '10%',
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        marginTop: 0,
        fontSize: 18,
        borderRadius: 6,
        width: '90%',
        backgroundColor: 'white',
    },
    inputStateProv: {
        width: 75,
    },
    inputPostalCode: {
        width: 125,
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 5,
        // textAlign: 'center',
    },
    stateProvPostalCodeContainerRow: {
        // borderWidth: 1,
        // borderColor: 'black',
    },
    stateProvPostalCodeContainer: {
        flexDirection: 'row',
    },
    stateProvSectionContainer: {
        // borderWidth: 1,
        // borderColor: 'blue',
        marginRight: 30,
    },
    stateProvInputContainer: {
        // borderWidth: 1,
        // borderColor: 'blue',
    },
    stateProvErrorContainer: {
        //borderWidth: 1, borderColor: 'blue'
    },
    postalCodeSectionContainer: {
        //borderWidth: 1, borderColor: 'black'
    },
    postalCodeInputContainer: {
        //borderWidth: 1, borderColor: 'black'
    },
    postalCodeErrorContainer: {
        //borderWidth: 1, borderColor: 'black'
    },
    stateContainer: {
        backgroundColor: 'yellow',

        borderWidth: 1,
        borderColor: 'black',
    },
    postalCodeContainer: {},
    buttonContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    submitButton: {
        width: '70%',
    },
    modalSurface: {
        marginTop: 80,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    modalTitle: {
        marginTop: 15,
        fontSize: 24,
        fontWeight: 'bold',
    },
    modalMessageWrapper: {
        marginVertical: 15,
        marginHorizontal: 15,
    },
    modalMessageText: {
        fontSize: 18,
        fontWeight: 'normal',
    },
    modalButtonContainer: {
        marginVertical: 20,
        flexDirection: 'row',
    },
    modalButtonWrapper: {
        marginHorizontal: 10,
    },
});
