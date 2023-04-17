import React, { useState } from 'react';
import { View } from 'react-native';
import DropDown from 'react-native-paper-dropdown';

function SimpleDropDown({ list, activeValue, setValue, styles = {} }) {
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
                {...styles}
            />
        </View>
    );
}

export default SimpleDropDown;
