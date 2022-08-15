import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Surface, Text, List, TextInput, Button } from 'react-native-paper';
import { withTheme } from 'react-native-paper';

import Ionicons from '@expo/vector-icons/Ionicons';
import { printObject } from '../../utils/helpers';

const ProfileViewAffiliation = (props) => {
    const user = props.user;
    const { colors } = props.theme;

    const [affilation, setAffiliation] = useState(user?.affiliations?.active);
    const [affiliationList, setAffiliationList] = useState(
        user?.affiliations?.options
    );

    return (
        <View>
            <List.Section>
                <List.Accordion
                    title='Affiliation Information'
                    style={{ backgroundColor: colors.secondary }}
                    expanded={props.isOpen}
                    titleStyle={{
                        color: colors.primary,
                        fontSize: 24,
                        fontWeight: '600',
                        letterSpacing: 0.5,
                    }}
                    onPress={props.toggle}
                    right={(props) => (
                        // <List.Icon {...props} icon='chevron' />
                        <Ionicons
                            name={
                                props.isOpen
                                    ? 'chevron-down-sharp'
                                    : 'chevron-up-sharp'
                            }
                            color={'black'}
                            size={24}
                        />
                    )}
                >
                    <View style={{ alignItems: 'flex-end' }}>
                        <Ionicons name={'pencil'} color={'black'} size={24} />
                    </View>
                    <View style={{ marginHorizontal: 5 }}>
                        <TextInput
                            label='Affiliation'
                            value={affilation}
                            mode='flat'
                            style={styles.textInput}
                            disabled
                        />
                    </View>
                </List.Accordion>
            </List.Section>
        </View>
    );
};

export default withTheme(ProfileViewAffiliation);

const styles = StyleSheet.create({
    textInput: {
        fontSize: 18,
        backgroundColor: 'white',
    },
});
