import {
    StyleSheet,
    View,
    Text,
    Switch,
    Platform,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Colors } from '../../constants/colors';

const RenderEditSample = ({ item, toggleBlock }) => {
    const { navigate } = useNavigation();
    return (
        <View style={styles.rows}>
            <TouchableOpacity
                onPress={() =>
                    item.id !== 'Payment' &&
                    item.id !== 'gift' &&
                    navigate('PersonalEdits')
                }
            >
                <Block
                    row
                    middle
                    space='between'
                    style={{ fontSize: 20, paddingTop: 7 }}
                >
                    <Text>{item.title}</Text>
                    <Ionicons
                        name={
                            isOpened ? 'chevron-up-sharp' : 'chevron-down-sharp'
                        }
                        color={'black'}
                        size={24}
                    />
                </Block>
            </TouchableOpacity>
        </View>
    );
};

export default RenderEditSample;

const styles = StyleSheet.create({
    title: {
        paddingTop: 5,
        paddingBottom: 5,
    },
    blockEntry: {
        paddingTop: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rows: {
        height: 15,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
});
