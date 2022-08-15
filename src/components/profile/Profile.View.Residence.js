import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Surface, Text, List, TextInput, Button } from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import ProfileViewInfo from './Profile.View.Info';
import Ionicons from '@expo/vector-icons/Ionicons';
import { printObject } from '../../utils/helpers';

const ProfileViewResidence = (props) => {
    const user = props.user;
    const { colors } = props.theme;

    const [street, setStreet] = useState(user?.residence?.street);
    const [city, setCity] = useState(user?.residence?.city);
    const [stateProv, setStateProv] = useState(user?.residence.stateProv);
    const [postalCode, setPostalCode] = useState(user?.residence.postalCode);

    return (
        <View>
            <List.Section>
                <List.Accordion
                    title='Residential Information'
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
                            label='Street'
                            value={street}
                            mode='flat'
                            style={styles.textInput}
                            disabled
                        />
                    </View>
                    <View style={{ marginHorizontal: 5 }}>
                        <TextInput
                            label='City'
                            disabled
                            style={styles.textInput}
                            value={city}
                            mode='flat'
                        />
                    </View>
                    <View style={{ marginHorizontal: 5 }}>
                        <TextInput
                            label='State / Providence'
                            style={styles.textInput}
                            disabled
                            value={stateProv}
                            mode='flat'
                        />
                    </View>
                    <View style={{ marginHorizontal: 5 }}>
                        <TextInput
                            label='Postal Code'
                            style={styles.textInput}
                            disabled
                            value={postalCode}
                            mode='flat'
                        />
                    </View>
                </List.Accordion>
            </List.Section>
        </View>
    );
};

export default withTheme(ProfileViewResidence);

const styles = StyleSheet.create({
    textInput: {
        fontSize: 18,
        backgroundColor: 'white',
    },
});
