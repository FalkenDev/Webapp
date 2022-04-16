import { ScrollView, View, Text, Button } from "react-native";
import { useState, useEffect } from 'react';
import { Base, Typography } from '../styles/index';
import deliveriesModel from '../models/deliveries';
import Delivery from '../interfaces/delivery';

export default function DeliveriesList({ route, navigation }) {
    const { reload } = route.params || true;
    const [AllDeliveries, setAllDeliveries] = useState([]);

    if(reload) {
        console.log("reloading time!");
        reloadDeliveries();
        route.params = false;
    }

    async function reloadDeliveries() {
        setAllDeliveries(await deliveriesModel.getDeliveries());
    }

    useEffect(() => {
        reloadDeliveries();
    }, []);

    let haveDeliveries = true;

    const listOfDeliveries = AllDeliveries.map((delivery: Partial<Delivery>, index) => {
        return <View style={Base.viewDelivery} key={index}>
                    <Text style={Base.products} key={index}>
                    { delivery.amount }st. { delivery.product_name }
                    </Text>
                    <Text style={Base.products}>
                    Levererad: { delivery.delivery_date }
                    </Text>
                    <Text style={Base.products}>
                    Kommentar: { delivery.comment }
                    </Text>
                </View>
                
            });
            if(listOfDeliveries.length === 0) {
                haveDeliveries = false;
            }

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Inleveranser</Text>
            { listOfDeliveries }
            { haveDeliveries
            ?<Text></Text>
            :<Text style={Typography.warning}>Det finns inga inleveranser.</Text>
            }
            <Button
                title="Skapa ny inleverans"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
        </ScrollView>
    );
}