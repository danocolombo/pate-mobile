import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import ServeEventsMyScreen from '../screens/Serve/ServeEventsMyScreen';
import ServeEventsStateScreen from '../screens/Serve/ServeEventsStateScreen';
// import ServeEventsHistoryScreen from '../screens/Serve/ServeManageUsersScreen';
import ServeManageUsersScreen from '../screens/Serve/ServeManageUsersScreen';
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
                    title: 'EOR',
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
                    title: 'EOR',
                    tabBarLabel: 'STATE',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='users' size={24} color='black' />
                    ),
                }}
            />
            {user.role === 'lead' || user.role === 'superuser' ? (
                <BottomTab.Screen
                    name='ServeHistory'
                    component={ServeManageUsersScreen}
                    options={{
                        title: 'EOR',
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
