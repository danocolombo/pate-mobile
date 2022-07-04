import { FlatList } from 'react-native';
import { printObject } from '../../utils/helpers';

import RallyItem from './RallyItem';

function renderRallyItem(itemData) {
    return <RallyItem {...itemData.item} key={itemData.item.uid} />;
}

function RalliesList({ rallies }) {
    return (
        <FlatList
            data={rallies.rallies}
            renderItem={renderRallyItem}
            keyExtractor={(rally) => rally.uid}
        />
    );
}

export default RalliesList;
