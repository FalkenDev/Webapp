import { useState, useEffect } from "react";
import {Platform, ScrollView, Text, TextInput, Button, View } from "react-native";
import { Base, Typography, Forms } from '../../styles/index';

import { Picker } from '@react-native-picker/picker';
import Product from "../../interfaces/product";
import productModel from '../../models/product'
import DateTimePicker from '@react-native-community/datetimepicker';
import Delivery from '../../interfaces/delivery';
import deliveryModel from '../../models/deliveries'

export default function DeliveryForm({ route, navigation, setProducts }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    async function addDelivery() {
        await deliveryModel.addDelivery(delivery);

        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0)
        };

        await productModel.updateProducts(updatedProduct);
        setProducts(await productModel.getProducts());

        navigation.navigate("List", { reload: true });
    }

    function ProductDropDown(props) {
        const [products, setProductsList] = useState<Product[]>([]);
        let productsHash: any = {};
    
        useEffect(async () => {
            setProductsList(await productModel.getProducts());
        }, []);
    
        const itemsList = products.map((prod, index) => {
            productsHash[prod.id] = prod;
            return <Picker.Item key={index} label={prod.name} value={prod.id} />;
        });
    
        return (
            <Picker
                selectedValue={props.delivery?.product_id}
                onValueChange={(itemValue) => {
                    props.setDelivery({ ...props.delivery, product_id: itemValue });
                    props.setCurrentProduct(productsHash[itemValue]);
                }}>
                {itemsList}
            </Picker>
        );
    }

    function DateDropDown(props) {
        const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
        const [show, setShow] = useState<Boolean>(false);
    
        const showDatePicker = () => {
            setShow(true);
        };
    
        return (
            <View>
                {Platform.OS === "android" && (
                    <Button onPress={showDatePicker} title="Välj datum" />
                )}
                {(show || Platform.OS === "ios") && (
                    <DateTimePicker
                        onChange={(event, date) => {
                            setDropDownDate(date);
    
                            props.setDelivery({
                                ...props.delivery,
                                delivery_date: date.toLocaleDateString('se-SV'),
                            });
    
                            setShow(false);
                        }}
                        value={dropDownDate}
                    />
                )}
            </View>
        );
    }

    return (
        <ScrollView style={ Base.base }>
            <Text style={ Typography.header2 }>Ny inleverans</Text>

            <Text style={ Typography.label }>Produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />

            <Text style={ Typography.label }>Datum</Text>
            <Text style={ Typography.labelDate }>Datum: {delivery.delivery_date}</Text>
            <DateDropDown
                style={ Base.dateButton }
                delivery={delivery}
                setDelivery={setDelivery}
            />


            <Text style={ Typography.label }>Kommentar</Text>
            <TextInput
                style={ Forms.input }
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content });
                }}
                value={delivery?.comment}
            />

            <Text style={ Typography.label }>Antal</Text>
            <TextInput
                style={ Forms.input }
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, amount: parseInt(content) });
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
            />

            <Button
                title="Gör inleverans"
                onPress={() => {
                    addDelivery();
                }}
            />
            
        </ScrollView>
    );
};