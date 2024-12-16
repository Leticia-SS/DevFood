import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '@/lib/supabase';
import MapView, { Marker } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { Stack } from 'expo-router';
interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface OrderDetails {
  id: string;
  total: number;
  items: OrderItem[];
  restaurantId: number;
  restaurantName: string;
}

export default function OrderPage() {
  const { order } = useLocalSearchParams();
  const orderDetails: OrderDetails | null = order ? JSON.parse(order as string) : null;
  const [restaurantLocation, setRestaurantLocation] = useState<any | null>(null);
  const [userLocation, setUserLocation] = useState<any | null>(null);

  const fetchRestaurantLocation = async (restaurantId: number) => {
    const { data, error } = await supabase
      .from('restaurants')
      .select('latitude, longitude')
      .eq('id', restaurantId)
      .single();

    if (error) {
      console.error("Erro ao buscar localização do restaurante:", error);
    } else {
      setRestaurantLocation(data);
    }
  };

  const fetchUserLocation = async () => {
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setUserLocation(currentPosition.coords);
    }
  };

  useEffect(() => {
    if (orderDetails) {
      fetchRestaurantLocation(orderDetails.restaurantId);
      fetchUserLocation();
    }
  }, [orderDetails]);

  if (!orderDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erro: Pedido não encontrado.</Text>
      </View>
    );
  }

  return (
    <>
    <Stack.Screen options={{title: 'Voltar'}} />
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Pedido</Text>
      <View style={styles.contentContainer}>
        <ScrollView style={styles.detailsContainer}>
          <Text style={styles.orderId}>Pedido #{orderDetails.id}</Text>
          <Text style={styles.orderTotal}>Total: R$ {orderDetails.total.toFixed(2)}</Text>
          <Text style={styles.restaurantName}>{orderDetails.restaurantName}</Text>

          <Text style={styles.itemsTitle}>Itens:</Text>
          <View style={styles.itemsContainer}>
            {orderDetails.items.map((item, index) => (
              <View key={index} style={styles.item}>
                <Text style={styles.itemName}>{item.quantity}x {item.name}</Text>
                <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {userLocation && restaurantLocation && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude
              }}
              pinColor="blue"
              title="Sua Localização"
            />
            <Marker
              coordinate={{
                latitude: restaurantLocation.latitude,
                longitude: restaurantLocation.longitude
              }}
              pinColor="red"
              title="Restaurante"
            />

            <MapViewDirections
              origin={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude
              }}
              destination={{
                latitude: restaurantLocation.latitude,
                longitude: restaurantLocation.longitude
              }}
              apikey="YOUR_GOOGLE_MAPS_API_KEY"
              strokeWidth={3}
              strokeColor="hotpink"
              onReady={(result) => {
                console.log(`Distância: ${result.distance} km`);
              }}
            />
          </MapView>
        )}
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  detailsContainer: {
    maxHeight: '40%',
    marginBottom: 20,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#4CAF50',
  },
  itemsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  itemsContainer: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 5,
  },
  itemName: {
    fontSize: 14,
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#4CAF50',
  },
  errorText: {
    fontSize: 18,
    color: '#FF6347',
    textAlign: 'center',
  },
  map: {
    flex: 1,
    minHeight: 300,
  },
});
