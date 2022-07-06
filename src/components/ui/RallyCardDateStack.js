import { Text, TextInput, View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
function CardDate({ date }) {
    let yr = '?';
    let mo = '?';
    let da = '?';
    let month;
    let day;
    if (date) {
        yr = date.slice(0, 4);
        mo = date.slice(4, 6);
        da = date.slice(6, 8);

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
        day = da.slice(0, 1);
        if (day === '0') {
            day = da.slice(1, 2);
        } else {
            day = da;
        }
    }
    return (
        <View style={Styles.container}>
            <View>
                <Text style={Styles.moDa}>
                    {month} {day}
                </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={Styles.moDa}>{yr}</Text>
            </View>
        </View>
    );
}
export default CardDate;

const Styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
        // minWidth: 100,
        textAlign: 'center',
    },
    moDa: {
        fontSize: 14,
        color: Colors.primary,
        fontWeight: '900',
    },
    year: {
        fontSize: 14,
        color: Colors.primary,
        fontWeight: '900',
    },
});
