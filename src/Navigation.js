import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

import { Ionicons } from '@expo/vector-icons';
import { Colors } from './constants/colors';

import MainScreen from './screens/MainScreen';
import ServeScreen from './screens/Serve/ServeScreen';
import ServeEventsMyScreen from './screens/Serve/ServeEventsMyScreen';
import ServeEventsStateScreen from './screens/Serve/ServeEventsStateScreen';
import ServeEventsHistoryScreen from './screens/Serve/ServeEventsHistoryScreen';
import ServeRallyFormScreen from './screens/Serve/ServeRallyFormScreen';
import ProfileScreen from './screens/ProfileScreen';
import PateSignOut from './screens/PateSignOut';
import RallyInfoScreen from './screens/RallyInfoScreen';
import RallyDetailScreen from './screens/RallyDetailsScreen';
import RallyEditFlowScreen from './screens/RallyEditFlowScreen';
import RegisterScreen from './screens/RegisterScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import ErrorScreen from './screens/ErrorScreen';
import SignInScreen from './screens/Auth/SignInScreen';
import SignUpScreen from './screens/Auth/SignUpScreen';
import ConfirmEmailScreen from './screens/Auth/ConfirmEmailScreen';
import ForgotPasswordScreen from './screens/Auth/ForgotPasswordScreen';
import NewPasswordScreen from './screens/Auth/NewPasswordScreen';
import { Auth, Hub } from 'aws-amplify';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
//    ------ before going into action.....
function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

function AuthenticatedDrawer() {
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
                name='Main'
                component={MainScreen}
                options={({ navigation }) => ({
                    title: 'Rallies',
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
                name='Serve'
                component={ServeConfig}
                options={({ navigation }) => ({
                    title: 'Serve',
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
            <Stack.Screen name='Profile' component={ProfileScreen} />
            <Stack.Screen name='Logout' component={PateSignOut} />
        </Drawer.Navigator>
    );
}
function ServeConfig() {
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
}
function PateStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='AuthenticatedDrawer'
                component={AuthenticatedDrawer}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='RallyDetail'
                component={RallyDetailScreen}
                options={({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTintColor: 'white',
                })}
            />
            <Stack.Screen
                name='RallyInfo'
                component={RallyInfoScreen}
                options={({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTintColor: 'white',
                })}
            />
            <Stack.Screen
                name='RallyRegister'
                component={RegisterScreen}
                options={({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTintColor: 'white',
                })}
            />
            <Stack.Screen
                name='RegistrationDetails'
                component={RegistrationScreen}
                options={({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTintColor: 'white',
                })}
            />
            <Stack.Screen
                name='ServeRallyForm'
                component={ServeRallyFormScreen}
                options={({ navigation }) => ({
                    title: 'Rally Form',
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTintColor: 'white',
                })}
            />
            <Stack.Screen
                name='RallyEditFlow'
                component={RallyEditFlowScreen}
                options={({ navigation }) => ({
                    title: 'Rally Form',
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTintColor: 'white',
                })}
            />
            <Stack.Screen
                name='ErrorMsg'
                component={ErrorScreen}
                options={({ navigation }) => ({
                    title: 'Error Experience',
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTintColor: 'white',
                })}
            />
        </Stack.Navigator>
    );
}
//   --------- Navigation !!!!! ----------------
function Navigation() {
    const user = useSelector((state) => state.users.currentUser);
    // const [user, setUser] = useState(undefined);
    const checkUser = async () => {
        try {
            const authUser = await Auth.currentAuthenticatedUser({
                bypassCache: true,
            });
            setUser(authUser);
        } catch (e) {
            setUser(null);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    // this is as listener to the Amplify hub (events)
    useEffect(() => {
        const listener = (data) => {
            if (
                data.payload.event === 'signIn' ||
                data.payload.event === 'signOut'
            ) {
                checkUser();
            }
        };

        Hub.listen('auth', listener);
        return () => Hub.remove('auth', listener);
    }, []);
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user?.jwtToken ? (
                    <Stack.Screen name='PateStack' component={PateStack} />
                ) : (
                    <>
                        <Stack.Screen name='SignIn' component={SignInScreen} />
                        <Stack.Screen name='SignUp' component={SignUpScreen} />
                        <Stack.Screen
                            name='ConfirmEmail'
                            component={ConfirmEmailScreen}
                        />
                        <Stack.Screen
                            name='ForgotPassword'
                            component={ForgotPasswordScreen}
                        />
                        <Stack.Screen
                            name='NewPassword'
                            component={NewPasswordScreen}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
