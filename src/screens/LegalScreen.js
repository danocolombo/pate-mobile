import React, { useState, useLayoutEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Surface } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { AntDesign } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import { Colors } from '../constants/colors';
import { TERMS_CONDITIONS } from '../constants/TermsConditions';
import { printObject } from '../utils/helpers';
import { PRIVACY_POLICY } from '../constants/PrivacyPolicy';
// import { ScrollView } from 'react-native-gesture-handler';
import RenderHtml from 'react-native-render-html';

const LegalScreen = (props) => {
    const navigation = useNavigation();
    const feo = useSelector((state) => state.division);
    const [termsCollapsed, setTermsCollapsed] = useState(true); //collapsible
    const [privacyCollapsed, setPrivacyCollapsed] = useState(true); //collapsible
    const { width } = useWindowDimensions();
    const toggleTerms = () => {
        //Toggling the state of single Collapsible
        setTermsCollapsed(!termsCollapsed);
        setPrivacyCollapsed(true);
    };

    const togglePrivacy = () => {
        //Toggling the state of single Collapsible
        setPrivacyCollapsed(!privacyCollapsed);
        setTermsCollapsed(true);
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            title: feo.appName,
        });
    }, [navigation, feo]);
    return (
        <View style={styles.rootContainer}>
            <Surface style={styles.surfaceContainer}>
                <ScrollView>
                    <View>
                        <Text style={styles.titleText}>Legal Information</Text>
                    </View>
                    <TouchableOpacity onPress={toggleTerms}>
                        <View style={styles.collapsibleHeaderRow}>
                            <Text style={styles.collapsibleHeaderText}>
                                Terms & Conditions
                            </Text>
                            <View style={styles.collapsibleHeaderIcon}>
                                {termsCollapsed ? (
                                    <AntDesign
                                        name='caretright'
                                        size={18}
                                        color={Colors.gray60}
                                    />
                                ) : (
                                    <AntDesign
                                        name='caretdown'
                                        size={18}
                                        color={Colors.gray60}
                                    />
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={termsCollapsed} align='center'>
                        <View style={styles.detailContainer}>
                            <Surface style={[styles.surface, { elevation: 5 }]}>
                                <View>
                                    <RenderHtml
                                        contentWidth={width}
                                        source={TERMS_CONDITIONS}
                                    />
                                </View>
                            </Surface>
                        </View>
                    </Collapsible>
                    <TouchableOpacity onPress={togglePrivacy}>
                        <View style={styles.collapsibleHeaderRow}>
                            <Text style={styles.collapsibleHeaderText}>
                                Privacy Policy
                            </Text>
                            <View style={styles.collapsibleHeaderIcon}>
                                {privacyCollapsed ? (
                                    <AntDesign
                                        name='caretright'
                                        size={18}
                                        color={Colors.gray60}
                                    />
                                ) : (
                                    <AntDesign
                                        name='caretdown'
                                        size={18}
                                        color={Colors.gray60}
                                    />
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={privacyCollapsed} align='center'>
                        <View style={styles.detailContainer}>
                            <Surface style={[styles.surface, { elevation: 5 }]}>
                                <View>
                                    <RenderHtml
                                        contentWidth={width}
                                        source={PRIVACY_POLICY}
                                    />
                                </View>
                            </Surface>
                        </View>
                    </Collapsible>
                </ScrollView>
            </Surface>
        </View>
    );
};

export default LegalScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    surfaceContainer: {
        // marginHorizontal: 10,
        width: '90%',
        padding: 20,
    },
    titleText: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        paddingVertical: 10,
    },
    collapsibleHeaderRow: {
        //backgroundColor: '#F5FCFF',
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center',
    },
    collapsibleHeaderText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
    },
    collapsibleHeaderIcon: {
        paddingLeft: 5,
    },
});
