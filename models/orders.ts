import { useState, useEffect, useCallback } from 'react';
import config from "../config/config.json";
import OrderList from "../components/OrderList"

const orders = {
    getOrders: async function getOrders() {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    pickOrder: async function pickOrder(order_info) {

        function callbackFunction() {
            console.log("Had benn loaded");
        }
            
        // TODO: Minska lagersaldo för de
        // Hämta specefika ordern
        // Hämta alla produkt id samt antal
        // Uppdatera lagret / i produkter
        var items_array_length = order_info.order_items.length();

        for (let index = 0; items_array_length; index++) {
            var product = {
                id: order_info.order_items[index].id,
                name: order_info.order_items[index].name,
                stock: order_info.order_items[index].stock,
                api_key: config.api_key
            };
            var json = JSON.stringify(product);
            
            var request = new XMLHttpRequest();
            request.addEventListener("load", callbackFunction);
            request.open("PUT", "https://lager.emilfolino.se/v2/products");
            request.setRequestHeader('Content-type','application/json; charset=utf-8');
            request.send(json);

        } 

        // TODO: Ändra status för ordern till packad
        // Hämta order id, namn
        // skriv in order_status till 200
        // skicka med eget api
        // Skicka en PUT request
        var order = {
            id: order_info.id,
            name: order_info.name,
            status_id: 200,
            api_key: config.api_key
        };
        var json = JSON.stringify(order);
        
        var request = new XMLHttpRequest();
        request.addEventListener("load", callbackFunction);
        request.open("PUT", "https://lager.emilfolino.se/v2/orders");
        request.setRequestHeader('Content-type','application/json; charset=utf-8');
        request.send(json);
        return;
    }
};

export default orders;