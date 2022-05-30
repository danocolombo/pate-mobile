import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
const ServeMyRallies = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.rootContainer}>
            <View style={styles.screenHeader}>
                <Text style={styles.screenHeaderText}>Your Events</Text>
                <View>
                    <Button
                        title='NEW'
                        onPress={() => navigation.navigate('ServeRallyForm')}
                    />
                </View>
                <View>
                    <Text>This is where your events will be listed.</Text>
                </View>
            </View>
        </View>
    );
};

export default ServeMyRallies;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    screenHeader: {
        alignItems: 'center',
    },
    screenHeaderText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
});
