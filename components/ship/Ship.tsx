import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShipList from './ShipList';
import ShipOrder from './ShipOrder';

const Stack = createNativeStackNavigator();

export default function Pick(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={ShipList} />
            <Stack.Screen name="Order" component={ShipOrder} />
        </Stack.Navigator>
    );
}