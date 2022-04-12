import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from "./components/Home";
import Pick from "./components/Pick";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Base } from './styles/index.js'; 
import { useState } from 'react';


const Tab = createBottomTabNavigator();
const routeIcons = {
  "Lager": "home",
  "Plock": "box",
};

export default function App() {
  const [products, setProducts] = useState([]);
  console.log("app.tsx");
  return (
    <SafeAreaView style={Base.container}>
      <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = routeIcons[route.name] || "alert";

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      })}
    >
          <Tab.Screen name="Lager">
            {() => <Home products={products} setProducts={setProducts}
            ></Home>}
          </Tab.Screen>
          <Tab.Screen name="Plock">
            {() => <Pick setProducts={setProducts}/>}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
