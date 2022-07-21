import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { printObject } from '../../utils/helpers';
import UserCard from './UserCard';
import { Surface } from 'react-native-paper';

const UsersList = (props) => {
    const profiles = props.data;
    const listTitle = props.title;
    const cStyles = props.customStyle;
    // printObject('UL09--> cStyles', cStyles);
    return (
        <>
            <Surface style={[styles.surface, cStyles]}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.titleText}>{listTitle}</Text>
                </View>
                <View style={styles.listContainer}>
                    {!!profiles
                        ? profiles.map((p) => {
                              return <UserCard user={p} key={p.uid} />;
                          })
                        : null}
                </View>
            </Surface>
        </>
    );
};

export default UsersList;

const styles = StyleSheet.create({
    surface: {
        width: '90%',
        marginLeft: '5%',
        marginRight: '5%',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    titleWrapper: {
        alignItems: 'center',
        paddingBottom: 10,
    },
    titleText: {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold',
    },
    listContainer: {
        alignItems: 'center',

        // marginTop: 10,
    },
});
