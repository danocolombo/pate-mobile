import React, { useState } from 'react';
import { View } from 'react-native';
import DropDown from 'react-native-paper-dropdown';

function AffiliationDropDown({ list, activeValue, setValue }) {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <View>
            <DropDown
                mode={'outlined'}
                dense={true}
                visible={showDropdown}
                showDropDown={() => setShowDropdown(true)}
                onDismiss={() => setShowDropdown(false)}
                value={activeValue}
                setValue={(value) => setValue(value)}
                list={list}
            />
        </View>
    );
}

export default AffiliationDropDown;
