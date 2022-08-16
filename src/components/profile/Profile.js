import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Surface, Text, List, TextInput, Button } from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import ProfileViewInfo from './Profile.View.Info';
import ProfileViewResidence from './Profile.View.Residence';
import ProfileViewAffiliation from './Profile.View.Affiliation';
import ProfileViewAffiliates from './Profile.View.Affiliates';

import { printObject } from '../../utils/helpers';
import { ScrollView } from 'react-native-gesture-handler';
import { color } from 'react-native-elements/dist/helpers';

const PersonalDetails = (props) => {
    const user = props.user;
    const { colors } = props.theme;
    const [contactAccordionOpen, setContactAccordionOpen] = useState(true);
    const [residenceAccordionOpen, setResidenceAccordionOpen] = useState(false);
    const [affiliationAccordionOpen, setAffiliationAccordionOpen] =
        useState(false);
    const [affiliateAccordionOpen, setAffiliateAccordionOpen] = useState(false);
    printObject('user', user);
    const handleContactToggle = () => {
        setContactAccordionOpen(!contactAccordionOpen);
        setAffiliateAccordionOpen(false);
        setResidenceAccordionOpen(false);
        setAffiliationAccordionOpen(false);
    };
    const handleResidenceToggle = () => {
        setResidenceAccordionOpen(!residenceAccordionOpen);
        setAffiliateAccordionOpen(false);
        setContactAccordionOpen(false);
        setAffiliationAccordionOpen(false);
    };
    const handleAffiliationToggle = () => {
        setAffiliationAccordionOpen(!affiliationAccordionOpen);
        setAffiliateAccordionOpen(false);
        setContactAccordionOpen(false);
        setResidenceAccordionOpen(false);
    };
    const handleAffiliateToggle = () => {
        setAffiliateAccordionOpen(!affiliateAccordionOpen);
        setAffiliationAccordionOpen(false);
        setContactAccordionOpen(false);
        setResidenceAccordionOpen(false);
    };
    return (
        <Surface>
            <ScrollView>
                <View>
                    <ProfileViewInfo
                        user={user}
                        isOpen={contactAccordionOpen}
                        toggle={() => handleContactToggle()}
                    />
                </View>
                <View>
                    <ProfileViewResidence
                        user={user}
                        isOpen={residenceAccordionOpen}
                        toggle={() => handleResidenceToggle()}
                    />
                </View>
                <View>
                    <ProfileViewAffiliation
                        user={user}
                        isOpen={affiliationAccordionOpen}
                        toggle={() => handleAffiliationToggle()}
                    />
                </View>
                <View>
                    <ProfileViewAffiliates
                        user={user}
                        isOpen={affiliateAccordionOpen}
                        toggle={() => handleAffiliateToggle()}
                    />
                </View>
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
