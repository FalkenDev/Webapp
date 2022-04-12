interface OrderItem {
    api_key: string,
    product_id: number,
    amount: number,
    article_number: string,
    name: string,
    description: string,
    specifiers: "{'length' : '60mm', 'width' : '14mm'}",
    stock: number,
    location: string,
    price: number
}

export default OrderItem