// Home.js
import React from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { supabase } from '../../lib/supabase';
import { router, useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      router.replace('/login');
    }
  }

  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
