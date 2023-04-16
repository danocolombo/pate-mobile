import ModalResidence from './ModalResidence';
import ModalMembership from './ModalMembership';
import { StyleSheet, Text, View, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Surface } from 'react-native-paper';
import CustomButton from '../ui/CustomButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { printObject, transformPatePhone } from '../../utils/helpers';
import { styles } from './styles';
const UserDisplayDetailsModal = ({ profile, handleDismiss }) => {
    printObject('UDDM:9-->profile', profile);
    return (
        <Surface style={styles.modalSurface}>
            <View style={styles.modalTitleWrapper}>
                <Text style={styles.modalTitle}>User Details</Text>
            </View>
            <View style={styles.modalDataContainer}>
                <View style={styles.modalTeamRow}>
                    <View
                        style={[
                            styles.modalDataContainer,
                            { marginBottom: 10 },
                        ]}
                    >
                        <View style={styles.modalTeamRow}>
                            <Text style={styles.modalDataText}>ID:</Text>
                            <Text style={styles.modalDataTextSmall}>
                                {profile?.user?.id}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.modalTeamRow}>
                    <View style={styles.modalDataContainer}>
                        <Text style={styles.modalUserName}>
                            {profile?.user?.firstName} {profile?.user?.lastName}
                        </Text>
                    </View>
                </View>
                <View style={styles.modalTeamRow}>
                    <View style={styles.modalDataContainer}>
                        <View style={styles.modalTeamRow}>
                            <Text style={styles.modalDataText}>
                                {profile?.user?.email}
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
                <View style={styles.modalTeamRow}>
                    <View style={styles.modalDataContainer}>
                        <Text style={styles.modalDataText}>Phone:</Text>
                    </View>
                    <View style={styles.modalDataText}>
                        <Text style={styles.modalDataText}>
                            {transformPatePhone(profile?.user?.phone)}
                        </Text>
                    </View>
                </View>
                {profile?.user?.residence && (
                    <View style={[styles.modalTeamRow, { marginTop: 5 }]}>
                        <ModalResidence profile={profile} />
                    </View>
                )}
                <View style={styles.modalTeamRow}>
                    <View style={styles.modalDataContainer}>
                        <Text style={styles.modalSectionHeader}>
                            Membership:
                        </Text>
                    </View>
                </View>
                {profile?.user?.memberships.items.length > 0 && (
                    <ModalMembership profile={profile} />
                )}

                <View style={styles.modalTeamRow}>
                    <View
                        style={[
                            styles.modalDataContainer,
                            { marginVertical: 10 },
                        ]}
                    >
                        <Text style={styles.modalDataTextLargeBold}>
                            ROLE: {profile?.role.toUpperCase()}
                        </Text>
                        <Text style={styles.modalDataTextLargeBold}>
                            STATUS: {profile?.status.toUpperCase()}
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
