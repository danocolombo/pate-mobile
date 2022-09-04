import { StyleSheet, Text, View, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Surface } from 'react-native-paper';
import CustomButton from '../ui/CustomButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { printObject, transformPatePhone } from '../../utils/helpers';
const UserDisplayDetailsModal = ({ user, handleDismiss }) => {
    // printObject('UDDM:9-->user', user);
    return (
        <Surface style={styles.modalSurface}>
            <View style={styles.modalTitleWrapper}>
                <Text style={styles.modalTitle}>User Details</Text>
            </View>
            <View style={styles.modalProfileDetailsWrapper}>
                <View style={styles.modalProfileDetailsRow}>
                    <View style={styles.modalProfileDetailsTopic}>
                        <Text style={styles.modalProfileDetailsTopic}>
                            UID:
                        </Text>
                    </View>
                    <View style={styles.modalProfileDetailsTopicTextWrapper}>
                        <Text
                            style={
                                (styles.modalProfileDetailsTopicText,
                                { fontSize: 14 })
                            }
                        >
                            {user.uid}
                        </Text>
                    </View>
                </View>

                <View style={styles.modalProfileDetailsRow}>
                    <View style={styles.modalProfileDetailsTopic}>
                        <Text style={styles.modalProfileDetailsTopic}>
                            name:
                        </Text>
                    </View>
                    <View style={styles.modalProfileDetailsTopicTextWrapper}>
                        <Text style={styles.modalProfileDetailsTopicText}>
                            {user.firstName} {user.lastName}
                        </Text>
                    </View>
                </View>
                <View style={styles.modalProfileDetailsRow}>
                    <View style={styles.modalProfileDetailsTopic}>
                        <Text style={styles.modalProfileDetailsTopic}>
                            Email:
                        </Text>
                    </View>
                    <View style={styles.modalProfileDetailsTopicTextWrapper}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={
                                    (styles.modalProfileDetailsTopicText,
                                    { paddingRight: 10 })
                                }
                            >
                                {user.email}
                            </Text>

                            <MaterialCommunityIcons
                                name='email'
                                size={24}
                                color='black'
                                onPress={() => Linking.openURL(user.email)}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.modalProfileDetailsRow}>
                    <View style={styles.modalProfileDetailsTopic}>
                        <Text style={styles.modalProfileDetailsTopic}>
                            Phone:
                        </Text>
                    </View>
                    <View style={styles.modalProfileDetailsTopicTextWrapper}>
                        <Text style={styles.modalProfileDetailsTopicText}>
                            {transformPatePhone(user.phone)}
                        </Text>
                    </View>
                </View>
                <View style={styles.modalProfileDetailsRow}>
                    <View
                        style={
                            (styles.modalProfileDetailsTopic,
                            { marginLeft: 20 })
                        }
                    >
                        <Text style={styles.modalProfileDetailsTopicText}>
                            {user.affiliate.name}
                        </Text>
                    </View>
                </View>
                <View style={styles.modalProfileDetailsRow}>
                    <View
                        style={
                            (styles.modalProfileDetailsTopic,
                            { marginLeft: 20 })
                        }
                    >
                        <Text style={styles.modalProfileDetailsTopicText}>
                            {user.affiliate.city}, {user.affiliate.stateProv}
                        </Text>
                    </View>
                </View>
                <View style={styles.modalProfileDetailsRow}>
                    <View
                        style={
                            (styles.modalProfileDetailsTopic, { marginTop: 5 })
                        }
                    >
                        <Text
                            style={
                                (styles.modalProfileDetailsTopic,
                                { fontWeight: '500', fontSize: 18 })
                            }
                        >
                            Active Affiliations:
                        </Text>
                    </View>
                </View>
                <View style={styles.modalProfileDetailsRow}>
                    <View
                        style={
                            (styles.modalProfileDetailsTopic,
                            { marginLeft: 20 })
                        }
                    >
                        <Text style={styles.modalProfileDetailsTopicText}>
                            VALUE:{user?.affiliations?.active?.value}
                        </Text>
                    </View>
                </View>
                <View style={styles.modalProfileDetailsRow}>
                    <View
                        style={
                            (styles.modalProfileDetailsTopic,
                            { marginLeft: 20 })
                        }
                    >
                        <Text style={styles.modalProfileDetailsTopicText}>
                            LABEL:{user?.affiliations?.active?.label}
                        </Text>
                    </View>
                </View>
                <View style={styles.modalProfileDetailsRow}>
                    <View
                        style={
                            (styles.modalProfileDetailsTopic,
                            { marginLeft: 20 })
                        }
                    >
                        <Text style={styles.modalProfileDetailsTopicText}>
                            ROLE:{user?.affiliations?.active?.role}
                        </Text>
                    </View>
                </View>
                <View style={styles.modalProfileDetailsRow}>
                    <View style={styles.modalProfileDetailsTopic}>
                        <Text style={styles.modalProfileDetailsTopic}>
                            Region:
                        </Text>
                    </View>
                    <View style={styles.modalProfileDetailsTopicTextWrapper}>
                        <Text style={styles.modalProfileDetailsTopicText}>
                            {user.region}
                        </Text>
                    </View>
                </View>
                <View style={styles.modalProfileDetailsRow}>
                    <View style={styles.modalProfileDetailsTopic}>
                        <Text style={styles.modalProfileDetailsTopic}>
                            Role:
                        </Text>
                    </View>
                    <View style={styles.modalProfileDetailsTopicTextWrapper}>
                        <Text style={styles.modalProfileDetailsTopicText}>
                            {user?.affiliations?.active?.role}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.modalButtonWrapper}>
                <View style={styles.modalButton}>
                    <CustomButton
                        title='DISMISS'
                        graphic={null}
                        cbStyles={{
                            backgroundColor: Colors.gray35,
                            color: 'black',
                        }}
                        txtColor='white'
                        onPress={() => handleDismiss()}
                    />
                </View>
            </View>
        </Surface>
    );
};

export default UserDisplayDetailsModal;

const styles = StyleSheet.create({
    modalSurface: {
        marginTop: 80,
        marginHorizontal: 0,
        elevation: 5,
    },
    modalTitleWrapper: {
        alignItems: 'center',
    },
    modalTitle: {
        marginTop: 15,
        fontSize: 24,
        fontWeight: 'bold',
    },
    modalProfileDetailsWrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 20,
    },
    modalProfileDetailsRow: { flexDirection: 'row', alignItems: 'center' },
    modalProfileDetailsTopicWrapper: {},
    modalProfileDetailsTopic: {
        fontSize: 18,
        fontWeight: '400',
        letterSpacing: 0.7,
    },
    modalProfileDetailsTopicTextWrapper: { padding: 5 },
    modalProfileDetailsTopicText: {
        fontSize: 16,
    },
    modalButtonWrapper: {
        marginHorizontal: 10,
        marginVertical: 25,
        alignItems: 'center',
    },
});
