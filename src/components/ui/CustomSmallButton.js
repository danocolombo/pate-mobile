import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { printObject } from '../../utils/helpers';
import { FontAwesome5 } from '@expo/vector-icons';
const CustomSmallButton = (props) => {
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
            <View style={styles.buttonContainer}>
                {theGraphics && (
                    <Text style={[styles.appButtonText, cbStyles]}>
                        {title}
                        {spaces}
                        {theGraphics}
                    </Text>
                )}
                {!theGraphics && (
                    <Text style={[styles.appButtonText, cbStyles]}>
                        {title}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
};
export default CustomSmallButton;
const styles = StyleSheet.create({
    appButtonContainer: {
        // elevation: 8,
        // width: '80%',
        borderRadius: 5,
        paddingVertical: 1,
        paddingHorizontal: 5,
        justifyContent: 'center',
        // width: 125,
        alignItems: 'center',
        alignContent: 'center',
    },
    appButtonText: {
        fontSize: 10,
        // color: 'white',
        fontWeight: 'normal',
        textTransform: 'uppercase',
    },
    buttonContainer: {
        alignItems: 'center',
    },
});
