import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { View, Text, Button } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// - - - - - redux toolkit - -  - - - - -
import { store } from './src/app/store';
import { Provider } from 'react-redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import MainScreen from './src/screens/MainScreen';
import ServeScreen from './src/screens/Serve/ServeScreen';
import ServeEventsMyScreen from './src/screens/Serve/ServeEventsMyScreen';
import ServeEventsStateScreen from './src/screens/Serve/ServeEventsStateScreen';
import ServeEventsHistoryScreen from './src/screens/Serve/ServeEventsHistoryScreen';
import ServeRallyFormScreen from './src/screens/Serve/ServeRallyFormScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PateSignOut from './src/screens/PateSignOut';
import RallyInfoScreen from './src/screens/RallyInfoScreen';
import RallyDetailScreen from './src/screens/RallyDetailsScreen';
import RallyEditFlowScreen from './src/screens/RallyEditFlowScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import ErrorScreen from './src/screens/ErrorScreen';
import SignInScreen from './src/screens/Auth/SignInScreen';
import SignUpScreen from './src/screens/Auth/SignUpScreen';
import ConfirmEmailScreen from './src/screens/Auth/ConfirmEmailScreen';
import ForgotPasswordScreen from './src/screens/Auth/ForgotPasswordScreen';
import NewPasswordScreen from './src/screens/Auth/NewPasswordScreen';
import { Colors } from './src/constants/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Auth, Hub } from 'aws-amplify';
// require('dotenv').config();
// console.log(process.env); // remove this after you've confirmed it working
function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

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
function Navigation(user, setuser) {
    console.log('A:243 user', user);
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
                {user.user ? (
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
const queryClient = new QueryClient();
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        accent: 'yellow',
    },
};

function App() {
    const [user, setUser] = useState(undefined);
    return (
        <>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <PaperProvider theme={theme}>
                        <Navigation user={user} setUser={setUser} />
                    </PaperProvider>
                </QueryClientProvider>
            </Provider>
        </>
    );
}

export default App;
