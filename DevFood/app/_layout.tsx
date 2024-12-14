import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen 
        name="login" 
        options={{ title: 'Login', headerShown: false }} 
      />
      <Stack.Screen 
        name="signup" 
        options={{ title: 'Sign Up', headerShown: false }} 
      />
    </Stack>
  );
}
