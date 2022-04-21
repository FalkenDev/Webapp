import { View, Text, Button } from "react-native";
import { useState, useEffect } from 'react';
import orderModel from "../models/orders";
import productModel from "../models/product";
import { Base, Typography } from '../styles/index.js';

export default function PickList({ route, navigation, setProducts }) {
    console.log("Details (PickList)");
    const { order } = route.params;
    const [productsList, setProductsList] = useState([]);

    useEffect(async ()=> {
        setProductsList(await productModel.getProducts());
    }, []);

    async function pick() {
        order.status_id = 200;
        await orderModel.pickOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", { reload: true });
    }

    let allInStock = true;

    const orderItemsList = order.order_items.map((item, index) => {
        if (item.stock < item.amount) {
            allInStock = false;
        }

        console.log(allInStock);

        return <Text style={Typography.details_text}
                key={index}
                >
                    - {item.name} - {item.amount} - {item.location}
            </Text>;
    });

    return (
        <View>
            <Text style={Typography.details_text}>Namn: {order.name}</Text>
            <Text style={Typography.details_text}>Adress: {order.address}</Text>
            <Text style={Typography.details_text}>Zip: {order.zip} {order.city}</Text>

            <Text style={Typography.details_highlight}>Produkter:</Text>

            {orderItemsList}
            {allInStock
                ?<Button title="Plocka order" onPress={pick} />
                : <Text style={Typography.warning}>Varor saknas på lager, ordern går inte att packas!</Text>
            }
        </View>
    )
};