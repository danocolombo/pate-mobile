import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Avatar, Surface, Text } from 'react-native-paper';

const PersonalHeader = ({ user }) => {
    const [fullName, setFullName] = useState('');
    const [initials, setInitials] = useState('');

    useEffect(() => {
        let fn = user.firstName + ' ' + user.lastName;
        let first = user.firstName;
        let last = user.lastName;
        setInitials(first.substring(0, 1) + last.substring(0, 1));
        setFullName(fn);
    }, []);

    return (
        <Surface>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                }}
            >
                <View>
                    <Avatar.Text size={60} label={initials} />
                </View>
                <View style={{ paddingLeft: 10 }}>
                    <Text style={{ fontSize: 26, fontWeight: '400' }}>
                        {fullName}
                    </Text>
                </View>
            </View>
        </Surface>
    );
};

export default PersonalHeader;

const styles = StyleSheet.create({});
