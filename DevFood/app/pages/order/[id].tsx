// OrderPage - [id].tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { supabase } from '@/lib/supabase';
import MapView, { Marker } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface OrderDetails {
  id: number;
  total: number;
  items: OrderItem[];
  restaurantId: number;
  restaurantName: string;
}

export default function OrderPage() {
  const { id } = useLocalSearchParams();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [restaurantLocation, setRestaurantLocation] = useState<any | null>(null);
  const [userLocation, setUserLocation] = useState<any | null>(null);

  useEffect(() => {
    if (id) {
      fetchOrderDetails(String(id));
    }
  }, [id]);

  const fetchOrderDetails = async (orderId: string) => {
    try {
      const { data: pedidoData, error: pedidoError } = await supabase
        .from('pedidos')
        .select('*')
        .eq('id', orderId)
        .single();

      if (pedidoError) {
        console.error("Erro ao buscar o pedido:", pedidoError);
        return;
      }

      const { data: itensData, error: itensError } = await supabase
        .from('itens_pedido') 
        .select('*')
        .eq('pedido_id', orderId);

      if (itensError) {
        console.error("Erro ao buscar os itens do pedido:", itensError);
        return;
      }

      const orderDetails = {
        id: pedidoData.id,
        total: pedidoData.total,
        items: itensData.map((item: any) => ({
          name: item.item_nome,
          price: item.preco,
          quantity: item.quantidade,
        })),
        restaurantId: pedidoData.restaurant_id,
        restaurantName: pedidoData.restaurant_name,
      };

      setOrderDetails(orderDetails);
      fetchRestaurantLocation(pedidoData.restaurant_id);
      fetchUserLocation();
    } catch (error) {
      console.error("Erro ao buscar o pedido:", error);
    }
  };

  const fetchRestaurantLocation = async (restaurantId: number) => {
    try {
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
    } catch (error) {
      console.error("Erro ao buscar localização do restaurante:", error);
    }
  };

  const fetchUserLocation = async () => {
    try {
      const { granted } = await requestForegroundPermissionsAsync();
      if (granted) {
        const currentPosition = await getCurrentPositionAsync();
        setUserLocation(currentPosition.coords);
      }
    } catch (error) {
      console.error("Erro ao buscar localização do usuário:", error);
    }
  };

  if (!orderDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erro: Pedido não encontrado.</Text>
      </View>
    );
  }

  return (
    <>
        <Stack.Screen options={{ title: 'Voltar' }} />
        <View style={styles.container}>
        <Text style={styles.title}>Detalhes do Pedido</Text>
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
                apikey={process.env.GOOGLE_API_KEY || ''}
                strokeWidth={3}
                strokeColor="hotpink"
            />
            </MapView>
        )}
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
      marginBottom: 5,
      marginTop: 10
    },
    contentContainer: {
      flex: 1,
      padding: 20,
    },
    detailsContainer: {
      maxHeight: '40%',
      marginBottom: 20,
      margin: 10
    },
    orderId: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    orderTotal: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#4CAF50',
      marginBottom: 10,
      marginLeft: 10
    },
    restaurantName: {
      fontSize: 18,
      fontWeight: '900',
      marginBottom: 10,
      color: '#8c52ff',
      marginLeft: 10
    },
    itemsTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    itemsContainer: {
      paddingBottom: 20,
      marginLeft: 10
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
      minHeight: 350,
    },
  });
  