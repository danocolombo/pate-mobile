import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Surface } from 'react-native-paper';
import CustomButton from '../../components/ui/CustomSimpleButton';
import SimpleDropDown from '../../components/ui/DropDown/SimpleDropDown';
import { USERROLES } from '../../constants/pate';
import { styles } from './styles';
import { updateAffiliation } from '../../providers/profiles.provider';
import { printObject } from '../../utils/helpers';
import { useNavigation } from '@react-navigation/native';
const UserRoles = ({ activeUser }) => {
    const dispatch = useDispatch();
    const navigate = useNavigation();
    // printObject('UR:10-->activeUser:\n', activeUser);
    // printObject('UR:11-->activeUser.role:', activeUser.role);
    const currentUser = useSelector((state) => state.users.currentUser);
    const [role, setRole] = useState(activeUser.role.toString());
    const [roleList, setRoleList] = useState([]);
    useEffect(() => {
        const trimRoles = async () => {
            let theList = USERROLES;
            /*   
                { label: 'Guest', value: 'guest' },
                { label: 'Representative', value: 'rep' },
                { label: 'Lead', value: 'lead' },
                { label: 'Director', value: 'director' },
                { label: 'Owner', value: 'owner' },
            */
            // console.log('URC:26-->ROLE:', activeUser.role);
            switch (currentUser.role) {
                case 'guru':
                    break;
                case 'owner':
                    theList = theList.filter((role) => role.label !== 'Owner');
                    break;
                case 'director':
                    theList = theList.filter(
                        (role) =>
                            role.label !== 'Owner' && role.label !== 'Director'
                    );
                    break;
                case 'lead':
                    theList = theList.filter(
                        (role) =>
                            role.label !== 'Owner' &&
                            role.label !== 'Director' &&
                            role.label !== 'Lead'
                    );
                    break;
                case 'rep':
                    theList = theList.filter(
                        (role) =>
                            role.label !== 'Owner' &&
                            role.label !== 'Director' &&
                            role.label !== 'Lead'
                    );
                    break;
                case 'guest':
                    theList = theList.filter(
                        (role) =>
                            role.label !== 'Owner' &&
                            role.label !== 'Director' &&
                            role.label !== 'Lead'
                    );
                    break;
                default:
                    theList = [];
                    break;
            }
            // printObject('UR:49-->theList:\n', theList);
            setRoleList(theList);
        };
        trimRoles();
    }, []);
    const handleRoleChange = () => {
        // printObject('URC:73-->activeUser:\n', activeUser);
        // console.log('role:', role);
        const newAffiliation = {
            id: activeUser.id,
            divisionAffiliationsId: currentUser.affiliations.active.divisionId,
            userAffiliationsId: activeUser.user.id,
            role: role,
            status: activeUser.status,
        };
        printObject('URC:73-->newAffiliation:\n', newAffiliation);
        dispatch(updateAffiliation(newAffiliation));
        navigate.goBack();
    };
    printObject('currentUser:\n', currentUser);
    printObject('activeUser:\n', activeUser);
    return (
        <Surface style={styles.standardSurfaceContainer}>
            <View style={styles.standardTitleWrapper}>
                <Text style={styles.standardTitle}>User Role</Text>
            </View>
            <View>
                <SimpleDropDown
                    list={roleList}
                    activeValue={role}
                    setValue={setRole}
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
