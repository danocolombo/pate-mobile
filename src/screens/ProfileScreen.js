import React from 'react';
import { View, Text } from 'react-native';
import { List, Badge } from 'react-native-paper';
import CardDate from '../components/ui/RallyCardDate';
function ProfileScreen() {
    return (
        <>
            <View>
                <Text>Profile Screen</Text>
            </View>
            <View>
                <List.Item
                    title='First Item'
                    description='Item description'
                    left={(props) => <List.Icon {...props} icon='folder' />}
                />
                <Badge>3</Badge>
            </View>
            <View>
                <CardDate date='20220601' />
            </View>
        </>
    );
}
export default ProfileScreen;
