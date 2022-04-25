import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import { Typography } from '../../styles/index.js';
import orderModel from "../../models/orders"

export default function ShipList({ route, navigation }) {
    console.log("------| ShipList |------")
    const { reload } = route.params || true;
    const [allOrders, setAllOrders] = useState([]);

    if(reload) {
        reloadOrders();
        route.params = false;
    }

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    }

    useEffect(() => {
        reloadOrders();
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Packad")
        .map((order, index) => {
            return(
            <Button
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Order', {
                        order: order
                    });
                }}
            />)
        });

    return (
        <View>
            <Text style={Typography.header2}>Packade ordrar som är redo att levereras</Text>
            {listOfOrders}
        </View>
    );
}