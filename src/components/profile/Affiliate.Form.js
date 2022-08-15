import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} from 'react-native';
import { Surface, List, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from '../ui/PhoneInput';
// import { Colors } from '../../../constants/colors';
// import { putRally } from '../../providers/rallies';
// import { createTmp, updateTmp } from '../../../features/rallies/ralliesSlice';
import { Formik } from 'formik';
import * as yup from 'yup';
import CustomButton from '../ui/CustomButton';
import { updateCurrentUser } from '../../features/users/usersSlice';
import { updateProfile } from '../../providers/users';
import { Colors } from '../../constants/colors';
import {
    printObject,
    getPhoneType,
    createPatePhone,
} from '../../utils/helpers';

// create validation schema for yup to pass to formik
const profileSchema = yup.object({
    churchName: yup.string().min(2),
    churchCity: yup.string().min(2),
    churchStateProv: yup.string().min(2).max(2),
});

export default function AffiliateForm() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    let user = useSelector((state) => state.users.currentUser);
    const AFFILIATION_ENTITY = useSelector(
        (state) => state.system.affiliationEntity
    );

    let rally;

    const handleSubmit = (values) => {
        dispatch(updateCurrentUser(values));
        // need to create residence structure
        let dbProfile = {
            uid: user.uid,

            church: {
                name: values?.churchName ? values.churchName : '',
                //street: values?.churchStreet ? values.churchStreet : '',
                city: values?.churchCity ? values.churchCity : '',
                stateProv: values?.churchStateProv
                    ? values.churchStateProv
                    : '',
            },
            isLoggedIn: true,
        };
        // now conditionally add the rep and lead info if applicable
        if (user?.stateRep) {
            dbProfile = { ...dbProfile, stateRep: user.stateRep };
            dbProfile = { ...dbProfile, profile: user.profile };
        }
        if (user?.stateLead) {
            dbProfile = { ...dbProfile, stateLead: user.stateLead };
            dbProfile = { ...dbProfile, profile: user.profile };
        }
        dbProfile = { ...dbProfile, username: user.username };
        dbProfile = { ...dbProfile, role: user.role };
        dbProfile = { ...dbProfile, region: user.region };
        // printObject('PF:127-->dbProfile', dbProfile);
        if (!user?.affiliate) {
            dbProfile = { ...dbProfile, affiliate: 'FEO' };
        }
        updateProfile(dbProfile).then((response) => {
            navigation.navigate('Main', null);
        });
    };
    const [isOpened, setIsOpened] = useState(true);
    const handlePress = () => setIsOpened(!isOpened);
    // const dispatch = useDispatch();
    const sectionTitle = AFFILIATION_ENTITY + ' Affiliation';
    return (
        <ScrollView>
            <List.Section>
                <List.Accordion
                    title='{AFFILIATION_ENTITY} Affiliation'
                    titleStyle={{
                        color: Colors.primary,
                        fontSize: 24,
                        fontWeight: '600',
                        letterSpacing: 0.5,
                    }}
                    onPress={handlePress}
                    right={(props) => (
                        // <List.Icon {...props} icon='chevron' />
                        <Ionicons
                            name={
                                isOpened
                                    ? 'chevron-up-sharp'
                                    : 'chevron-down-sharp'
                            }
                            color={'black'}
                            size={24}
                        />
                    )}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <Formik
                            initialValues={{
                                churchName: user?.church?.name
                                    ? user.church.name
                                    : '',
                                churchCity: user?.church?.city
                                    ? user.church.city
                                    : '',
                                churchStateProv: user?.church?.stateProv
                                    ? user.church.stateProv
                                    : '',
                            }}
                            validationSchema={profileSchema}
                            onSubmit={async (values, actions) => {
                                handleSubmit(values);
                            }}
                        >
                            {(formikProps) => (
                                <Surface>
                                    <Surface
                                        style={styles.churchSurfaceContainter}
                                    >
                                        <View style={styles.inputContainer}>
                                            <View>
                                                <Text
                                                    style={styles.churchTitle}
                                                >
                                                    {AFFILIATION_ENTITY}{' '}
                                                    Affiliation
                                                </Text>
                                            </View>
                                            <View style={styles.labelContainer}>
                                                <Text style={styles.labelText}>
                                                    {AFFILIATION_ENTITY} Name
                                                </Text>
                                            </View>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Church Name'
                                                onChangeText={formikProps.handleChange(
                                                    'churchName'
                                                )}
                                                value={
                                                    formikProps.values
                                                        .churchName
                                                }
                                                onBlur={formikProps.handleBlur(
                                                    'churchName'
                                                )}
                                            />
                                            {formikProps.errors.churchName &&
                                            formikProps.touched.churchName ? (
                                                <Text style={styles.errorText}>
                                                    {formikProps.touched
                                                        .churchName &&
                                                        formikProps.errors
                                                            .churchName}
                                                </Text>
                                            ) : null}
                                            <View style={styles.labelContainer}>
                                                <Text style={styles.labelText}>
                                                    City
                                                </Text>
                                            </View>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='City'
                                                onChangeText={formikProps.handleChange(
                                                    'churchCity'
                                                )}
                                                value={
                                                    formikProps.values
                                                        .churchCity
                                                }
                                                onBlur={formikProps.handleBlur(
                                                    'churchCity'
                                                )}
                                            />
                                            {formikProps.errors.churchCity &&
                                            formikProps.touched.churchCity ? (
                                                <Text style={styles.errorText}>
                                                    {formikProps.touched
                                                        .churchCity &&
                                                        formikProps.errors
                                                            .churchCity}
                                                </Text>
                                            ) : null}
                                            <View style={styles.labelContainer}>
                                                <Text style={styles.labelText}>
                                                    State
                                                </Text>
                                            </View>
                                            <TextInput
                                                style={[
                                                    styles.input,
                                                    styles.inputStateProv,
                                                ]}
                                                placeholder='State'
                                                onChangeText={formikProps.handleChange(
                                                    'churchStateProv'
                                                )}
                                                value={
                                                    formikProps.values
                                                        .churchStateProv
                                                }
                                                onBlur={formikProps.handleBlur(
                                                    'churchStateProv'
                                                )}
                                            />

                                            {formikProps.errors
                                                .churchStateProv &&
                                            formikProps.touched
                                                .churchStateProv ? (
                                                <Text style={styles.errorText}>
                                                    {formikProps.touched
                                                        .churchStateProv &&
                                                        formikProps.errors
                                                            .churchStateProv}
                                                </Text>
                                            ) : null}
                                        </View>
                                    </Surface>
                                    <View style={styles.buttonContainer}>
                                        <CustomButton
                                            title='Update'
                                            graphic=''
                                            cbStyles={{
                                                backgroundColor: 'green',
                                                color: 'white',
                                                width: '50%',
                                            }}
                                            onPress={formikProps.handleSubmit}
                                        />
                                    </View>
                                </Surface>
                            )}
                            {/* this ends the formik execution */}
                        </Formik>
                    </TouchableWithoutFeedback>
                </List.Accordion>
            </List.Section>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    inputContainer: {
        marginLeft: '10%',
        backgroundColor: 'white',
    },
    labelContainer: {
        marginTop: 3,
    },
    labelText: {
        fontSize: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 5,
        marginTop: 2,
        fontSize: 18,
        borderRadius: 6,
        width: '90%',
    },

    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 5,
        // textAlign: 'center',
    },

    churchSurfaceContainter: {
        padding: 5,
        marginHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    churchTitle: {
        textAlign: 'center',
        fontSize: 24,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
});
