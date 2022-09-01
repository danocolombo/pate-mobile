import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Avatar, Surface, Text } from 'react-native-paper';

const PersonalHeader = ({ firstName, lastName }) => {
    const [fName, setFName] = useState(firstName ? firstName : '');
    const [lName, setLName] = useState(lastName ? lastName : '');
    const [fullName, setFullName] = useState('');
    const [initials, setInitials] = useState('');

    useEffect(() => {
        let fn = fName + ' ' + lName;
        // let first = user?.firstName ? user?.firstName : '';
        // let last = user?.lastName ? user?.lastName : '';
        if (fName.length > 1 && lName.length > 1) {
            setInitials(fName.substring(0, 1) + lName.substring(0, 1));
        } else {
            setInitials('');
        }
        setFullName(fn);
    }, [firstName, lastName]);

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
