import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import config from "../config/config.json";
import { Base, Typography } from '../styles/index.js'; 

function StockList() {
    const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${config.base_url}/products?api_key=${config.api_key}`)
      .then(response => response.json())
      .then(result => setProducts(result.data));
  }, []);
  const list = products.map((product, index) => <Text style={Base.products} key={index}>{ product.name } - {product.stock }st</Text>);

  return (
    <View>
      {list}
    </View>
  );
}

export default function Stock() {
  return (
    <View>
      <Text style={Typography.header2}>Lagerförteckning</Text>
      <StockList/>
    </View>
  );
}