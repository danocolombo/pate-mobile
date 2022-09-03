export default {
    name: 'FEO',
    slug: 'FortsonEventOrganizer',
    version: '1.0.17',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
        image: './assets/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
    },
    expo: {
        extra: {
            eas: {
                projectId: '6e0dd50c-2b68-4f82-9ea3-8a76df387b43',
            },
        },
    },
    updates: {
        fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
        supportsTablet: true,
        bundleIdentifier: 'guru.fortson.eor',
        infoPlist: {
            UIBackgroundModes: ['location', 'fetch'],
            NSLocationWhenInUseUsageDescription:
                'To provide local events near you',
            NSLocationUsageDescription: 'To provide event locations',
        },
        config: {
            googleMapsApiKey: 'AIzaSyAFWegK19_bMbbYuTeKatromwzuiC4lADo',
        },
    },
    android: {
        package: 'guru.fortson.feo',
        versionCode: 1,
        adaptiveIcon: {
            foregroundImage: './assets/adaptive-icon.png',
            backgroundColor: '#FFFFFF',
        },
        config: {
            googleMaps: {
                apiKey: 'AIzaSyAFWegK19_bMbbYuTeKatromwzuiC4lADo',
            },
        },
    },
    web: {
        favicon: './assets/favicon.png',
    },
    description: '',
};
