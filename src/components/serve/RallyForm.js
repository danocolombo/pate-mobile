import React from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';
import { Surface, Button } from '@react-native-material/core';
import { Formik } from 'formik';
const RallyForm = () => {
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Surface
                    elevation={6}
                    category='medium'
                    style={styles.registrationCard}
                >
                    <Formik
                        initialValues={{ title: '', body: '', rating: '' }}
                        onSubmit={(values, actions) => {
                            actions.resetForm();
                            console.log('values\n', values);
                        }}
                    >
                        {(formikProps) => (
                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Review Title'
                                    onChangeText={formikProps.handleChange(
                                        'title'
                                    )}
                                    value={formikProps.values.title}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder='Review Body'
                                    onChangeText={formikProps.handleChange(
                                        'body'
                                    )}
                                    value={formikProps.values.body}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder='Rating (1-5)'
                                    onChangeText={formikProps.handleChange(
                                        'rating'
                                    )}
                                    keyboardType='numeric'
                                    value={formikProps.values.rating}
                                />
                                <View style={styles.buttonContainer}>
                                    <Button
                                        variant='outlined'
                                        title='submit'
                                        color='white'
                                        style={styles.submitButton}
                                        onPress={() =>
                                            formikProps.handleSubmit()
                                        }
                                    ></Button>
                                </View>
                            </View>
                        )}
                    </Formik>
                </Surface>
            </View>
        </View>
    );
};

export default RallyForm;

const styles = StyleSheet.create({
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    paragraph: {
        marginVertical: 8,
        lineHeight: 20,
    },
    container: {
        // borderWidth: 1,
        // borderColor: 'black',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
    },
    formContainer: {
        // borderWidth: 1,
        // borderColor: 'black',
        width: '100%',
        margin: 5,
        alignItems: 'center',
        paddingVertical: 5,
    },
    registrationCard: {
        width: '90%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        marginHorizontal: 10,
        marginVertical: 5,
    },
    buttonContainer: {
        alignItems: 'center',
    },
    submitButton: {
        backgroundColor: 'maroon',
        width: '60%',
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center',
    },
});
