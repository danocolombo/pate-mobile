import { StyleSheet, View, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Surface, Text, List, TextInput, Button } from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ProfileViewInfo from './Profile.View.Info';
import Ionicons from '@expo/vector-icons/Ionicons';
import { printObject } from '../../utils/helpers';

const ProfileViewResidence = (props) => {
    const user = props.user;
    const { colors } = props.theme;
    const navigation = useNavigation();
    const [street, setStreet] = useState(
        user?.residence?.street ? user?.residence?.street : ''
    );
    const [city, setCity] = useState(
        user?.residence?.city ? user?.residence?.city : ''
    );
    const [stateProv, setStateProv] = useState(
        user?.residence?.stateProv ? user?.resideence?.stateProv : ''
    );
    const [postalCode, setPostalCode] = useState(
        user?.residence?.postalCode ? user?.residence?.postalCode : ''
    );
    const [residenceAccordionOpen, setResidenceAccordionOpen] = useState(false);
    const handlePress = () =>
        setResidenceAccordionOpen(!residenceAccordionOpen);
    const handleEditRequest = () => {
        navigation.navigate('ProfileEditResidence');
    };
    return (
        <View>
            <List.Section>
                <List.Accordion
                    title='Residence Information'
                    style={{ backgroundColor: colors.secondary }}
                    expanded={residenceAccordionOpen}
                    titleStyle={{
                        color: colors.primary,
                        fontSize: 24,
                        fontWeight: '600',
                        letterSpacing: 0.5,
                    }}
                    onPress={handlePress}
                    right={(props) => (
                        // <List.Icon {...props} icon='chevron' />
                        <Ionicons
                            name={
                                residenceAccordionOpen
                                    ? 'chevron-down-sharp'
                                    : 'chevron-up-sharp'
                            }
                            color={'black'}
                            size={24}
                        />
                    )}
                >
                    <View style={{ alignItems: 'flex-end', paddingRight: 15 }}>
                        <Pressable
                            key={user.uid}
                            onPress={() => handleEditRequest()}
                            style={({ pressed }) => pressed && styles.pressed}
                        >
                            <Ionicons
                                name={'pencil'}
                                color={colors.lightBlack}
                                size={24}
                            />
                        </Pressable>
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
