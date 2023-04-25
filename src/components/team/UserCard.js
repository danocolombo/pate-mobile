import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { printObject } from '../../utils/helpers';

const UserCard = (props) => {
    const profile = props.user;
    const role =
        props.user.role === 'lead' ||
        props.user.role === 'director' ||
        props.user.role === 'owner'
            ? props.user.role.toUpperCase()
            : '';
    return (
        <View style={styles.userWrapper}>
            <View style={styles.roleContainer}>
                <Text style={styles.roleText}>{role}</Text>
            </View>
            <View>
                {(profile?.user?.firstName || profile?.user?.lastName) && (
                    <Text style={[styles.userText, styles.userName]}>
                        {profile?.user?.firstName} {profile?.user?.lastName}
                    </Text>
                )}
                {!profile?.user?.firstName && !profile?.user?.lastName && (
                    <Text style={[styles.userText, styles.userName]}>
                        {profile?.user?.username}
                    </Text>
                )}
            </View>
            <View>
                {profile?.user?.residence ? (
                    <Text style={[styles.userText, styles.userLocation]}>
                        {profile?.user?.residence?.city}{' '}
                        {profile?.user?.residence?.stateProv}
                    </Text>
                ) : (
                    <Text style={[styles.userProfileMissingText]}>
                        profile incomplete
                    </Text>
                )}
            </View>
        </View>
    );
};

export default UserCard;

const styles = StyleSheet.create({
    cardContainer: {
        // flex: 1,
        // flexDirection: 'row',
        // width: '80%',
        // marginHorizontal: 20,
        // borderColor: 'black',
        // borderEndWidth: 1,
    },
    userWrapper: {
        width: '80%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 5,
    },
    userText: {
        textAlign: 'center',
    },
    userProfileMissingText: {
        textAlign: 'center',
        color: 'red',
        fontSize: 16,
        fontStyle: 'italic',
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    userLocation: {
        fontSize: 20,
    },
    roleContainer: {
        padding: 0,
        margin: 0,
    },
    roleText: {
        textAlign: 'right',
        fontSize: 12,
    },
});
