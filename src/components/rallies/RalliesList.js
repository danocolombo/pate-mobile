import { FlatList } from 'react-native';
import { printObject } from '../../utils/helpers';

import RallyItem from './RallyItem';

function renderRallyItem(itemData) {
    // console.log('itemData\n', itemData, '==============================');
    return <RallyItem {...itemData.item} />;
}

function RalliesList({ rallies }) {
    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
    printObject('RalliesList(rallies)', rallies);
    return (
        <FlatList
            data={rallies.rallies}
            renderItem={renderRallyItem}
            keyExtractor={(rally) => rally.uid}
        />
    );
}

export default RalliesList;
