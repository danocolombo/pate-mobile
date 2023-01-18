import { Text, TextInput, View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
function EventCardDate({ date }) {
    if (!date) {
        return null;
    }
    const yr = date.slice(0, 4);
    const mo = date.slice(5, 7);
    const da = date.slice(8, 10);
    let month;
    switch (mo) {
        case '01':
            month = 'JAN';
            break;
        case '02':
            month = 'FEB';
            break;
        case '03':
            month = 'MAR';
            break;
        case '04':
            month = 'APR';
            break;
        case '05':
            month = 'MAY';
            break;
        case '06':
            month = 'JUN';
            break;
        case '07':
            month = 'JUL';
            break;
        case '08':
            month = 'AUG';
            break;
        case '09':
            month = 'SEP';
            break;
        case '10':
            month = 'OCT';
            break;
        case '11':
            month = 'NOV';
            break;
        case '12':
            month = 'DEC';
            break;
        default:
            break;
    }
    let day = da.slice(0, 1);
    if (day === '0') {
        day = da.slice(1, 2);
    } else {
        day = da;
    }
    return (
        <View style={Styles.container}>
            <View style={{ alignItems: 'center' }}>
                <Text style={Styles.text}>
                    {month} {day}
                </Text>
            </View>
        </View>
    );
}
export default EventCardDate;

const Styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 8,
        minWidth: 50,
        textAlign: 'center',
    },
    text: {
        fontSize: 14,
        color: Colors.primary,
        fontWeight: '900',
    },
});
