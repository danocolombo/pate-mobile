import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Surface, Text, List, TextInput, Button } from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import ProfileViewInfo from './Profile.View.Info';
import ProfileViewResidence from './Profile.View.Residence';
import ProfileViewAffiliation from './Profile.View.Affiliation';
import ProfileViewAffiliations from './Profile.View.Affiliations';
import { useIsFocused } from '@react-navigation/native';
import { printObject } from '../../utils/helpers';
import { ScrollView } from 'react-native-gesture-handler';
import { color } from 'react-native-elements/dist/helpers';
import { setUseProxies } from 'immer';

const PersonalDetails = (props) => {
    const user = useSelector((state) => state.users.currentUser);
    const [theUser, setTheUser] = useState(user);
    const { colors } = props.theme;
    const isFocused = useIsFocused();
    const [contactAccordionOpen, setContactAccordionOpen] = useState(true);
    const [residenceAccordionOpen, setResidenceAccordionOpen] = useState(false);
    const [affiliationAccordionOpen, setAffiliationAccordionOpen] =
        useState(false);
    const [affiliationsAccordionOpen, setAffiliationsAccordionOpen] =
        useState(false);
<<<<<<< HEAD

    const [contactInfo, setContactInfo] = useState();

    const processInfoChange = (values) => {
        printObject('P:27-->values:', values);
=======
    printObject('user', user);
    useEffect(() => {
        setTheUser(user);
    }, [isFocused, props, user]);

    const handleContactToggle = () => {
        setContactAccordionOpen(!contactAccordionOpen);
        setAffiliationsAccordionOpen(false);
        setResidenceAccordionOpen(false);
        setAffiliationAccordionOpen(false);
    };
    const handleResidenceToggle = () => {
        setResidenceAccordionOpen(!residenceAccordionOpen);
        setAffiliationsAccordionOpen(false);
        setContactAccordionOpen(false);
        setAffiliationAccordionOpen(false);
    };
    const handleAffiliationToggle = () => {
        setAffiliationAccordionOpen(!affiliationAccordionOpen);
        setAffiliationsAccordionOpen(false);
        setContactAccordionOpen(false);
        setResidenceAccordionOpen(false);
    };
    const handleAffiliationsToggle = () => {
        setAffiliationsAccordionOpen(!affiliateAccordionOpen);
        setAffiliationAccordionOpen(false);
        setContactAccordionOpen(false);
        setResidenceAccordionOpen(false);
>>>>>>> d593a2af42c683cc238fc7e63fafe8918e7622ca
    };

    // printObject('user', user);
    // const handleContactToggle = () => {
    //     setContactAccordionOpen(!contactAccordionOpen);
    //     setAffiliationsAccordionOpen(false);
    //     setResidenceAccordionOpen(false);
    //     setAffiliationAccordionOpen(false);
    // };
    // const handleResidenceToggle = () => {
    //     setResidenceAccordionOpen(!residenceAccordionOpen);
    //     setAffiliationsAccordionOpen(false);
    //     setContactAccordionOpen(false);
    //     setAffiliationAccordionOpen(false);
    // };
    // const handleAffiliationToggle = () => {
    //     setAffiliationAccordionOpen(!affiliationAccordionOpen);
    //     setAffiliationsAccordionOpen(false);
    //     setContactAccordionOpen(false);
    //     setResidenceAccordionOpen(false);
    // };
    // const handleAffiliationsToggle = () => {
    //     setAffiliationsAccordionOpen(!affiliateAccordionOpen);
    //     setAffiliationAccordionOpen(false);
    //     setContactAccordionOpen(false);
    //     setResidenceAccordionOpen(false);
    // };
    return (
        <Surface>
            <ScrollView>
                <View>
                    <ProfileViewInfo
                        user={theUser}
                        isOpen={contactAccordionOpen}
                        // toggle={() => handleContactToggle()}
                    />
                </View>
                <View>
                    <ProfileViewResidence
                        user={theUser}
                        isOpen={residenceAccordionOpen}
                        // toggle={() => handleResidenceToggle()}
                    />
                </View>
                <View>
                    <ProfileViewAffiliation
                        user={theUser}
                        isOpen={affiliationAccordionOpen}
                        // toggle={() => handleAffiliationToggle()}
                    />
                </View>
                {user?.affiliations?.active === 'FEO' ? (
                    <View>
                        <ProfileViewAffiliations
                            user={theUser}
                            isOpen={affiliationsAccordionOpen}
                            // toggle={() => handleAffiliationsToggle()}
                        />
                    </View>
                ) : null}
            </ScrollView>
        </Surface>
    );
};

export default withTheme(PersonalDetails);

const styles = StyleSheet.create({
    textInput: {
        fontSize: 18,
        backgroundColor: 'white',
    },
    accordion: {
        backgroundColor: color.secondary,
    },
});
