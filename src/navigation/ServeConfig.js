import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import ServeMyEventsScreen from '../screens/Serve/ServeMyEventsScreen';
import ServeEventsStateScreen from '../screens/Serve/ServeEventsStateScreen';
import ServeEventsRegionScreen from '../screens/Serve/ServeEventsRegionScreen';
const BottomTab = createBottomTabNavigator();
const ServeConfig = () => {
    let user = useSelector((state) => state.users.currentUser);
    let feo = useSelector((state) => state.system);
    let director = false;
    if (user.affiliations.active.role === 'director') {
        director = true;
    }
    return (
        <BottomTab.Navigator
            initialRouteName='ServeMy'
            screenOptions={{ headerShown: false }}
        >
            <BottomTab.Screen
                name='ServeMy'
                component={ServeMyEventsScreen}
                options={{
                    title: feo.appName,
                    tabBarLabel: 'MINE',
                    tabBarInactiveBackgroundColor: 'lightgrey',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='user' size={size} color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name='ServeState'
                component={
                    director ? ServeEventsRegionScreen : ServeEventsStateScreen
                }
                options={{
                    title: feo.appName,
                    tabBarLabel: 'REGION',
                    tabBarInactiveBackgroundColor: 'lightgrey',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='users' size={size} color={color} />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
};

export default ServeConfig;
