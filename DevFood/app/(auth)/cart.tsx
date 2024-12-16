import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { supabase } from '@/lib/supabase';
import { useFocusEffect } from '@react-navigation/native';

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  created_at: string;
  restaurant: string;
  total: number;
  items: OrderItem[];
};

export default function Order() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const { data: pedidos, error: pedidosError } = await supabase
        .from('pedidos')
        .select(`
          id,
          created_at,
          restaurant_id,
          restaurant_name
        `);

      if (pedidosError) throw pedidosError;

      const { data: itens, error: itensError } = await supabase
        .from('itens_pedido')
        .select(`
          pedido_id,
          item_nome,
          preco,
          quantidade
        `);

      if (itensError) throw itensError;

      const ordersData: Order[] = pedidos.map((pedido) => {
        const orderItems = itens.filter((item) => item.pedido_id === pedido.id).map((item) => ({
          name: item.item_nome,
          quantity: item.quantidade,
          price: item.preco,
        }));

        const total = orderItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        return {
          id: pedido.id.toString(),
          created_at: pedido.created_at,
          restaurant: pedido.restaurant_name || `Restaurante ID ${pedido.restaurant_id}`,
          total,
          items: orderItems,
        };
      });

      const sortedOrders = ordersData.sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return dateB - dateA;
      });

      setOrders(sortedOrders);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchOrders();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {loading ? (
          <Text style={styles.noOrdersText}>Carregando pedidos...</Text>
        ) : orders.length === 0 ? (
          <Text style={styles.noOrdersText}>Nenhum pedido encontrado.</Text>
        ) : (
          orders.map((order) => (
            <View key={order.id} style={styles.orderContainer}>
              <Text style={styles.orderTitle}>Pedido #{order.id}</Text>
              <Text style={styles.restaurant}>Restaurante: {order.restaurant}</Text>
              <Text style={styles.orderTotal}>Total: R$ {order.total.toFixed(2)}</Text>
              {order.items.map((item, index) => (
                <Text key={index} style={styles.orderItem}>
                  - {item.quantity}x {item.name} (R$ {item.price.toFixed(2)})
                </Text>
              ))}
              <Text style={styles.createdAt}>
                Feito em: {new Date(order.created_at).toLocaleString()}
              </Text>
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
  },
  title: {
    marginTop: 20,
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
  restaurant: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#666',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  noOrdersText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  orderContainer: {
    margin: 10,
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
  createdAt: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 10,
  },
});
