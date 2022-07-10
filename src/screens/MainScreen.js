import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Image,
    Modal,
    FlatList,
    ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/ui/CustomButton';
import { Surface } from 'react-native-paper';
import RallyItem from '../components/rallies/RallyItem';
import RalliesOutput from '../components/rallies/RalliesOutput';
import { getToday, printObject } from '../utils/helpers';
import { getPateDate } from '../utils/date';

export default function MainScreen() {
    const navigation = useNavigation();
    const user = useSelector((state) => state.users.currentUser);
    const allRallies = useSelector((state) => state.rallies.allRallies);
    const [showProfileNeededModal, setShowProfileNeededModal] = useState(
        !user.profile
    );
    const tDay = getPateDate(getToday());
    const eventRegion = process.env.EVENT_REGION;
    function asc_sort(a, b) {
        return a.eventDate - b.eventDate;
    }
    const approved = allRallies.filter(
        (r) =>
            r.approved === true &&
            r.eventDate >= tDay &&
            r.eventRegion === eventRegion
    );
    let displayData = approved.sort(asc_sort);

    // }, [])
    const handleProfileAcknowledge = () => {
        setShowProfileNeededModal(false);
        navigation.navigate('Profile');
    };
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
                                Please complete your profile.
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

                {displayData.length !== 0 ? (
                    <View>
                        <FlatList
                            data={displayData}
                            keyExtractor={(item) => item.uid}
                            renderItem={({ item }) => (
                                <RallyItem rally={item} />
                            )}
                        />
                    </View>
                ) : (
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../components/images/no-events-card.png')}
                            style={styles.image}
                        />
                    </View>
                )}
                {/* </ScrollView> */}
            </>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    bgImageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    infoText: {
        color: 'white',
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
    modalSurface: {
        marginTop: '50%',
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
        fontSize: 20,
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
