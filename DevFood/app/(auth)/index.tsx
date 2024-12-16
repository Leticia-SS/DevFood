import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, ScrollView, Image } from 'react-native';
import { supabase } from '@/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Home() {
  const [restaurants, setRestaurants] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  async function getRestaurants() {
    const { data: restaurants, error } = await supabase.from('restaurants').select('*');
    if (error) {
      console.error("Erro ao buscar dados:", error);
    }
    return restaurants;
  }

  const handleCategoryPress = (restaurant: string) => {
    router.push(`/pages/restaurants/${restaurant}`);
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      const savedRestaurants = await AsyncStorage.getItem('restaurants');
      
      if (savedRestaurants) {
        setRestaurants(JSON.parse(savedRestaurants));
        setLoading(false);
      } else {
        const items = await getRestaurants();
        setRestaurants(items);
        setLoading(false);
        
        AsyncStorage.setItem('restaurants', JSON.stringify(items));
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={require('@/assets/images/background.png')}
        style={styles.headerImage}
      />

        <Text style={styles.restaurantsTitle}>Restaurantes</Text>

      {restaurants && restaurants.map((restaurant) => (
        <TouchableOpacity
          key={restaurant.id}
          style={styles.card}
          onPress={() => handleCategoryPress(restaurant.id)}
        >
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantDescription}>{restaurant.description}</Text>
          <Text style={styles.restaurantTime}>{restaurant.time}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    marginTop: 80
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  restaurantDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20
  },
  restaurantTime: {
    fontSize: 12,
    color: '#888',
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
    headerImage: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      marginBottom: 20,
    },
    cardTitleContainer: {
      marginBottom: 20,
    },
    restaurantsTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#8c52ff', 
      backgroundColor: '#ffde59',
      padding: 10,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
      textAlign: 'center',
      marginBottom: 10
    },
  
});
