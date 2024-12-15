import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Restaurant {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  price: string;
  time?: string;
}

export default function RestaurantDetailsPage() {
    const { id } = useLocalSearchParams();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [menu, setMenu] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            const { data: restaurantData, error: restaurantError } = await supabase
                .from('restaurants')
                .select('*')
                .eq('id', id)
                .single();

            const { data: menuData, error: menuError } = await supabase
                .from('menu_items')
                .select('*')
                .eq('restaurant_id', id);

            if (restaurantError) {
                console.error('Error fetching restaurant:', restaurantError);
            }

            if (menuError) {
                console.error('Error fetching menu:', menuError);
            }

            setRestaurant(restaurantData);
            setMenu(menuData);
            setLoading(false);
        };

        fetchRestaurantDetails();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    if (!restaurant) {
        return (
            <View style={styles.container}>
                <Text>Restaurante não encontrado</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <Text style={styles.restaurantDescription}>{restaurant.description}</Text>
                <View style={styles.metaContainer}>
                    <Text style={styles.priceText}>{restaurant.price}</Text>
                    {restaurant.time && <Text style={styles.timeText}>{restaurant.time}</Text>}
                </View>
            </View>

            <View style={styles.menuContainer}>
                <Text style={styles.menuTitle}>Cardápio</Text>
                {menu && menu.map((item) => (
                    <View key={item.id} style={styles.menuItemContainer}>
                        <Text style={styles.menuItemName}>{item.name}</Text>
                        <Text style={styles.menuItemDescription}>{item.description}</Text>
                        <Text style={styles.menuItemPrice}>R$ {item.price.toFixed(2)}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerContainer: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    restaurantName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    restaurantDescription: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    priceText: {
        fontSize: 18,
        color: '#4CAF50'
    },
    timeText: {
        fontSize: 18,
        color: '#2196F3'
    },
    menuContainer: {
        padding: 20
    },
    menuTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15
    },
    menuItemContainer: {
        marginBottom: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    menuItemName: {
        fontSize: 18,
        fontWeight: '600'
    },
    menuItemDescription: {
        fontSize: 14,
        color: '#666',
        marginVertical: 5
    },
    menuItemPrice: {
        fontSize: 16,
        color: '#4CAF50'
    }
})