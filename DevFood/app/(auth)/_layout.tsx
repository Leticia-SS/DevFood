import { Tabs } from "expo-router";
import CustomHeader from "@/components/CustomHeader";
import { Ionicons } from "@expo/vector-icons"
// import { CartProvider } from '@/components/CartContext'
import CartComponent from "../../components/CartComponent";

export default function TabLayout() {

  return (
    <>
      <Tabs>
        <Tabs.Screen name="index" options={{title: 'Home', header: () => <CustomHeader />, tabBarIcon: ({focused, color}) => <Ionicons name={ focused ? "home-sharp" : "home-outline"} size={20} color='black' /> }}/>
        <Tabs.Screen name="categories" options={{title: 'Buscar', headerShown: false, tabBarIcon: ({focused, color}) => <Ionicons name={ focused ? "search-sharp" : "search-outline"} size={20} color='black' />}}/>
        <Tabs.Screen name="cart" options={{title: 'Pedidos', headerShown: false, tabBarIcon: ({focused, color}) => <Ionicons name={ focused ? "restaurant-sharp" : "restaurant-outline"} size={20} color='black' />}}/>
        <Tabs.Screen name="profile" options={{title: 'Perfil', headerShown: false, tabBarIcon: ({focused, color}) => <Ionicons name={ focused ? "person-circle-sharp" : "person-circle-outline"} size={20} color='black' />}}/>
      </Tabs>
      <CartComponent />
    </>
)};
