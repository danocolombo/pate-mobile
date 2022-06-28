import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import { Controller } from 'react-hook-form';
const CustomInput = ({
    control,
    name,
    rules = {},
    autoCorrect = false,
    autoCapitalize = 'none',
    autoComplete = 'off',
    placeholder,
    keyboardType = 'default',
    secureTextEntry,
}) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
            }) => (
                <>
                    <View
                        style={[
                            styles.container,
                            { borderColor: error ? 'red' : '#e8e8e8' },
                        ]}
                    >
                        <TextInput
                            value={value}
                            placeholder={placeholder}
                            onChangeText={onChange}
                            autoCapitalize={autoCapitalize}
                            autoCorrect={autoCorrect}
                            autoComplete={autoComplete}
                            keyboardType={keyboardType}
                            onBlur={onBlur}
                            style={styles.input}
                            secureTextEntry={secureTextEntry}
                        />
                    </View>
                    {error && (
                        <Text style={{ color: 'red', alignSelf: 'stretch' }}>
                            {error.message || 'Error'}
                        </Text>
                    )}
                </>
            )}
        />
    );
};

export default CustomInput;

const styles = StyleSheet.create({
    container: {
        background: 'white',
        width: '100%',
        // borderColor: '#e8e8e8',
        // borderColor: 'black',
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 20,
        marginVertical: 5,
    },
    input: {
        fontSize: 18,
    },
});
