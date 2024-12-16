import React, { useState } from 'react';
import { Alert, StyleSheet, View, AppState, TouchableOpacity, TextInput, Text } from 'react-native';
import { supabase } from '../lib/supabase';
import { router } from 'expo-router';
import { Stack } from "expo-router"

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error, data: { session } } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (session) {
      router.push("/(auth)");
    }

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <>
    <Stack.Screen options={{headerShown: false}} />
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity 
        style={[styles.button, styles.signInButton]} 
        onPress={signInWithEmail}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.signupButton]} 
        onPress={() => router.push('/signup')}
      >
        <Text style={styles.buttonText}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1E0033',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  signInButton: {
    backgroundColor: '#8c52ff',
  },
  signupButton: {
    backgroundColor: '#ffde59',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});