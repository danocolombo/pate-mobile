import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Surface, Avatar } from '@react-native-material/core';
import RenderEditSample from './renderEdit';
import { Colors } from '../../constants/colors';
import { printObject } from '../../utils/helpers';
const Personal = ({ user }) => {
    const [fullName, setFullName] = useState('');
    const [junk, setJunk] = useState('');

    useEffect(() => {
        let name = user?.firstName + ' ' + user?.lastName;
        setFullName(name);
    }, []);
    const toggleBlock = (id) => {
        setJunk(id);
    };
    return (
        <Surface
            elevation={6}
            category='medium'
            style={{
                width: '100%',
                height: 'auto',
                paddingVertical: 10,
                paddingHorizontal: 5,
            }}
        >
            <View style={{ width: '100%' }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <View>
                        <Avatar label={fullName} />
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 24, letterSpacing: '0.5' }}>
                            {fullName}
                        </Text>
                    </View>
                </View>
            </View>
            <View>
                <View style={styles.title}>
                    <Text style={{ fontSize: 20, fontWeight: '600' }}>
                        Privacy Settings
                    </Text>
                    <Text size={20} color={Colors.CAPTION}>
                        Third most important settings
                    </Text>
                </View>
                <RenderEditSample
                    item={{ title: 'Title', id: '123' }}
                    toggleBlock={() => toggleBlock}
                />
            </View>
        </Surface>
    );
};

export default Personal;

const styles = StyleSheet.create({
    title: {
        paddingTop: 10,
        paddingBottom: 10,
    },
});
