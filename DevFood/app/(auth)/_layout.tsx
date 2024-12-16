import { Tabs } from "expo-router";
import CustomHeader from "@/components/CustomHeader";
import { Ionicons } from "@expo/vector-icons"
// import { CartProvider } from '@/components/CartContext'
import CartComponent from "../../components/CartComponent";

export default function TabLayout() {

  return (
    <>
     <Tabs 
        screenOptions={{
          tabBarActiveTintColor: '#1E0033',
          tabBarActiveBackgroundColor: '#ffde59',
          headerShadowVisible: false,
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: '#8c52ff',
          },
          tabBarInactiveTintColor: '#fff',
          tabBarLabelPosition: 'below-icon',
        }}
      >
        <Tabs.Screen name="index" options={{title: 'Home', header: () => <CustomHeader />, tabBarIcon: ({focused}) => <Ionicons name={ focused ? "home-sharp" : "home-outline"} size={20} color={focused ? '#1E0033' : '#fff'} /> }}/>
        <Tabs.Screen name="categories" options={{title: 'Buscar', headerShown: false, tabBarIcon: ({focused}) => <Ionicons name={ focused ? "search-sharp" : "search-outline"} size={20} color={focused ? '#1E0033' : '#fff'} />}}/>
        <Tabs.Screen name="cart" options={{title: 'Pedidos', headerShown: false, tabBarIcon: ({focused}) => <Ionicons name={ focused ? "restaurant-sharp" : "restaurant-outline"} size={20} color={focused ? '#1E0033' : '#fff'} />}}/>
        <Tabs.Screen name="profile" options={{title: 'Perfil', headerShown: false, tabBarIcon: ({focused}) => <Ionicons name={ focused ? "person-circle-sharp" : "person-circle-outline"} size={20} color={focused ? '#1E0033' : '#fff'} />}}/>
      </Tabs>
      <CartComponent />
    </>
)};
