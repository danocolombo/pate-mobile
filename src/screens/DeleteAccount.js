import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    Button,
} from 'react-native';
import { Surface, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import CustomButton from '../components/ui/CustomButton';
import { printObject } from '../utils/helpers';

const DeleteAccountScreen = (props) => {
    const navigation = useNavigation();
    const navigate = useNavigation();
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const handleConfirmCancel = () => {
        setShowConfirmDelete(false);
    };
    const handleConfirmDelete = () => {
        setShowConfirmDelete(false);
        navigation.navigate('RemoveUser', {
            id: 'DA:26',
            message: 'Kill me.',
        });
    };
    const handleConfirmRequest = () => {
        console.log('handleConfirmRequest clicked');
        setShowConfirmDelete(true);
    };
    const handleCancelIdea = () => {
        navigate.goBack();
    };
    return (
        <>
            <Modal visible={showConfirmDelete} animationStyle='slide'>
                <Surface style={[styles.surfaceContainer, { marginTop: 70 }]}>
                    <View style={styles.titleContainer}>
                        <Text
                            style={[styles.titleText, { textAlign: 'center' }]}
                        >
                            BEWARE
                        </Text>
                        <Text
                            style={[styles.titleText, { textAlign: 'center' }]}
                        >
                            YOU ARE ABOUT TO PERMANENTLY DELETE YOUR ACCOUNT
                        </Text>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <Text
                            style={[styles.topicText, { textAlign: 'center' }]}
                        >
                            You are about to remove your account information,
                            but this action will not remove the applicatiion
                            from your device.
                        </Text>
                    </View>
                    <View style={{ marginVertical: 5 }}>
                        <Text
                            style={[styles.topicText, { textAlign: 'center' }]}
                        >
                            To delete the application from your device, follow
                            your device instructions & best practice.
                        </Text>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <Button
                            onPress={handleConfirmCancel}
                            title='CANCEL DELETE REQUEST'
                            color='#841584'
                            accessibilityLabel='Nevermind this request'
                        />
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <Button
                            onPress={handleConfirmDelete}
                            title='YES, PROCEED TO DELETE'
                            color='#841584'
                            accessibilityLabel='Delete account'
                        />
                    </View>
                </Surface>
            </Modal>
            <View style={styles.rootContainer}>
                <Surface style={styles.surfaceContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>
                            Delete Account Request
                        </Text>
                    </View>
                    <View style={{ marginTop: 5, marginBottom: 15 }}>
                        <Text>
                            We don't want you to go, but we respect your
                            personal desire to delete your account.
                        </Text>
                    </View>
                    <View>
                        <View style={styles.warniingContainer}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.warningTitle}>WARNING</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.warningText}>
                                    This can't be reversed.
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <Text
                            style={[styles.topicText, { textAlign: 'center' }]}
                        >
                            This will delete all your personal information from
                            the system and impact future use. Please review
                            these carefully.
                        </Text>
                    </View>

                    <View style={styles.topicContainer}>
                        <View>
                            <Text style={styles.topicHeader}>
                                Loss of History
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.topicText}>
                                All history of your registrations will be
                                disassociated with you. You will not be able to
                                recover this histgory and the organization will
                                not have aany indicated that the reservations
                                were associated with you
                            </Text>
                        </View>
                    </View>
                    <View style={styles.topicContainer}>
                        <View>
                            <Text style={styles.topicHeader}>
                                Loss Of All Access
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.topicText}>
                                If you just want to leave a specific group or
                                association, you can do that on the profile page
                                without deleting your account. If you elect to
                                delete your account, you will lose all
                                connections to associations.
                            </Text>
                        </View>
                    </View>
                    <Button
                        onPress={handleCancelIdea}
                        title='No, nevermind'
                        color='#841584'
                        accessibilityLabel='Abort idea to delete account'
                    />
                    <View style={{ marginTop: 10 }}>
                        <Button
                            onPress={handleConfirmRequest}
                            title='Yes, proceed to delete'
                            color='#841584'
                            accessibilityLabel='Yes, cancel account'
                        />
                    </View>
                </Surface>
            </View>
        </>
    );
};

export default DeleteAccountScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: 10,
        justifyContent: 'top',
        alignItems: 'center',
    },
    surfaceContainer: {
        marginHorizontal: 10,
        width: '95%',
        marginHorizontal: 10,
        padding: 20,
    },
    titleContainer: {},
    titleText: {
        fontSize: 28,
        fontWeight: '600',
    },
    warniingContainer: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: Colors.critical,
        backgroundColor: Colors.critical,
        paddingVertical: 5,
    },
    warningTitle: {
        fontSize: 26,
        fontWeight: '500',
        color: 'white',
    },
    warningText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '400',
        letterSpacing: 0.7,
    },
    text: {
        fontSize: 16,
        paddingVertical: 10,
    },
    topicContainer: { marginHorizontal: 5, marginBottom: 10 },
    topicHeader: { fontSize: 20, fontWeight: '600', letterSpacing: 0.2 },
    topicText: { fontSize: 16, fontWeight: '500', letterSpacing: 0.4 },
    buttonContainer: {
        flexDirection: 'row',
    },
    buttonWrapper: {
        width: '50%',
        padding: 10,
    },
});
