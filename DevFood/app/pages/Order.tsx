import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';

type Order = {
  id: number;
  total: number;
  items: {
    name: string;
    quantity: number;
  }[];
  paymentMethod: string;
  restaurant: string;
};

export default function Order() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { restaurant } = useLocalSearchParams();

  useEffect(() => {
    const fetchOrders = async () => {
      const storedOrders = await AsyncStorage.getItem('pedidos');
      const parsedOrders = storedOrders ? JSON.parse(storedOrders) : [];
      setOrders(parsedOrders);
    };

    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos</Text>
      {restaurant && <Text style={styles.restaurant}>Restaurante: {restaurant}</Text>} 
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {orders.length === 0 ? (
          <Text style={styles.noOrdersText}>Nenhum pedido encontrado.</Text>
        ) : (
          orders.map((order) => (
            <View key={order.id} style={styles.orderContainer}>
              <Text style={styles.orderTitle}>Pedido #{order.id}</Text>
              <Text style={styles.orderTotal}>Total: R$ {order.total.toFixed(2)}</Text>
              {order.items.map((item: { name: string; quantity: number }, index: number) => (
                <Text key={index} style={styles.orderItem}>
                  - {item.quantity}x {item.name}
                </Text>
              ))}
              <Text style={styles.paymentMethod}>Forma de Pagamento: {order.paymentMethod}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  restaurant: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  noOrdersText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  orderContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  orderTotal: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 10,
  },
  orderItem: {
    fontSize: 14,
  },
  paymentMethod: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 10,
  },
});
