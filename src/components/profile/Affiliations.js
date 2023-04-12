import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { Surface } from 'react-native-paper';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../pateGraphQL/queries';
import * as mutations from '../../pateGraphQL/mutations';
import { initializeDivision } from '../../features/division/divisionSlice';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from 'react-native-paper-dropdown';
import CustomButton from '../ui/CustomButton';
import { Colors } from '../../constants/colors';
import { updateGQLUser } from '../../providers/users';
import { printObject } from '../../utils/helpers';
import {
    updateAffiliationActive,
    updateCurrentUser,
} from '../../features/users/usersSlice';
import AffiliationDropDown from './AffiliationDropDown';
import AffiliationAdd from './AffiliationAdd';
const Affiliations = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.users.currentUser);
    const affiliations = useSelector(
        (state) => state.users.currentUser.affiliations.items
    );
    const [showAffiliationDropdown, setShowAffiliationDropdown] =
        useState(false);
    const [showDefaultAffiliationDropdown, setShowDefaultAffiliationDropdown] =
        useState(false);
    const [affiliationList, setAffiliationList] = useState([]);
    const [defaultAffiliationList, setDefaultAffiliationList] = useState([]);
    const [activeAffiliation, setActiveAffiliation] = useState(
        useSelector((state) => state.users.currentUser.affiliations.active)
    );
    const [defaultAffiliationId, setDefaultAffiliationId] = useState();
    const [defaultAffiliation, setDefaultAffiliation] = useState(
        useSelector((state) => state.users.currentUser.defaultDivision)
    );
    const [showDefaultChangedModal, setShowDefaultChangedModal] =
        useState(false);
    const [showAffiliationSwitchModal, setShowAffiliationSwitchModal] =
        useState(false);
    const [showAffiliationChangedModal, setShowAffiliationChangedModal] =
        useState(false);
    // printObject('A:5-->affiliations:', affiliations);
    useLayoutEffect(() => {
        //load the affiliationsList

        let theList = [];
        affiliations.forEach((a) => {
            // check for default
            if (currentUser.defaultDivision.id === a.division.id) {
                setDefaultAffiliationId(a.id);
            }
            let aff = {};
            (aff.value = a.id),
                (aff.label = a.division.organization.description);
            theList.push(aff);
        });
        setAffiliationList(theList);
        setDefaultAffiliationList(theList);
        printObject('A:42=>list:', theList);

        printObject('defaultAffiliation:', defaultAffiliation);
    }, []);
    const setAffiliationValue = (affValue) => {
        console.log('A:35-->setAffiliationValue(1)');
        //check if the value is already selected.
        // butild new active values.
        //* 1. get the new affiliation values
        const selectedAff = affiliations.find((a) => a.id === affValue);
        //* 2. build new value
        let newValue = {
            affiliationId: affValue,
            status: selectedAff.status,
            role: selectedAff.role,
            divisionId: selectedAff.division.id,
            divisionCode: selectedAff.division.code,
            organizationId: selectedAff.division.organization.id,
            organizationAppName: selectedAff.division.organization.appName,
            organizationAvailable: selectedAff.division.organization.available,
            organizationCategory: selectedAff.division.organization.category,
            organizationDescription:
                selectedAff.division.organization.description,
            organizationExposure: selectedAff.division.organization.exposure,
            organizationLabel: selectedAff.division.organization.label,
            organizationName: selectedAff.division.organization.name,
            organizationValue: selectedAff.division.organization.value,
            organizationCode: selectedAff.division.organization.code,
            organizationTitle: selectedAff.division.organization.title,
            label: selectedAff.division.organization.appName,
            region: selectedAff.division.code,
            value: selectedAff.division.organization.value,
        };
        setActiveAffiliation(newValue);
        try {
            dispatch(updateAffiliationActive(newValue));
        } catch (error) {
            console.log('error tryiing to update active affiliation in redux');
            printObject('error:\n', error);
        }
        const getDivisionalEvents = async () => {
            try {
                const variables = {
                    divId: selectedAff.division.id,
                };
                await API.graphql(
                    graphqlOperation(queries.getAllDivisionEvents, variables)
                )
                    .then((divEventsResponse) => {
                        //  *************************************
                        //      got graphQL divEvents response
                        //  *************************************

                        if (divEventsResponse?.data?.getDivision?.id) {
                            dispatch(
                                initializeDivision(
                                    divEventsResponse.data.getDivision
                                )
                            );
                        }
                    })
                    .catch((error) => {
                        printObject(
                            'SIS:284--> divEventRequest error:\n',
                            error
                        );
                    });
            } catch (error) {
                printObject(
                    'SIS:287--> divEventRequest try/catch error:\n',
                    error
                );
            }
            setShowAffiliationSwitchModal(true);
        };
        getDivisionalEvents();
        return;
    };
    const setDefaultValue = async (value) => {
        // this function saves the selected affiliation as default for user
        // get the affiliation from the aff list...
        const selectedAff = affiliations.find((a) => a.id === value);
        setDefaultAffiliationId(value);
        const newDefaultDivision = {
            defaultDivision: {
                id: selectedAff.division.id,
                code: selectedAff.division.code,
                organization: {
                    id: selectedAff.division.organization.id,
                    code: selectedAff.division.organization.code,
                    title: selectedAff.division.organization.title,
                },
            },
        };
        try {
            dispatch(updateCurrentUser(newDefaultDivision));
            try {
                console.log('BEFORE');
                const userUpdateResults = await updateGQLUser({
                    id: currentUser.id,
                    divisionDefaultUsersId: selectedAff.division.id,
                });
                setShowDefaultChangedModal(true);
            } catch (error) {
                printObject('A:178==>error:\n', error);
            }
        } catch (error) {
            console.log('error tryiing to update active affiliation in redux');
        }
        printObject('A158-->currentUser:', currentUser);
    };
    printObject('A:81==>currentUser: \n', currentUser);
    return (
        <>
            <Modal visible={showDefaultChangedModal} animationStyle='slide'>
                <Surface style={styles.modalSurface}>
                    <View>
                        <View style={{ marginTop: 5, alignItems: 'center' }}>
                            <Text style={styles.modalTitle}>
                                Default Changed
                            </Text>
                        </View>
                        <View style={styles.modalInfoWrapper}>
                            <Text style={styles.modalText}>
                                Your default affiliation has been changed and
                                will be in effect the next time you login.
                            </Text>
                        </View>
                        <View style={styles.modalButtonContainer}>
                            <View style={styles.modalButton}>
                                <CustomButton
                                    title='Dismiss'
                                    graphic={null}
                                    cbStyles={{
                                        backgroundColor: Colors.gray35,
                                        color: 'black',
                                    }}
                                    txtColor='white'
                                    onPress={() =>
                                        setShowDefaultChangedModal(false)
                                    }
                                />
                            </View>
                        </View>
                    </View>
                </Surface>
            </Modal>
            <Modal visible={showAffiliationSwitchModal} animationStyle='slide'>
                <Surface style={styles.modalSurface}>
                    <View>
                        <View style={{ marginTop: 5, alignItems: 'center' }}>
                            <Text style={styles.modalTitle}>
                                Affiliation Changed
                            </Text>
                        </View>
                        <View style={styles.modalInfoWrapper}>
                            <Text style={styles.modalText}>
                                Your application is now pointing to{' '}
                            </Text>
                            <Text style={styles.modalAffiliationDescription}>
                                {
                                    currentUser?.affiliations?.active
                                        ?.organizationDescription
                                }
                            </Text>
                        </View>
                        <View style={styles.modalButtonContainer}>
                            <View style={styles.modalButton}>
                                <CustomButton
                                    title='Dismiss'
                                    graphic={null}
                                    cbStyles={{
                                        backgroundColor: Colors.gray35,
                                        color: 'black',
                                    }}
                                    txtColor='white'
                                    onPress={() =>
                                        setShowAffiliationSwitchModal(false)
                                    }
                                />
                            </View>
                        </View>
                    </View>
                </Surface>
            </Modal>
            <Surface style={styles.affiliateSurfaceContainer}>
                <View style={{ paddingLeft: 5 }}>
                    <View>
                        <Text>Set active affiliation</Text>
                    </View>
                </View>

                <View>
                    <AffiliationDropDown
                        list={affiliationList}
                        activeValue={activeAffiliation.affiliationId}
                        setValue={setAffiliationValue}
                    />
                </View>
                <View style={{ paddingLeft: 5, marginTop: 20 }}>
                    <View>
                        <Text>Set default affiliation</Text>
                    </View>
                </View>

                <View>
                    <AffiliationDropDown
                        list={defaultAffiliationList}
                        activeValue={defaultAffiliationId}
                        setValue={setDefaultValue}
                    />
                </View>
                <View>
                    <AffiliationAdd />
                </View>
            </Surface>
        </>
    );
};

