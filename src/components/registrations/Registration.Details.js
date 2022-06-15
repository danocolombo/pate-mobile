import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, Modal, Alert } from 'react-native';
import { Surface } from 'react-native-paper';
import RegistrationLocation from './Registration.Location.Info';
import RegistrarInfo from './Registration.Registrar.Info';
import RegistrarChurchInfo from './Registration.Registrar.Church.Info';
import RegistrarAttendance from './Registration.Attendance.Info';
import CustomButton from '../ui/CustomButton';
import { Colors } from '../../constants/colors';

import { printObject } from '../../utils/helpers';
import NumberInput from '../ui/NumberInput/NumberInput';
const RegistrationDetails = ({ reg }) => {
    const [attendance, setAttendance] = useState(parseInt(reg.attendeeCount));
    const [mealCount, setMealCount] = useState(parseInt(reg.mealCount));
    const [showEditModal, setShowEditModal] = useState(false);
    const [showNotifyModal, setShowNotifyModal] = useState(false);
    // printObject('reg:', reg);
    const rallyArray = useSelector((state) =>
        state.rallies.publicRallies.filter((r) => r.uid === reg.eid)
    );
    let rallyEntry = rallyArray[0];
    //printObject('rallyEntry:', rallyEntry);
    const handleEditNumbersPress = () => {
        setShowEditModal(true);
    };
    const handleAttendanceValueChange = (e) => {
        setAttendance(parseInt(e));
    };
    const handleMealCountValueChange = (e) => {
        setMealCount(parseInt(e));
    };
    const handleNumbersConfirm = () => {
        let updatedRegistration = {
            ...reg,
            attendeeCount: attendance,
            mealCount: mealCount,
        };
        printObject('updated registraiton....', updatedRegistration);
        //todo:  need to update DDB, no redux for registrations.
        setShowEditModal(false);
        setShowNotifyModal(true);
    };

    const handleDeleteRegPress = () => {
        Alert.alert('DELETE', 'DELETING REGISTRATIONS');
    };
    return (
        <>
            <Modal visible={showEditModal} animationStyle='slide'>
                <Surface style={styles.modalSurface}>
                    <View style={styles.modalInfoWrapper}>
                        <Text style={styles.modalTitle}>Modify Numbers</Text>
                    </View>
                    <View>
                        <NumberInput
                            value={attendance}
                            onAction={handleAttendanceValueChange}
                        />
                    </View>
                    <View>
                        <NumberInput
                            value={mealCount}
                            onAction={handleMealCountValueChange}
                        />
                    </View>
                    <View style={styles.modalButtonContainer}>
                        <View style={styles.modalButtonWrapper}>
                            <View style={styles.modalConfirmButton}>
                                <CustomButton
                                    title='CANCEL'
                                    graphic={null}
                                    cbStyles={{
                                        backgroundColor: Colors.gray35,
                                        color: 'black',
                                    }}
                                    txtColor='white'
                                    onPress={() => setShowEditModal(false)}
                                />
                            </View>
                        </View>

                        <View style={styles.modalButtonWrapper}>
                            <View style={styles.modalCancelButton}>
                                <CustomButton
                                    title='UPDATE'
                                    graphic={null}
                                    cbStyles={{
                                        backgroundColor: 'green',
                                        color: 'white',
                                    }}
                                    txtColor='white'
                                    onPress={() => {
                                        handleNumbersConfirm();
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </Surface>
            </Modal>
            <Modal visible={showNotifyModal} animationStyle='slide'>
                <Surface style={styles.modalSurface}>
                    <View style={styles.modalInfoWrapper}>
                        <Text style={styles.modalTitle}>Communicate Well</Text>
                    </View>
                    <View>
                        <Text>
                            Make sure to notify registrar of your changes.
                        </Text>
                    </View>
                    <View style={styles.modalButtonContainer}>
                        <View style={styles.modalButtonWrapper}>
                            <View style={styles.modalCancelButton}>
                                <CustomButton
                                    title='OK'
                                    graphic={null}
                                    cbStyles={{
                                        backgroundColor: 'green',
                                        color: 'white',
                                    }}
                                    txtColor='white'
                                    onPress={() => setShowNotifyModal(false)}
                                />
                            </View>
                        </View>
                    </View>
                </Surface>
            </Modal>

            <RegistrationLocation rally={rallyEntry} />
            <RegistrarInfo reg={reg} />
            <RegistrarChurchInfo reg={reg} />
            <RegistrarAttendance
                attendance={attendance}
                mealCount={mealCount}
                onEditPress={handleEditNumbersPress}
            />
        </>
    );
};

export default RegistrationDetails;

const styles = StyleSheet.create({
    modalContainer: {
        marginTop: 50,
        // alignSelf: 'flex-end',
    },
    modalSurface: {
        marginTop: 80,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    modalInfoWrapper: {
        alignItems: 'center',
    },
    modalTitle: {
        marginTop: 15,
        fontSize: 24,
        fontWeight: 'bold',
    },
    modalButtonContainer: {
        marginVertical: 20,
        flexDirection: 'row',
    },
    modalButtonWrapper: {
        marginHorizontal: 10,
    },
});
