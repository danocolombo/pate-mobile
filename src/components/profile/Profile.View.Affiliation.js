import { StyleSheet, View, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Surface, Text, List, TextInput, Button } from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { printObject, capitalize } from '../../utils/helpers';
import { useSelector } from 'react-redux';

const ProfileViewAffiliation = (props) => {
    const user = props.user;
    const { affiliate } = useSelector((state) => state.system);
    const { colors } = props.theme;
    const navigation = useNavigation();
    const [affiliationAccordionOpen, setAffiliationAccordionOpen] =
        useState(false);
    const handlePress = () =>
        setAffiliationAccordionOpen(!affiliationAccordionOpen);
    const handleEditRequest = () => {
        navigation.navigate('ProfileEditAffiliation');
    };
    const accordionTitle = capitalize(affiliate.label) + ' Information';
    return (
        <View>
            <List.Section>
                <List.Accordion
                    title={accordionTitle}
                    style={{ backgroundColor: colors.secondary }}
                    expanded={affiliationAccordionOpen}
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
                                affiliationAccordionOpen
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
                            label='Name'
                            value={user?.affiliate?.name}
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
                            value={user?.affiliate?.city}
                            mode='flat'
                        />
                    </View>
                    <View style={{ marginHorizontal: 5 }}>
                        <TextInput
                            label='State / Providence'
                            style={styles.textInput}
                            disabled
                            value={user?.affiliate?.stateProv}
                            mode='flat'
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
