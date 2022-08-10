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

import { Colors } from '../constants/colors';

import ServeRallyFormScreen from '../screens/Serve/ServeRallyFormScreen';
import RallyInfoScreen from '../screens/RallyInfoScreen';
import RallyDetailScreen from '../screens/RallyDetailsScreen';
import RallyEditFlowScreen from '../screens/RallyEditFlowScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import ErrorScreen from '../screens/ErrorScreen';
import SignInScreen from '../screens/Auth/SignInScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import ConfirmEmailScreen from '../screens/Auth/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/Auth/NewPasswordScreen';
import UserProfileScreen from '../screens/Serve/UserProfileScreen';
import AuthDrawer from './AuthDrawer';
import { Auth, Hub } from 'aws-amplify';

const Stack = createNativeStackNavigator();
//    ------ before going into action.....
// function CustomDrawerContent(props) {
//     return (
//         <DrawerContentScrollView {...props}>
//             <DrawerItemList {...props} />
//         </DrawerContentScrollView>
//     );
// }

function PateStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='AuthenticatedDrawer'
                // component={AuthenticatedDrawer}
                component={AuthDrawer}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='RallyDetail'
                component={RallyDetailScreen}
                options={({ navigation }) => ({
                    title: 'FEO',
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
                    title: 'FEO',
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTintColor: 'white',
                })}
            />
            <Stack.Screen
                name='UserProfile'
                component={UserProfileScreen}
                options={({ navigation }) => ({
                    title: 'FEO',
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
                    title: 'FEO',
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
                    title: 'FEO',
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
                    title: 'FEO',
                    headerBackTitle: 'Cancel',
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
                    title: 'FEO',
                    headerBackTitle: 'Cancel',
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
                    title: 'FEO',
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
    const [userCheck, setUserCheck] = useState(undefined);
    const checkUser = async () => {
        try {
            const authUser = await Auth.currentAuthenticatedUser({
                bypassCache: true,
            });
            setUserCheck(authUser);
        } catch (e) {
            setUserCheck(null);
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
