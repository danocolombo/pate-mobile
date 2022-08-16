import { StyleSheet, View, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Surface, Text, List, TextInput, Button } from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { printObject } from '../../utils/helpers';

const ProfileViewAffiliates = (props) => {
    const user = props.user;
    const { colors } = props.theme;
    const navigation = useNavigation();
    const [affilation, setAffiliation] = useState(user?.affiliations?.active);
    const [affiliationList, setAffiliationList] = useState(
        user?.affiliations?.options
    );
    const handleEditRequest = () => {
        navigation.navigate('ProfileEditAffiliation');
    };
    return (
        <View>
            <List.Section>
                <List.Accordion
                    title='Affiliate Information'
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

export default withTheme(ProfileViewAffiliates);

const styles = StyleSheet.create({
    textInput: {
        fontSize: 18,
        backgroundColor: 'white',
    },
});
