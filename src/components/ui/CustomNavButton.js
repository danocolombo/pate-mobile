import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { printObject } from '../../utils/helpers';
import { FontAwesome5 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
const CustomButton = (props) => {
    const { onPress, graphic, title, cbStyles, txtColor } = props;
    //const { iconName, iconColor, iconSize } = props.icon;

    const spaces = '    ';
    let theGraphics;
    graphic?.name
        ? (theGraphics = (
              <Ionicons name='md-checkmark-circle' size={32} color='green' />
          ))
        : null;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.appButtonContainer, cbStyles]}
        >
            <View style={styles.content}>
                <View style={styles.text}>
                    <Text style={styles.appButtonText}>{title}</Text>
                </View>
                <View style={styles.icon}>
                    <Ionicons
                        name='arrow-forward-circle'
                        size={24}
                        color='white'
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};
export default CustomButton;
const styles = StyleSheet.create({
    appButtonContainer: {
        // elevation: 8,
        width: '80%',
        borderRadius: 10,
        paddingVertical: 0,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    appButtonText: {
        fontSize: 18,
        color: 'white',
        paddingVertical: 10,
        fontWeight: 'bold',
        marginRight: 10,
        textTransform: 'uppercase',
    },
    buttonFont: {
        // marginLeft: 10,
    },
});
