import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { printObject } from '../../utils/helpers';
const CustomButton = (props) => {
    const { onPress, title, cbStyles, txtColor } = props;
    printObject('props', props);
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.appButtonContainer, cbStyles]}
        >
            <Text style={[styles.appButtonText, cbStyles]}>{title}</Text>
        </TouchableOpacity>
    );
};
export default CustomButton;
const styles = StyleSheet.create({
    appButtonContainer: {
        elevation: 8,
        width: '80%',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        alignItems: 'center',
    },
    appButtonText: {
        fontSize: 18,
        // color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});
