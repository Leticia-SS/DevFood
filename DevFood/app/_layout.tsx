import { Stack } from 'expo-router';
import { CartProvider } from '@/components/CartContext';

export default function Layout() {
  return (
    <CartProvider>
    <Stack>
      <Stack.Screen 
        name="login" 
        options={{ title: 'Login', headerShown: false }} 
      />
      <Stack.Screen 
        name="signup" 
        options={{ title: 'Sign Up', headerShown: false }} 
      />
      <Stack.Screen name='(auth)' options={{ headerShown: false}} />
    </Stack>
    </CartProvider>
  );
}