export default Affiliations;
const styles = StyleSheet.create({
    formHeader: {
        marginVertical: 10,
        alignItems: 'center',
    },
    FAB: {
        position: 'absolute',
        marginRight: 16,
        right: 0,
        bottom: 0,
        backgroundColor: 'green',
    },
    FABAffiliationChange: {
        position: 'absolute',
        marginRight: 16,
        // top: 100,
        right: 0,
        bottom: 10,
        backgroundColor: 'green',
    },
    personalSurface: {
        padding: 5,
        marginHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 10,
        marginTop: 10,

        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    accordionHeader: {
        borderRadius: 10,
        marginHorizontal: 5,
    },
    inputContainer: {
        marginLeft: '10%',
    },
    labelContainer: {
        marginTop: 3,
    },
    labelText: {
        fontSize: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 5,
        marginTop: 2,
        fontSize: 18,
        borderRadius: 6,
        width: '90%',
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
    phoneWrapper: {
        marginTop: 5,
        marginBottom: 3,
    },
    phoneWrapperError: {
        marginBottom: 10,
    },
    phoneError: {
        color: 'red',
        fontWeight: '500',
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
    affiliateSurfaceContainer: {
        padding: 5,
        marginHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    affiliatesSurfaceContainer: {
        padding: 5,
        marginHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 75,
        marginBottom: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    affiliateTitle: {
        textAlign: 'center',
        fontSize: 24,
    },
    instructionWrapper: {
        marginVertical: 10,
    },
    instructionText: {
        fontSize: 18,
        textAlign: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    submitButton: {
        width: '70%',
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

    modalTitle: {
        marginTop: 15,
        fontSize: 30,
        fontWeight: 'bold',
    },
    modalInfoWrapper: {
        marginTop: 15,
        paddingHorizontal: 20,
        width: '100%',
    },
    modalAffiliationDescription: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.primary,
    },
    modalText: {
        fontSize: 24,
        textAlign: 'center',
        letterSpacing: 0.7,
        marginHorizontal: 10,
        marginVertical: 5,
    },
    modalButtonContainer: {
        marginVertical: 20,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalButtonWrapper: { flexDirection: 'row' },
    modalButton: {
        paddingHorizontal: 10,
    },
    segregateRow: {
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    segregateTextWrapper: { paddingHorizontal: 5 },
    segregateText: { fontSize: 18 },
    segregateCheckboxWrapper: {},
    segregationTipWrapper: { marginLeft: 10 },
});
