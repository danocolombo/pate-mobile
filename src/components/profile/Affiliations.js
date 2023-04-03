import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../pateGraphQL/queries';
import { initializeDivision } from '../../features/division/divisionSlice';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from 'react-native-paper-dropdown';
import { printObject } from '../../utils/helpers';
import { updateAffiliationActive } from '../../features/users/usersSlice';
const Affiliations = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.users.currentUser);
    const affiliations = useSelector(
        (state) => state.users.currentUser.affiliations.items
    );
    const [testValue, setTestValue] = useState();
    const [showAffiliationDropdown, setShowAffiliationDropdown] =
        useState(false);
    const [affiliationList, setAffiliationList] = useState([]);
    const [activeAffiliation, setActiveAffiliation] = useState(
        useSelector((state) => state.users.currentUser.affiliations.active)
    );
    printObject('A:5-->affiliations:', affiliations);
    useLayoutEffect(() => {
        //load the affiliationsList

        let theList = [];
        affiliations.forEach((a) => {
            let aff = {};
            (aff.value = a.id),
                (aff.label = a.division.organization.description);
            theList.push(aff);
        });
        setAffiliationList(theList);
    }, []);
    const setAffiliationValue = (affValue) => {
        console.log('A:35-->setAffiliationValue(1)');
        //check if the value is already selected.
        // if (affValue === activeAffiliation.affiliationId) {
        //     // no change necessary
        //     return;
        // }
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
        //todo - need to update the redux currentUser
        //todo =====================================================
        try {
            dispatch(updateAffiliationActive(newValue));
        } catch (error) {
            console.log('error tryiing to update active affiliation in redux');
            printObject('error:\n', error);
        }
        //todo --------------------------------------------
        //todo update divisionEvents
        //todo --------------------------------------------
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
        };
        getDivisionalEvents();
        //todo - need to update the DB.
        //todo =====================================================
        return;
    };
    printObject('A:81==>currentUser: \n', currentUser);
    return (
        <>
            <Surface style={styles.affiliateSurfaceContainer}>
                <View style={styles.inputContainer}>
                    <View>
                        <Text>AFFILIATIONS HERE</Text>
                    </View>
                </View>
                <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>
                        {activeAffiliation.organizationDescription}
                    </Text>
                </View>
                <View>
                    <DropDown
                        // label={'Gender'}
                        mode={'outlined'}
                        dense='true'
                        visible={showAffiliationDropdown}
                        showDropDown={() => setShowAffiliationDropdown(true)}
                        onDismiss={() => setShowAffiliationDropdown(false)}
                        value={activeAffiliation.affiliationId}
                        setValue={(value) => setAffiliationValue(value)}
                        list={affiliationList}
                    />
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
    modalText: {
        fontSize: 24,
        textAlign: 'center',
        letterSpacing: 0.7,
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
