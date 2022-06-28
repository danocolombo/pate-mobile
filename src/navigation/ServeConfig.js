import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ServeEventsMyScreen from '../screens/Serve/ServeEventsMyScreen';
import ServeEventsStateScreen from '../screens/Serve/ServeEventsStateScreen';
import ServeEventsHistoryScreen from '../screens/Serve/ServeEventsHistoryScreen';
const BottomTab = createBottomTabNavigator();
const ServeConfig = () => {
    return (
        <BottomTab.Navigator
            initialRouteName='ServeMy'
            screenOptions={{ headerShown: false }}
        >
            <BottomTab.Screen
                name='ServeMy'
                component={ServeEventsMyScreen}
                options={{
                    title: 'Serve: Personal Events',
                    tabBarLabel: 'Mine',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name='md-caret-back-circle-sharp'
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name='ServeState'
                component={ServeEventsStateScreen}
                options={{
                    title: 'Serve: State Events',
                    tabBarLabel: 'State',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name='md-caret-forward-circle-sharp'
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name='ServeHistory'
                component={ServeEventsHistoryScreen}
                options={{
                    title: 'Serve: History',
                    tabBarLabel: 'History',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name='md-caret-forward-circle-sharp'
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
};

export default ServeConfig;
