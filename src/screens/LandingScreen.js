import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Modal,
    Image,
} from 'react-native';
import Constants from 'expo-constants';
import * as Application from 'expo-application';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import CustomButton from '../components/ui/CustomButton';
import { Colors } from '../constants/colors';
import NoEventsNotice from '../components/ui/NoEventsNotice.js';
import { Surface } from 'react-native-paper';
import { loadDisplayRallies } from '../features/rallies/ralliesSlice';
import { printObject } from '../utils/helpers';
import { getPateDate, getToday } from '../utils/date';
import { getAvailableEvents } from '../features/rallies/ralliesSlice';

export default function LandingScreen(props) {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    // const expoVersion = Constants.expoConfig.version;
    // const feoVersion = Application.nativeBuildVersion;
    const description = Constants?.manifest?.extra?.feo;
    const user = useSelector((state) => state.users.currentUser);
    const allRallies = useSelector((state) => state.rallies.allRallies);
    const divEvents = useSelector((state) => state.division.allRallies);
    // printObject('LS:29-->user:', user);
    const feo = useSelector((state) => state.system);

    const [showProfileNeededModal, setShowProfileNeededModal] = useState(
        !user.profile
    );

    // useEffect(() => {
    //     dispatch(getAvailableEvents({ name, today: today }));
    // }, [props, isFocused]);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: feo.appName,
        });
    }, [navigation, feo]);
    const handleProfileAcknowledge = () => {
        setShowProfileNeededModal(false);
        navigation.navigate('Profile');
    };
    printObject('LS:52==> division.allRallies: ', divEvents);
    return (
        <ImageBackground
            source={require('../components/images/background.png')}
            style={styles.bgImageContainer}
        >
            <>
                {/* <ScrollView> */}
                <Modal visible={showProfileNeededModal} animationStyle='slide'>
                    <Surface style={styles.modalSurface}>
                        <View style={styles.modalInfoWrapper}>
                            <Text style={styles.modalTitle}>
                                The system provides area events based on
                                location.{' '}
                            </Text>
                            <Text style={styles.modalTitle}>
                                For best experience, please complete your
                                profile.
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
                                        onPress={() => {
                                            handleProfileAcknowledge();
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </Surface>
                </Modal>

                <Surface style={styles.welcomeSurface}>
                    <View style={styles.mainTextContainer}>
                        <Text style={styles.mainTitle}>
                            {feo.affiliate.title}
                        </Text>
                    </View>

                    <View style={styles.heroImageContainer}>
                        <Image
                            source={require('../../assets/images/FEO.png')}
                            style={{ resizeMode: 'cover' }}
                        ></Image>
                    </View>

                    <View
                        style={{
                            marginTop: 15,
                            marginHorizontal: 40,
                            marginBottom: 20,
                            // backgroundColor: 'white',
                            borderRadius: 10,
                            padding: 5,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '600',
                                textAlign: 'center',
                            }}
                        >
                            Welcome {user.firstName} {user.lastName}
                        </Text>
                        <Text style={{ textAlign: 'center' }}>
                            Affiliation: {user?.affiliations?.active.value}
                        </Text>
                        <Text style={{ textAlign: 'center' }}>
                            Region:{' '}
                            {user?.affiliations?.active?.region
                                ? user?.affiliations?.active?.region
                                : null}
                        </Text>
                        {description && (
                            <Text style={{ textAlign: 'center' }}>
                                v: {description}
                            </Text>
                        )}
                    </View>
                </Surface>
            </>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    bgImageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    heroImageContainer: {
        // flexDirection: 'column',
        marginTop: 10,

        justifyContent: 'center',
        alignItems: 'center',
        // height: '100%',
    },
    mainTextContainer: {
        marginTop: 20,
        marginBottom: 10,
        alignItems: 'center',
    },
    subTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: 34,
        letterSpacing: 0.5,
        fontWeight: '600',
        // color: 'white',
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 18,
        fontWeight: '600',
        // color: 'white',
    },
    affiliateHeader: {
        paddingTop: 20,
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titleText: {
        paddingBottom: 20,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    infoText: {
        // color: 'white',
        fontSize: 24,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '85%',
        height: '65%',
    },
    modalContainer: {
        marginTop: '200',
        // alignSelf: 'flex-end',
    },
    welcomeSurface: {
        padding: 12,
        marginVertical: 8,
        // backgroundColor: Colors.primary500,
        marginHorizontal: 20,
        justifyContent: 'space-between',
        borderRadius: 10,
        elevation: 5,
        shadowColor: Colors.primary500,
        shadowRadius: 8,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.6,
    },
    modalSurface: {
        marginTop: '50%',
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        // elevation: 3,
        shadowColor: Colors.primary500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    modalInfoWrapper: {
        alignItems: 'center',
        marginHorizontal: 20,
    },
    modalTitle: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalButtonContainer: {
        marginVertical: 20,
        flexDirection: 'row',
    },
    modalButtonWrapper: {
        marginHorizontal: 10,
    },
});
