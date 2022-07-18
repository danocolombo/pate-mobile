import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import ServeEventsMyScreen from '../screens/Serve/ServeEventsMyScreen';
import ServeEventsStateScreen from '../screens/Serve/ServeEventsStateScreen';
import ServeEventsHistoryScreen from '../screens/Serve/ServeEventsHistoryScreen';
const BottomTab = createBottomTabNavigator();
const ServeConfig = () => {
    let user = useSelector((state) => state.users.currentUser);
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
                    tabBarLabel: 'MINE',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='user' size={24} color='black' />
                    ),
                }}
            />
            <BottomTab.Screen
                name='ServeState'
                component={ServeEventsStateScreen}
                options={{
                    title: 'Serve: State Events',
                    tabBarLabel: 'STATE',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='users' size={24} color='black' />
                    ),
                }}
            />
            {user.role === 'lead' || user.role === 'superuser' ? (
                <BottomTab.Screen
                    name='ServeHistory'
                    component={ServeEventsHistoryScreen}
                    options={{
                        title: 'Serve: History',
                        tabBarLabel: 'ADMIN',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name='settings-sharp'
                                size={24}
                                color='black'
                            />
                        ),
                    }}
                />
            ) : null}
        </BottomTab.Navigator>
    );
};

export default ServeConfig;
