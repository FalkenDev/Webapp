import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import { Typography } from '../styles/index.js';
import orderModel from "../models/orders"

export default function OrderList({ route, navigation }) {
    console.log("------| OrderList |------")
    const { reload } = route.params || true;
    const [allOrders, setAllOrders] = useState([]);

    if(reload) {
        console.log("reloading time!");
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
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return <Button
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Details', {
                        order: order
                    });
                }}
            />
        });

    return (
        <View>
            <Text style={Typography.header2}>Ordrar redo att plockas</Text>
            {listOfOrders}
        </View>
    );
}