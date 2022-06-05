import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { printObject } from '../../utils/helpers';
import { FontAwesome5 } from '@expo/vector-icons';
const CustomButton = (props) => {
    const { onPress, graphic, title, cbStyles, txtColor } = props;
    //const { iconName, iconColor, iconSize } = props.icon;

    const spaces = '    ';
    let theGraphics;
    graphic?.name
        ? (theGraphics = (
              <FontAwesome5
                  style={styles.buttonFont}
                  name={graphic.name}
                  size={graphic.size}
                  color={graphic.color}
              />
          ))
        : null;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.appButtonContainer, cbStyles]}
        >
            <View style={{ alignItems: 'center' }}>
                <Text style={[styles.appButtonText, cbStyles]}>
                    {title}
                    {spaces}
                    {theGraphics}
                </Text>
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
    buttonFont: {
        // marginLeft: 10,
    },
});
