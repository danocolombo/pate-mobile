import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Surface } from 'react-native-paper';
import CustomButton from '../../components/ui/CustomSimpleButton';
import SimpleDropDown from '../../components/ui/DropDown/SimpleDropDown';
import { USERROLES } from '../../constants/pate';
import { styles } from './styles';
import { printObject } from '../../utils/helpers';
const UserRoles = ({ userRole, setUserRole }) => {
    printObject('userRole[IIN]', userRole);
    printObject('setUserRole[IN]', setUserRole);
    const [role, setRole] = useState(userRole.toString());

    const handleRoleChange = () => {
        window.alert('clicked');
    };
    return (
        <Surface style={styles.standardSurfaceContainer}>
            <View style={styles.standardTitleWrapper}>
                <Text style={styles.standardTitle}>User Role</Text>
            </View>
            <View>
                <SimpleDropDown
                    list={USERROLES}
                    activeValue={userRole}
                    setValue={setUserRole}
                    styles={{
                        dropDownItemSelectedTextStyle: {
                            fontWeight: 'bold',
                        },
                        activeColor: 'yellow',
                        dropDownItemSelectedStyle: { backgroundColor: 'green' },
                        dropDownItemStyle: { backgroundColor: 'lightgrey' },
                        dropDownContainerStyle: { padding: 5 },

                        // dropDownContainerStyle: {
                        //     borderColor: 'blue',
                        //     borderWidth: 5,
                        // },
                        dropDownStyle: { width: '80%', alignSelf: 'stretch' },
                    }}
                />
            </View>

            <View style={[styles.standardRow, { marginVertical: 10 }]}>
                <CustomButton text='UPDATE' onPress={handleRoleChange} />
            </View>
        </Surface>
    );
};

export default UserRoles;

//     dropDownStyle?: ViewStyle;
//     dropDownItemSelectedTextStyle?: TextStyle;
//     dropDownItemSelectedStyle?: ViewStyle;
//     dropDownItemStyle?: ViewStyle;
//     dropDownItemTextStyle?: TextStyle;
