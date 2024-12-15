import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'expo-router'

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
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {profile && (
        <>
          <Text style={styles.profileText}>Nome: {profile.display_name || 'Nome'}</Text>
          <Text style={styles.profileText}>Bio: {profile.bio || 'No bio'}</Text>
          <Text style={styles.profileText}>Telefone: {profile.phone_number || '(xx) xxxxx-xxxx'}</Text>
          <Text style={styles.profileText}>Endereço: {profile.address || 'Endereço'}</Text>
        </>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/pages/EditProfile')}
      >
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1E0033',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});