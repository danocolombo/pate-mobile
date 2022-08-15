import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Surface, Text, List, TextInput, Button } from 'react-native-paper';
import { Colors } from '../../constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

const PersonalEdit = ({ user }) => {
    const [isOpened, setIsOpened] = useState(true);
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [email, setEmail] = useState(user?.email);
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);

    const handlePress = () => setIsOpened(!isOpened);

    return (
        <Surface>
            <View>
                <List.Section>
                    <List.Accordion
                        title='Contact Information'
                        titleStyle={{
                            color: Colors.primary,
                            fontSize: 24,
                            fontWeight: '600',
                            letterSpacing: 0.5,
                        }}
                        onPress={handlePress}
                        right={(props) => (
                            // <List.Icon {...props} icon='chevron' />
                            <Ionicons
                                name={
                                    isOpened
                                        ? 'chevron-down-sharp'
                                        : 'chevron-up-sharp'
                                }
                                color={'black'}
                                size={24}
                            />
                        )}
                    >
                        <View style={{ marginHorizontal: 5 }}>
                            <TextInput
                                label='First Name'
                                value={firstName}
                                mode='outlined'
                                onChangeText={(text) => setFirstName(text)}
                            />
                        </View>
                        <View style={{ marginHorizontal: 5 }}>
                            <TextInput
                                label='Last Name'
                                value={lastName}
                                mode='outlined'
                                onChangeText={(text) => setLastName(text)}
                            />
                        </View>
                        <View style={{ marginHorizontal: 5 }}>
                            <TextInput
                                label='Email'
                                value={email}
                                mode='outlined'
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>
                        <View style={{ marginHorizontal: 5 }}>
                            <TextInput
                                label='Last Name'
                                value={lastName}
                                mode='outlined'
                                onChangeText={(text) => setLastName(text)}
                            />
                        </View>
                        <View
                            style={{ marginHorizontal: 25, marginVertical: 5 }}
                        >
                            <Button
                                // icon='camera'
                                color={Colors.success}
                                mode='contained'
                                onPress={() => console.log('Pressed')}
                            >
                                Update
                            </Button>
                        </View>
                    </List.Accordion>
                </List.Section>
            </View>
        </Surface>
    );
};

{
    /* <Ionicons
    name={isOpened ? 'chevron-up-sharp' : 'chevron-down-sharp'}
    color={'black'}
    size={24}
/>; */
}

export default PersonalEdit;

const styles = StyleSheet.create({});
