import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Base, Typography } from '../../styles/index.js';
import productModel from "../../models/product.ts";
import StockList from "../stock/StockList"

export default function Stock({products, setProducts}) {
  return (
    <View>
      <Text style={Typography.header2}>Lagerförteckning</Text>
      <StockList products={products} setProducts={setProducts}/>
    </View>
  );
}