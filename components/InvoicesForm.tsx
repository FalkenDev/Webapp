import { useState, useEffect } from "react";
import {Platform, ScrollView, Text, TextInput, Button, View } from "react-native";
import { Base, Typography, Forms } from '../styles/index';

import { Picker } from '@react-native-picker/picker';
import Order from "../interfaces/order";
import orderModel from '../models/orders'
import DateTimePicker from '@react-native-community/datetimepicker';
import Invoices from '../interfaces/invoice';
import InvoicesModel from '../models/invoices';

export default function InvoicesForm({ route, navigation }) {
    const [invoice, setInvoice] = useState<Partial<Invoices>>({});
    const [currentOrder, setCurrentOrder] = useState<Partial<Order>>({});

    async function addInvoice() {
        await InvoicesModel.addInvoice(invoice);

        navigation.navigate("List", { reload: true });
    }

    function OrderDropDown(props) {
        const [orders, setOrderList] = useState<Order[]>([]);
        let ordersHash: any = {};
    
        useEffect(async () => {
            setOrderList(await orderModel.getOrders());
        }, []);
    
        const itemsList = orders
        .filter(order => order.status === "Packad")
        .map((order, index) => {
            ordersHash[order.id] = order;
            return <Picker.Item key={index} label={order.name} value={order.id} />;
        });
    
        return (
            <Picker
                selectedValue={props.invoice?.order_id}
                onValueChange={(itemValue) => {
                    props.setInvoice({ ...props.invoice, order_id: itemValue });
                    props.setCurrentOrder(ordersHash[itemValue]);
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
    
                            props.setInvoice({
                                ...props.invoice,
                                creation_date: date.toLocaleDateString('se-SV'),
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
            <Text style={ Typography.header2 }>Ny faktura</Text>

            <Text style={ Typography.label }>Order</Text>
            <OrderDropDown
                invoice={invoice}
                setInvoice={setInvoice}
                setCurrentOrder={setCurrentOrder}
            />

            <Text style={ Typography.label }>Faktura Datum</Text>
            <Text style={ Typography.labelDate }>Datum: {invoice.creation_date}</Text>
            <DateDropDown
                style={ Base.dateButton }
                invoice={invoice}
                setInvoice={setInvoice}
            />

            <Button
                title="Skapa faktura"
                onPress={() => {
                    addInvoice();
                }}
            />
            
        </ScrollView>
    );
};