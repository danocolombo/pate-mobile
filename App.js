import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { View, Text, Button, SafeAreaView, StyleSheet } from 'react-native';
import Navigation from './src/navigation/Navigation';
// - - - - - redux toolkit - -  - - - - -
import { store } from './src/app/store';
import { Provider, useSelector } from 'react-redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
Amplify.configure({
    ...awsconfig,
    Analytics: {
        disabled: true,
    },
});
import { Auth, Hub } from 'aws-amplify';
// require('dotenv').config();
// console.log(process.env); // remove this after you've confirmed it working
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
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <PaperProvider theme={theme}>
                    <SafeAreaView style={styles.container}>
                        <Navigation />
                    </SafeAreaView>
                </PaperProvider>
            </QueryClientProvider>
        </Provider>
    );
}

export default App;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 50,
    },
});
