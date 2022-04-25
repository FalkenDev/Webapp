import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './components/Home';
import Pick from './components/pick/Pick';
import Delivery from './components/delivery/Deliveries';
import Invoices from './components/invoices/Invoices';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Base } from './styles/index.js'; 
import { useEffect, useState } from 'react';

import Auth from "./components/auth/Auth";
import authModel from "./models/auth";


const Tab = createBottomTabNavigator();
const routeIcons = {
  "Lager": "home",
  "Plock": "box",
  "Inleveranser": "plus-circle",
  "Faktura": "printer",
  "Logga in": "user",
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    setIsLoggedIn(await authModel.loggedIn());
  }, []);

  console.log(isLoggedIn);

  console.log("------| app.tsx |------");
  return (
    <SafeAreaView style={Base.container}>
      <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = routeIcons[route.name] || "alert-circle";

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
          <Tab.Screen name="Inleveranser">
            {() => <Delivery setProducts={setProducts}/>}
          </Tab.Screen>
          {isLoggedIn
            ?<Tab.Screen name="Faktura">
              {() => <Invoices setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
            :<Tab.Screen name="Logga in">
              {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
          }
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
