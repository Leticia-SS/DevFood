import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

interface OrderItem {
    name: string;
    price: number;
    quantity: number;
  }
  
  interface OrderDetails {
    id: string;
    total: number;
    items: OrderItem[];
  }

export default function OrderPage() {
  const { order } = useLocalSearchParams();
  const orderDetails: OrderDetails | null = order ? JSON.parse(order as string) : null;

  if (!orderDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erro: Pedido não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Pedido</Text>
      <Text style={styles.orderId}>Pedido #{orderDetails.id}</Text>
      <Text style={styles.orderTotal}>Total: R$ {orderDetails.total.toFixed(2)}</Text>

      <Text style={styles.itemsTitle}>Itens:</Text>
      <ScrollView contentContainerStyle={styles.itemsContainer}>
        {orderDetails.items.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemName}>{item.quantity}x {item.name}</Text>
            <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
          </View>
        ))}
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
    textAlign: 'center',
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
});
