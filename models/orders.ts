import config from "../config/config.json";
import OrderItem from "../interfaces/order_item";
import Order from "../interfaces/order";
import productsModel from './product';

const orders = {
    getOrders: async function getOrders(): Promise<Order[]>{
        console.log("get orders");
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    pickOrder: async function pickOrder(order: Partial<Order>) {
        console.log("Pick orders");
        console.log(order.order_items)
        await Promise.all(order.order_items.map(async (order_item:
        Partial<OrderItem>) => {
            let updateProduct = {
                id: order_item.product_id,
                name: order_item.name,
                api_key: config.api_key,
                stock: order_item.stock - order_item.amount
            };

            console.log(updateProduct)

            await productsModel.updateProducts(updateProduct);
        }));

        await orders.updateOrderStatus(order);
    },

    updateOrderStatus: async function updateOrderStatus(order_info: Partial<Order>) {
        console.log("Update order status to 200 Packad");
        function callbackFunction() {
            console.log("Had been loaded");
        }

        var order = {
            id: order_info.id,
            name: order_info.name,
            status_id: 200,
            api_key: config.api_key
        };
        var json = JSON.stringify(order);
        console.log("---------------------------------------");
        console.log(order);
        console.log("---------------------------------------");

        var request = new XMLHttpRequest();
        request.addEventListener("load", callbackFunction);
        request.open("PUT", "https://lager.emilfolino.se/v2/orders");
        request.setRequestHeader('Content-type','application/json; charset=utf-8');
        request.send(json);
        return;
    },
};

export default orders;