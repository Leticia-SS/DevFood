import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useCart } from '@/components/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, Stack } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart, getRestaurantId } = useCart();
  const [restaurant, setRestaurant] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const restaurantId = getRestaurantId();

  async function fetchRestaurant(id: number) {
    try {
      const storedRestaurant = await AsyncStorage.getItem(`restaurant_${id}`);
      if (storedRestaurant) {
        setRestaurant(JSON.parse(storedRestaurant));
        return;
      }

      const { data: restaurantData, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erro ao buscar restaurante no Supabase:', error);
        return;
      }

      if (restaurantData) {
        setRestaurant(restaurantData);
        await AsyncStorage.setItem(`restaurant_${id}`, JSON.stringify(restaurantData));
      }
    } catch (err) {
      console.error('Erro ao buscar dados do restaurante:', err);
    }
  }

  useEffect(() => {
    if (restaurantId) {
      fetchRestaurant(restaurantId).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [restaurantId]);

  const handleCheckout = async () => {
    try {
      if (!restaurantId || !restaurant) {
        console.error('Restaurante não encontrado. Não é possível finalizar o pedido.');
        return;
      }

      const newOrder = {
        created_at: new Date().toISOString(),
        total: getTotalPrice(),
        restaurant_id: restaurantId,
        restaurant_name: restaurant.name || '',
      };

      const { data: insertedOrder, error: orderError } = await supabase
        .from('pedidos')
        .insert([newOrder])
        .select('id')
        .single();

      if (orderError) {
        console.error('Erro ao inserir pedido:', orderError);
        return;
      }

      const orderId = insertedOrder.id;

      const orderItems = cart.map((item) => ({
        pedido_id: orderId,
        cardapio_id: item.id,
        item_nome: item.name,
        preco: item.price,
        quantidade: item.quantity,
        created_at: new Date().toISOString(),
      }));

      const { error: itemsError } = await supabase.from('itens_pedido').insert(orderItems);

      if (itemsError) {
        console.error('Erro ao inserir itens do pedido:', itemsError);
        return;
      }

      clearCart();
      router.push(`/pages/order/${orderId}`);

    } catch (error) {
      console.error('Erro ao processar o checkout:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (cart.length === 0) {
    return (
      <View style={styles.emptyCartContainer}>
        <Text style={styles.emptyCartText}>Seu carrinho está vazio</Text>
      </View>
    );
  }

  return (
    <>
        <Stack.Screen options={{title: 'Voltar', headerStyle: {
        backgroundColor: '#1E0033',
      }, headerTintColor: 'white'}} />
      <View style={styles.container}>
        <Text style={styles.title}>Carrinho</Text>
        {restaurant && (
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
        )}
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {cart.map((item) => (
            <View key={item.id} style={styles.cartItemContainer}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
              </View>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.id)}
              >
                <Text style={styles.removeButtonText}>Remover</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View style={styles.summaryContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalPrice}>R$ {getTotalPrice().toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
          </TouchableOpacity>
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
    padding: 20,
    textAlign: 'center',
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color: '#4CAF50',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
  },
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  quantityButton: {
    padding: 8,
    backgroundColor: '#f0f0f0',
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    paddingHorizontal: 12,
    fontSize: 14,
  },
  removeButton: {
    backgroundColor: '#FF6347',
    padding: 8,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
  },
  summaryContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
