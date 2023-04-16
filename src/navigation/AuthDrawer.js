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
import TeamScreen from '../screens/TeamScreen';
import ServeConfig from './ServeConfig';
import { Colors } from '../constants/colors';
import { printObject } from '../utils/helpers';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const AuthDrawer = (navigation) => {
    const user = useSelector((state) => state.users.currentUser);
    const feo = useSelector((state) => state.division);
    // printObject('PF:17-->user', user);
    let manager = false;
    if (
        user?.affiliations?.active?.role === 'lead' ||
        user?.affiliations?.active?.role === 'director' ||
        user?.affiliations?.active?.role === 'superuser' ||
        user?.affiliations?.active?.role === 'guru'
    ) {
        manager = true;
    }
    let patron = false;
    if (
        user?.affiliations?.active?.role === 'rep' ||
        user?.affiliations?.active?.role === 'lead' ||
        user?.affiliations?.active?.role === 'director' ||
        user?.affiliations?.active?.role === 'guru' ||
        user?.affiliations?.active?.role === 'superuser'
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
                    title: feo.appName,
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
                    title: feo.appName,
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
                        title: feo.appName,
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
                    title: feo.appName,
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
                    title: feo.appName,
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
            {manager ? (
                <Drawer.Screen
                    name='Team'
                    component={TeamScreen}
                    options={({ navigation }) => ({
                        title: feo.appName,
                        drawerLabel: 'Members',
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
                name='Legal'
                component={LegalScreen}
                options={({ navigation }) => ({
                    title: feo.appName,
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
