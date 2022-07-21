import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const UserCard = (props) => {
    const user = props.user;
    return (
        <View style={styles.userWrapper}>
            <View>
                <Text style={[styles.userText, styles.userName]}>
                    {user.firstName} {user.lastName}
                </Text>
            </View>
            <View>
                <Text style={[styles.userText, styles.userLocation]}>
                    {user?.residence?.city} {user?.residence?.stateProv}
                </Text>
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
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    userLocation: {
        fontSize: 20,
    },
});
