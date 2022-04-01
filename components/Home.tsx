import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import warehouse from '../assets/warehouse.jpg';
import Stock from '../components/Stock';
import { Base, Typography } from '../styles/index.js'; 

export default function App() {
  return (
    <SafeAreaView style={Base.container}>
      <ScrollView style={Base.base}>
        <Text style={Typography.title}>Lager-Appen</Text>
        <Image source={warehouse} style={Base.img} />
        <Stock />
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}