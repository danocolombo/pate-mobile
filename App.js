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

import { Ionicons } from '@expo/vector-icons';
import IconButton from './src/components/ui/IconButton';

import MainScreen from './src/screens/MainScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PateSignOut from './src/screens/PateSignOut';
import RallyDetailScreen from './src/screens/RallyDetailsScreen';
import { Colors } from './src/constants/colors';

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
// function TheDrawer() {
//     const [token, setToken] = useState(true);
//     return (
//         <Drawer.Navigator
//             useLegacyImplementation
//             drawerContent={(props) => <CustomDrawerContent {...props} />}
//         >
//             <Drawer.Screen name='Main' component={MainScreen} />
//             {token ? (
//                 <Drawer.Screen name='Profile' component={ProfileScreen} />
//             ) : null}
//         </Drawer.Navigator>
//     );
// }
function AuthenticatedDrawer() {
    return (
        <Drawer.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: Colors.primary800,
                },
                headerTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: Colors.primary800,
                },
                tabBarActiveTintColor: 'white',
            })}
        >
            <Drawer.Screen
                name='Main'
                component={MainScreen}
                options={({ navigation }) => ({
                    title: 'P8 Rally',
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
                        backgroundColor: Colors.primary800,
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
function App() {
    return (
        <>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <Navigation />
                </QueryClientProvider>
            </Provider>
        </>
    );
}
// function App() {
//     return (
//         <>
//             <Provider store={store}>
//                 <QueryClientProvider client={queryClient}>
//                     <NavigationContainer>
//                         <TheDrawer />
//                     </NavigationContainer>
//                 </QueryClientProvider>
//             </Provider>
//         </>
//     );
// }
export default App;
