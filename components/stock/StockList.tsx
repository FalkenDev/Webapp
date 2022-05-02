import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Base, Typography } from '../../styles/index.js';
import productModel from "../../models/product.ts";

export default function StockList({products, setProducts}) {
  console.log("StockList");
  useEffect(async () => {
    setProducts(await productModel.getProducts());
  }, []);
  const list = products.map((product, index) => {
  return <Text 
          style={Base.products}
          key={index}
          >
            { product.name } - { product.stock }st
          </Text>});

  return (
    <View>
      {list}
    </View>
  );
}