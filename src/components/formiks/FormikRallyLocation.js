import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Formik } from 'formik';
const FormikRallyLocation = () => {
    return (
        <>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder='Location Name'
                    onChangeText={formikProps.handleChange('locationName')}
                    value={formikProps.values.locationName}
                    onBlur={formikProps.handleBlur('locationName')}
                />
                <Text style={styles.errorText}>
                    {formikProps.touched.locationName &&
                        formikProps.errors.locationName}
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='Street'
                    onChangeText={formikProps.handleChange('street')}
                    value={formikProps.values.street}
                    onBlur={formikProps.handleBlur('street')}
                />
                <Text style={styles.errorText}>
                    {formikProps.touched.street && formikProps.errors.street}
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='City'
                    onChangeText={formikProps.handleChange('city')}
                    value={formikProps.values.city}
                    onBlur={formikProps.handleBlur('city')}
                />
                <Text style={styles.errorText}>
                    {formikProps.touched.city && formikProps.errors.city}
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='STATE'
                    onChangeText={formikProps.handleChange('stateProv')}
                    value={formikProps.values.stateProv}
                    onBlur={formikProps.handleBlur('state')}
                />
                <Text style={styles.errorText}>
                    {formikProps.touched.stateProv &&
                        formikProps.errors.stateProv}
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='Postal Code'
                    onChangeText={formikProps.handleChange('postalCode')}
                    keyboardType='numeric'
                    value={formikProps.values.postalCode}
                    onBlur={formikProps.handleBlur('postalCode')}
                />
                <Text style={styles.errorText}>
                    {formikProps.touched.postalCode &&
                        formikProps.errors.postalCode}
                </Text>
                <View style={styles.buttonContainer}>
                    <Button
                        variant='contained'
                        title='SUBMIT'
                        color={Colors.mediumBackground}
                        tintColor='white'
                        style={styles.submitButton}
                        // style={styles.submitButton}
                        onPress={formikProps.handleSubmit}
                    />
                </View>
            </View>
        </>
    );
};

export default formikRallyLocation;

const styles = StyleSheet.create({});
