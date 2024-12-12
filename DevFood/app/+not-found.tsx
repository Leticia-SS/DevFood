import { View, StyleSheet, Image } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
    <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Link href="/" >
          <Image style={styles.image} source={require('../assets/images/pageNotFound.jpg')} />
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#140024',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
  },
});