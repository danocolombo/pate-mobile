import { StyleSheet, View, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Surface, Text, List, TextInput, Button } from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { printObject } from '../../utils/helpers';

const ProfileViewInfo = (props) => {
    const user = props.user;
    const isOpen = props.isOpen;
    const handleToggle = props.toggle;
    const { colors } = props.theme;
    const navigation = useNavigation();
    const [contactAccordionOpen, setContactAccordionOpen] = useState(false);

    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [email, setEmail] = useState(user?.email);
    const [phone, setPhone] = useState(user?.phone);

    const handlePress = () => setContactAccordionOpen(!contactAccordionOpen);
    const handleEditRequest = () => {
        navigation.navigate('ProfileEditInfo');
    };
    useEffect(() => {
        if (user.phone) {
            let formattedPhone =
                '(' +
                user.phone.substring(0, 3) +
                ') ' +
                user.phone.substring(3, 6) +
                '-' +
                user.phone.substring(6);
            setPhone(formattedPhone);
        }
    }, []);

    return (
        <Surface>
            <View>
                <List.Section>
                    <List.Accordion
                        title='Contact Information'
                        expanded={contactAccordionOpen}
                        style={{ backgroundColor: colors.secondary }}
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
                                    contactAccordionOpen
                                        ? 'chevron-down-sharp'
                                        : 'chevron-up-sharp'
                                }
                                color={'black'}
                                size={24}
                            />
                        )}
                    >
                        <View
                            style={{ alignItems: 'flex-end', paddingRight: 15 }}
                        >
                            <Pressable
                                key={user.uid}
                                onPress={() => handleEditRequest()}
                                style={({ pressed }) =>
                                    pressed && styles.pressed
                                }
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
                                label='First Name'
                                value={firstName}
                                mode='flat'
                                style={styles.textInput}
                                disabled
                                onChangeText={(text) => setFirstName(text)}
                            />
                        </View>
                        <View style={{ marginHorizontal: 5 }}>
                            <TextInput
                                label='Last Name'
                                disabled
                                style={styles.textInput}
                                value={lastName}
                                mode='flat'
                                onChangeText={(text) => setLastName(text)}
                            />
                        </View>
                        <View style={{ marginHorizontal: 5 }}>
                            <TextInput
                                label='Email'
                                style={styles.textInput}
                                disabled
                                value={email}
                                mode='flat'
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>
                        <View style={{ marginHorizontal: 5 }}>
                            <TextInput
                                label='Phone'
                                style={styles.textInput}
                                disabled
                                value={phone}
                                mode='flat'
                                onChangeText={(text) => setPhone(text)}
                            />
                        </View>
                    </List.Accordion>
                </List.Section>
            </View>
        </Surface>
    );
};

export default withTheme(ProfileViewInfo);

const styles = StyleSheet.create({
    textInput: {
        fontSize: 18,
        backgroundColor: 'white',
    },
});
