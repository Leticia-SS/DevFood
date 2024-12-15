import { Tabs } from "expo-router";
import CustomHeader from "@/components/CustomHeader";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{title: 'Home', header: () => <CustomHeader />}}/>
      <Tabs.Screen name="categories" options={{title: 'Categorias', headerShown: false}}/>
      <Tabs.Screen name="cart" options={{title: 'Pedidos', headerShown: false}}/>
      <Tabs.Screen name="profile" options={{title: 'Perfil', headerShown: false}}/>
    </Tabs>
)};
