// app/(auth)/profile.tsx
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { supabase } from '@/lib/supabase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

export default function ProfileScreen() {
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
            <TouchableOpacity style={styles.TouchableOpacity} onPress={signOut}><Text style={styles.Text}>Sign Out</Text></TouchableOpacity> 
        </View>

    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  TouchableOpacity: {
    backgroundColor: '#1E0033',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
  },
  Text: {
    color: '#ffffff'
  }
})