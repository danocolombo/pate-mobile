import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import ServeEventsMyScreen from '../screens/Serve/ServeEventsMyScreen';
import ServeEventsStateScreen from '../screens/Serve/ServeEventsStateScreen';
import ServeConfigScreen from '../screens/Serve/ServeConfig';
import ServeManageUsersScreen from '../screens/Serve/ServeConfig';
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
                    title: 'FEO',
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
                    title: 'FEO',
                    tabBarLabel: 'REGION',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='users' size={24} color='black' />
                    ),
                }}
            />
            {user.role === 'lead' || user.role === 'superuser' ? (
                <BottomTab.Screen
                    name='ServeConfig'
                    component={ServeConfigScreen}
                    options={{
                        title: 'FEO',
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
