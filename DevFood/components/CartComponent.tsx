import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '@/components/CartContext';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CartIcon() {
  const { cart } = useCart();
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  if (totalItems === 0) {
    return null;
  }

  return (
    <Link href="/pages/CartPage" asChild>
      <TouchableOpacity style={styles.cartIconContainer}>
        <View style={styles.cartIconWrapper}>
          <Ionicons name="cart" size={24} color="#333" />
          {totalItems > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalItems}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  cartIconContainer: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    zIndex: 1000
  },
  cartIconWrapper: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  }
});