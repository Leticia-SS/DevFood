import { useState, useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { supabase } from '../lib/supabase';
import { Button, Input } from '@rneui/themed';
import { router } from 'expo-router';

export default function SetProfile() {
  const [fullName, setFullName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      } else {
        router.push('/login');
      }
    };

    fetchUser();
  }, []);

  const saveProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profile')
        .upsert({
          user_id: user.id,
          full_name: fullName,
          phone_number: phoneNumber,
        });

      if (error) throw error;
      Alert.alert('Profile updated successfully!');
      router.push('/(auth)');
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.verticallySpaced}>
        <Input
          label="Full Name"
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          placeholder="Your full name"
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Phone"
          leftIcon={{ type: 'font-awesome', name: 'phone' }}
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
          placeholder="Your phone number"
          keyboardType="phone-pad"
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Save Profile" disabled={loading} onPress={saveProfile} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});
