import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{title: 'Home', headerShown: false}}/>
      <Tabs.Screen name="categories" options={{title: 'Categorias', headerShown: false}}/>
      <Tabs.Screen name="cart" options={{title: 'Pedidos', headerShown: false}}/>
    </Tabs>
)};
