import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Keyboard,
    ScrollView,
} from 'react-native';
import { Surface, List, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from 'react-native-paper-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomButton from '../ui/CustomButton';
import { updateCurrentUser } from '../../features/users/usersSlice';
import { getActivePublicAffiliates } from '../../providers/system';
import { printObject, capitalize } from '../../utils/helpers';

export default function ProfileEditAffiliations() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    let user = useSelector((state) => state.users.currentUser);
    const [affiliationSelected, setAffiliationSelected] = useState(
        user?.affiliations?.active
    );
    const [showMultiSelectDropDown, setShowMultiSelectDropDown] =
        useState(false);
    const [affiliationsSelected, setAffiliationsSelected] = useState('');
    const [affiliationsList, setAffiliationsList] = useState([]);
    const [showDropDown, setShowDropDown] = useState(false);
    const [isLoading, setIsLoading] = useState();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(['CRP8', 'FEO']);
    const [items, setItems] = useState([
        { label: 'CR P8 Rallies', value: 'CRP8' },
        { label: 'Pickel Ball Tournaments', value: 'PCKL' },
        { label: 'FEO Testing', value: 'FEO' },
        { label: '5K Runs', value: '5KS' },
        { label: 'Farmers Market', value: 'FARM' },
        { label: 'Pig Wrestling', value: 'PIGW' },
        { label: 'Submarine Races', value: 'SUBS' },
        { label: 'Fishing Tournaments', value: 'FISH' },
    ]);

    async function getAvailableAffiliations() {
        const affiliates = await getActivePublicAffiliates();
        if (affiliates.statusCode === 200) {
            return affiliates.body;
        } else {
            return [];
        }
    }
    useEffect(() => {
        setIsLoading(true);
        getAvailableAffiliations()
            .then((a) => {
                setAffiliationsList(a);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log('error getting affiliates\n', err);
                setIsLoading(false);
            });
    }, []);

    const affiliationList = [
        {
            label: 'FEO',
            value: 'FEO',
        },
        {
            label: 'CRP8',
            value: 'CRP8',
        },
    ];

    const affiliationsList2 = [
        {
            label: 'Pickleball',
            value: 'PBAL',
        },
        {
            label: 'Art Shows',
            value: 'ARTS',
        },
        {
            label: '5K Races',
            value: '5KS',
        },
        {
            label: 'Garage Sales',
            value: 'GARS',
        },
    ];
    const handleSubmit = (values) => {};
    if (isLoading) {
        return <ActivityIndicator />;
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Surface style={styles.personalSurface}>
                <View style={styles.heading}>
                    <Text style={styles.headerText}>
                        Edit Affiliation Definition
                    </Text>
                </View>
                <View style={styles.instructionWrapper}>
                    <Text style={styles.instructionText}>
                        Select one of your affilates.
                    </Text>
                </View>
                <View style={styles.dropdownContainer}>
                    <DropDown
                        label={'Affiation'}
                        mode={'outlined'}
                        visible={showDropDown}
                        showDropDown={() => setShowDropDown(true)}
                        onDismiss={() => setShowDropDown(false)}
                        value={affiliationSelected}
                        setValue={setAffiliationSelected}
                        list={affiliationList}
                    />
                </View>
                <View style={styles.offerWrapper}>
                    <Text style={styles.offerText}>
                        You can request access to one of the follow affilations
                    </Text>
                </View>

                <View
                    style={{
                        // backgroundColor: '#171717',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 15,
                    }}
                >
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        theme='LIGHT'
                        multiple={true}
                        mode='BADGE'
                        badgeDotColors={[
                            '#e76f51',
                            '#00b4d8',
                            '#e9c46a',
                            '#e76f51',
                            '#8ac926',
                            '#00b4d8',
                            '#e9c46a',
                        ]}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        title='Update'
                        graphic=''
                        cbStyles={{
                            backgroundColor: 'green',
                            color: 'white',
                            width: '50%',
                        }}
                        onPress={() => {}}
                    />
                </View>
            </Surface>
        </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
    personalSurface: {
        marginHorizontal: 10,
        paddingVertical: 0,
        marginTop: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    heading: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    instructionWrapper: {
        marginVertical: 10,
    },
    instructionText: {
        textAlign: 'center',
    },
    dropdownContainer: {
        marginHorizontal: 20,
    },
    offerWrapper: {
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    offerText: {
        textAlign: 'center',
        fontSize: 18,
        letterSpacing: 0.5,
    },
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

    affiliateSurfaceContainter: {
        padding: 5,
        marginHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    affiliateTitle: {
        textAlign: 'center',
        fontSize: 24,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    submitButton: {
        width: '70%',
    },
});
