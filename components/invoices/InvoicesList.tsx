import { useState, useEffect } from 'react';
import { Text, Button } from "react-native";
import { DataTable } from 'react-native-paper';
import { Base, Typography } from '../../styles/index';
import invoiceModel from "../../models/invoices"
import authModel from "../../models/auth";
import Invoice from '../../interfaces/invoice';

export default function InvoicesList({ route, navigation, setIsLoggedIn }) {
    console.log("------| InvoicesList |------")
    const { reload } = route.params || true;
    const [allInvoices, setAllInvoices] = useState([]);

    if(reload) {
        console.log("reloading time!");
        reloadInvoices();
        route.params = false;
    }

    async function reloadInvoices() {
        setAllInvoices(await invoiceModel.getInvoices());
    }

    useEffect(() => {
        reloadInvoices();
    }, []);

    async function logOut() {
        authModel.logout();
        setIsLoggedIn(false);
    }

    let haveInvoices = true;
    console.log(allInvoices);
    const listOfInvoices = allInvoices.map((invoice: Partial<Invoice>, index) => {
        return (
            <DataTable.Row key={index}>
              <DataTable.Cell>{invoice.name}</DataTable.Cell>
              <DataTable.Cell>{invoice.total_price}</DataTable.Cell>
              <DataTable.Cell>{invoice.due_date}</DataTable.Cell>
            </DataTable.Row>
        );
    });
    if(listOfInvoices.length === 0) {
        haveInvoices = false;
    }

    return (
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Namn</DataTable.Title>
                <DataTable.Title>Pris</DataTable.Title>
                <DataTable.Title>Förfallodatum</DataTable.Title>
            </DataTable.Header>
            {listOfInvoices}
            { haveInvoices
            ?<Text></Text>
            :<Text style={Typography.warning}>Det finns inga fakturor.</Text>
            }
            <Button
                title="Skapa ny faktura"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
            <Text></Text>
            <Button
                title="Logga ut"
                onPress={async () => {
                    await logOut();
                }}
            />
        </DataTable>
        
    );
}