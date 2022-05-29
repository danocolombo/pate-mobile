import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import React from 'react';

const ServeMyRallies = () => {
    return (
        <View style={styles.rootContainer}>
            <View style={styles.screenHeader}>
                <Text style={styles.screenHeaderText}>Your Events</Text>
                <View>
                    <Button
                        title='NEW'
                        onPress={() => Alert.alert('Simple Button pressed')}
                    />
                </View>
                <View>
                    <Text>This is where your events will be listed.</Text>
                </View>
                <View>
                    <Text>...</Text>
                    <Text>...</Text>
                    <Text>...</Text>
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
