import React from 'react';

import {
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} from 'react-native';
import { Headline } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-native-material/core';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../constants/colors';
// import { putRally } from '../../providers/rallies';
import { createTmp } from '../../../features/rallies/ralliesSlice';
import { useFormik } from 'formik';
import { rallyLocationSchema } from '../../../formikSchemas/rally.edit.location.schema';
import * as yup from 'yup';
import CustomNavButton from '../../ui/CustomNavButton';
import { printObject } from '../../../utils/helpers';

export default function RallyLocationForm({ rallyId }) {
    const rallyEntry = useSelector((state) =>
        state.rallies.publicRallies.filter((r) => r.uid === rallyId)
    );
    const rally = rallyEntry[0];
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const onSubmit = async (values, actions) => {
        dispatch(createTmp(values));
        navigation.navigate('RallyEditFlow', {
            rallyId: rallyId,
            stage: 2,
        });
    };
    // formik hook
    const {
        values,
        errors,
        handleChange,
        touched,
        handleBlur,
        isSubmitting,
        handleSubmit,
    } = useFormik({
        initialValues: {
            name: '',
            street: '',
            city: '',
            stateProv: '',
            postalCode: '',
        },
        validationSchema: rallyLocationSchema,
        onSubmit,
    });

    // const dispatch = useDispatch();
    return (
        <View>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <ScrollView>
                            <form
                                id='screenForm'
                                onSubmit={handleSubmit}
                                autoComplete='off'
                            >
                                <View style={styles.formHeader}>
                                    <Text>
                                        <Headline>
                                            Rally Location Information
                                        </Headline>
                                    </Text>
                                </View>
                                {/* <View>
                                    <Text>
                                        <label htmlFor='email'>
                                            Location Name
                                        </label>
                                    </Text>
                                </View> */}
                                <View>
                                    {/* <TextInput
                                        style={styles.input}
                                        placeholder='Location Name'
                                        autocomplete='off'
                                        onChangeText={handleChange('name')}
                                        value={values.name}
                                        onBlur={handleBlur('name')}
                                    /> */}
                                    <Text>
                                        <input
                                            id='name'
                                            value={values.name}
                                            type='text'
                                            autoComplete='off'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='Location Name'
                                            className={
                                                errors.email && touched.email
                                                    ? 'input-error'
                                                    : ''
                                            }
                                        />
                                    </Text>
                                    {errors.name && touched.name && (
                                        <Text>
                                            <p className='error'>
                                                {errors.name}
                                            </p>
                                        </Text>
                                    )}
                                </View>
                                {/* <View>
                                    <Text>
                                        <label htmlFor='email'>Street</label>
                                    </Text>
                                </View> */}
                                <View>
                                    <Text>
                                        <input
                                            id='street'
                                            value={values.street}
                                            type='text'
                                            //autoComplete='off'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='Street Address'
                                            className={
                                                errors.street && touched.street
                                                    ? 'input-error'
                                                    : ''
                                            }
                                        />
                                    </Text>
                                    {errors.street && touched.street && (
                                        <Text>
                                            <p className='error'>
                                                {errors.street}
                                            </p>
                                        </Text>
                                    )}
                                </View>
                                {/* <View>
                                    <Text>
                                        <label htmlFor='email'>City</label>
                                    </Text>
                                </View> */}
                                <View>
                                    <Text>
                                        <input
                                            id='city'
                                            value={values.city}
                                            type='text'
                                            //autoComplete='off'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='City'
                                            className={
                                                errors.city && touched.city
                                                    ? 'input-error'
                                                    : ''
                                            }
                                        />
                                    </Text>
                                    {errors.city && touched.city && (
                                        <Text>
                                            <p className='error'>
                                                {errors.city}
                                            </p>
                                        </Text>
                                    )}
                                </View>
                                <View>
                                    <View
                                        style={
                                            styles.stateProvPostalCodeContainerRow
                                        }
                                    >
                                        <View
                                            style={
                                                styles.stateProvPostalCodeContainer
                                            }
                                        >
                                            <View
                                                style={
                                                    styles.stateProvSectionContainer
                                                }
                                            >
                                                {/* <View>
                                                    <Text>
                                                        <label htmlFor='email'>
                                                            State
                                                        </label>
                                                    </Text>
                                                </View> */}
                                                <View
                                                    style={
                                                        styles.stateProvInputContainer
                                                    }
                                                >
                                                    <Text>
                                                        <input
                                                            id='stateProv'
                                                            value={
                                                                values.stateProv
                                                            }
                                                            type='text'
                                                            //autoComplete='off'
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                            placeholder='State'
                                                            className={
                                                                errors.stateProv &&
                                                                touched.stateProv
                                                                    ? 'input-error'
                                                                    : ''
                                                            }
                                                        />
                                                    </Text>
                                                    {errors.stateProv &&
                                                        touched.stateProv && (
                                                            <Text>
                                                                <p className='error'>
                                                                    {
                                                                        errors.stateProv
                                                                    }
                                                                </p>
                                                            </Text>
                                                        )}
                                                </View>
                                            </View>
                                            <View
                                                style={
                                                    styles.postalCodeSectionContainer
                                                }
                                            >
                                                {/* <View>
                                                    <Text>
                                                        <label htmlFor='email'>
                                                            Postal Code
                                                        </label>
                                                    </Text>
                                                </View> */}
                                                <View
                                                    style={
                                                        styles.postalCodeInputContainer
                                                    }
                                                >
                                                    <Text>
                                                        <input
                                                            id='postalCode'
                                                            value={
                                                                values.postalCode
                                                            }
                                                            type='text'
                                                            //autoComplete='off'
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                            placeholder='Postal Code'
                                                            className={
                                                                errors.postalCode &&
                                                                touched.postalCode
                                                                    ? 'inputError'
                                                                    : ''
                                                            }
                                                        />
                                                    </Text>
                                                    {errors.postalCode &&
                                                        touched.postalCode && (
                                                            <Text>
                                                                <p className='error'>
                                                                    {
                                                                        errors.postalCode
                                                                    }
                                                                </p>
                                                            </Text>
                                                        )}
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <CustomNavButton
                                        title='Next'
                                        form='screenForm'
                                        type='submit'
                                        graphic={{
                                            name: 'forward',
                                            color: 'white',
                                            size: 10,
                                        }}
                                        cbStyles={{
                                            backgroundColor: 'green',
                                            color: 'white',
                                            width: '50%',
                                        }}
                                        onPress={handleSubmit}
                                    />
                                </View>
                            </form>
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    formHeader: {
        marginVertical: 10,
        alignItems: 'center',
    },
    inputContainer: {
        marginLeft: '10%',
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        marginTop: 0,
        fontSize: 18,
        borderRadius: 6,
        width: '90%',
        height: 20,
    },
    inputStateProv: {
        width: 75,
    },
    inputPostalCode: {
        width: 125,
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 5,
        // textAlign: 'center',
    },
    stateProvPostalCodeContainerRow: {
        // borderWidth: 1,
        // borderColor: 'black',
    },
    stateProvPostalCodeContainer: {
        flexDirection: 'row',
    },
    stateProvSectionContainer: {
        // borderWidth: 1,
        // borderColor: 'blue',
        marginRight: 30,
    },
    stateProvInputContainer: {
        // borderWidth: 1,
        // borderColor: 'blue',
    },
    stateProvErrorContainer: {
        //borderWidth: 1, borderColor: 'blue'
    },
    postalCodeSectionContainer: {
        //borderWidth: 1, borderColor: 'black'
    },
    postalCodeInputContainer: {
        //borderWidth: 1, borderColor: 'black'
    },
    postalCodeErrorContainer: {
        //borderWidth: 1, borderColor: 'black'
    },
    stateContainer: {
        backgroundColor: 'yellow',

        borderWidth: 1,
        borderColor: 'black',
    },
    postalCodeContainer: {},
    buttonContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    submitButton: {
        width: '70%',
    },
    inputInputError: { borderColor: '#fc8181' },
    selectInputError: {
        borderColor: '#fc8181',
    },
});
