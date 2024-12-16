import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';

interface Profile {
  id: string;
  display_name: string | null;
  bio: string | null;
  phone_number: string | null;
  address: string | null;
}

export default function ProfileScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from('profile')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else if (data) {
        setProfile(data);
      }
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando perfil...</Text>
      </View>
    );
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      router.replace('/login');
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.title}>Perfil</Text>
        {profile && (
          <>
            <View style={styles.card}>
              <Text style={styles.profileText}>Nome: {profile.display_name || 'Nome não definido'}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.profileText}>Bio: {profile.bio || 'Sem bio'}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.profileText}>Telefone: {profile.phone_number || '(xx) xxxxx-xxxx'}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.profileText}>Endereço: {profile.address || 'Endereço não definido'}</Text>
            </View>
          </>
        )}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/pages/EditProfile')}
        >
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signOutButton}
          onPress={() => signOut()}
        >
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 20,
    backgroundColor: '#f9f9f9',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8c52ff',
    backgroundColor: '#ffde59',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    elevation: 5,
    textAlign: 'center',
    marginBottom: 20,
  },
  profileContainer: {
    marginBottom: 40,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5
  },
  profileText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#8c52ff',
  },
  button: {
    backgroundColor: '#8c52ff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  signOutButton: {
    backgroundColor: '#1E0033',
    padding: 12,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonsContainer: {
    marginTop: 'auto',
    paddingBottom: 20,
  },
});
