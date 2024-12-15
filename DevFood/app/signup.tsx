import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { supabase } from '../lib/supabase';
import { Button, Input } from '@rneui/themed';
import { router, Stack } from 'expo-router';

export default function Signup() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const signUpWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      Alert.alert('Please check your inbox for email verification!');
      router.push('/setprofile');
    }
    setLoading(false);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.verticallySpaced}>
          <Input
            label="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Password"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize="none"
          />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button title="Sign up" disabled={loading} onPress={signUpWithEmail} />
        </View>
        <View style={styles.verticallySpaced}>
          <Button title="Go to Login" onPress={() => router.push('/login')} />
        </View>
      </View>
    </>
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
