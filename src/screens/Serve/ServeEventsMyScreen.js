import {
    StyleSheet,
    Text,
    View,
    ViewBase,
    ImageBackground,
} from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ServeMyRallies from '../../components/serve/ServeMyRallies';

const ServeEventsMyScreen = () => {
    const navigation = useNavigation();
    const feo = useSelector((state) => state.system);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: feo.title,
            headerRight: () => (
                <Button
                    onPress={() =>
                        navigation.navigate('RallyEditFlow', {
                            rallyId: rally.uid,
                            stage: 1,
                        })
                    }
                    // color='white'
                    title='NEW'
                />
            ),
        });
    }, [navigation, feo]);
    return (
        <ImageBackground
            source={require('../../components/images/background.png')}
            style={styles.bgImageContainer}
        >
            <ServeMyRallies />
        </ImageBackground>
    );
};

export default ServeEventsMyScreen;

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
    bgImageContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
});
