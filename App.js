import React, { useState } from 'react';
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
import IconButton from './src/components/ui/IconButton';

import MainScreen from './src/screens/MainScreen';
import ServeScreen from './src/screens/Serve/ServeScreen';
import ServeEventsMyScreen from './src/screens/Serve/ServeEventsMyScreen';
import ServeEventsStateScreen from './src/screens/Serve/ServeEventsStateScreen';
import ServeEventsHistoryScreen from './src/screens/Serve/ServeEventsHistoryScreen';
import ServeRallyFormScreen from './src/screens/Serve/ServeRallyFormScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PateSignOut from './src/screens/PateSignOut';
import RallyDetailScreen from './src/screens/RallyDetailsScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { Colors } from './src/constants/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
        </Stack.Navigator>
    );
}
function Navigation() {
    return (
        <NavigationContainer>
            <PateStack />
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
    return (
        <>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <PaperProvider theme={theme}>
                        <Navigation />
                    </PaperProvider>
                </QueryClientProvider>
            </Provider>
        </>
    );
}

export default App;
