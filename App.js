import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
// - - - - - redux toolkit - -  - - - - -
import { store } from './src/app/store';
import { Provider } from 'react-redux';

import MainScreen from './src/screens/MainScreen';
import ProfileScreen from './src/screens/ProfileScreen';

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator();

function TheDrawer() {
    const [token, setToken] = useState(true);
    return (
        <Drawer.Navigator
            useLegacyImplementation
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name='Main' component={MainScreen} />
            {token ? (
                <Drawer.Screen name='Profile' component={ProfileScreen} />
            ) : null}
        </Drawer.Navigator>
    );
}
const queryClient = new QueryClient();
function App() {
    return (
        <>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <NavigationContainer>
                        <TheDrawer />
                    </NavigationContainer>
                </QueryClientProvider>
            </Provider>
        </>
    );
}
export default App;
