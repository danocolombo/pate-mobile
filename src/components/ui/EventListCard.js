import { Text, TextInput, View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Card } from 'react-native-paper';
import CardDate from './RallyCardDateStack';

function EventListCard({ date, locationName, city, stateProv }) {
    const LeftContent = (props) => <CardDate date={date} />;
    const LocationText = city + ', ' + stateProv;
    return (
        <>
            <Card>
                <Card.Title
                    title={locationName}
                    subtitle={LocationText}
                    left={LeftContent}
                />
            </Card>
        </>
    );
}
export default EventListCard;

const styles = StyleSheet.create({
    surface: {
        marginTop: 10,
        elevation: 5,
    },
    eventContainer: {
        // flex: 1,
    },
});
