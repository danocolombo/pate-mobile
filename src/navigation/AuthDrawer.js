import React from 'react';
import { useSelector } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import MainScreen from '../screens/MainScreen';
import UpcomingEventsScreen from '../screens/UpcomingEvents';
import LandingScreen from '../screens/LandingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PateSignOut from '../screens/PateSignOut';
import MyRegistrationsScreen from '../screens/MyRegistrationsScreen';
import LegalScreen from '../screens/LegalScreen';
import ServeConfig from './ServeConfig';
import { Colors } from '../constants/colors';
import { printObject } from '../utils/helpers';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const AuthDrawer = (navigation) => {
    const user = useSelector((state) => state.users.currentUser);
    // printObject('PF:17-->user', user);
    let patron = false;
    if (
        user?.role === 'rep' ||
        user?.role === 'lead' ||
        user?.role === 'superuser'
    ) {
        patron = true;
    }
    // {user?.stateRep || user?.stateLead || user?.superuser} : (
    return (
        <Drawer.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: Colors.primary,
                },
                headerTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: Colors.primary,
                },
                tabBarActiveTintColor: 'white',
            })}
        >
            <Drawer.Screen
                name='Landing'
                component={LandingScreen}
                options={({ navigation }) => ({
                    title: 'FEO',
                    drawerLabel: 'Home',
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },

                    headerTintColor: 'white',
                    tabBarStyle: {
                        backgroundColor: Colors.primary,
                    },
                    tabBarActiveTintColor: 'white',
                })}
            />
            <Drawer.Screen
                name='Main'
                component={UpcomingEventsScreen}
                options={({ navigation }) => ({
                    title: 'FEO',
                    drawerLabel: 'Upcoming Events',
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },

                    headerTintColor: 'white',
                    tabBarStyle: {
                        backgroundColor: Colors.primary,
                    },
                    tabBarActiveTintColor: 'white',
                })}
            />
            {patron ? (
                <Drawer.Screen
                    name='Serve'
                    component={ServeConfig}
                    options={({ navigation }) => ({
                        title: 'FEO',
                        drawerLabel: 'Serve',
                        headerStyle: {
                            backgroundColor: Colors.primary,
                        },

                        headerTintColor: 'white',
                        tabBarStyle: {
                            backgroundColor: Colors.primary,
                        },
                        tabBarActiveTintColor: 'white',
                    })}
                />
            ) : null}
            <Stack.Screen
                name='MyRegistrations'
                component={MyRegistrationsScreen}
                options={({ navigation }) => ({
                    title: 'FEO',
                    drawerLabel: 'My Registrations',

                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },

                    headerTintColor: 'white',
                    tabBarStyle: {
                        backgroundColor: Colors.primary,
                    },
                    tabBarActiveTintColor: 'white',
                })}
            />
            <Stack.Screen
                name='Profile'
                component={ProfileScreen}
                options={({ navigation }) => ({
                    title: 'FEO',
                    drawerLabel: 'Profile',
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },

                    headerTintColor: 'white',
                    tabBarStyle: {
                        backgroundColor: Colors.primary,
                    },
                    tabBarActiveTintColor: 'white',
                })}
            />
            <Stack.Screen
                name='Legal'
                component={LegalScreen}
                options={({ navigation }) => ({
                    title: 'FEO',
                    drawerLabel: 'Legal',
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },

                    headerTintColor: 'white',
                    tabBarStyle: {
                        backgroundColor: Colors.primary,
                    },
                    tabBarActiveTintColor: 'white',
                })}
            />
            <Stack.Screen name='Logout' component={PateSignOut} />
        </Drawer.Navigator>
    );
};

export default AuthDrawer;
