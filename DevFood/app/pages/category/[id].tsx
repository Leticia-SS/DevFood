import { Text, FlatList, View, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Card from "@/components/Card";
import { Stack } from "expo-router";

export default function Category() {
    const [restaurants, setRestaurants] = useState<any[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { id } = useLocalSearchParams();
    const [noRestaurants, setNoRestaurants] = useState<boolean>(false);
    const router = useRouter();


    async function getRestaurants() {
        const { data: items, error } = await supabase
            .from('restaurants')
            .select('*')
            .eq('category_id', id);
        
        if (error) {
            console.error("Erro ao buscar restaurantes:", error);
        }
        
        if (items && items.length === 0) {
            setNoRestaurants(true);
        } else {
            setNoRestaurants(false);
        }

        return items;
    }

    useEffect(() => {
        const fetchRestaurants = async () => {
            const items = await getRestaurants();
            setRestaurants(items);
            setLoading(false);
        };

        fetchRestaurants();
    }, [id]);

    const handleRestaurantPress = (restaurantId: number) => {
        router.push(`/pages/restaurants/${restaurantId}`);
    };

    return (
        <>
        <Stack.Screen options={{title: 'Voltar', headerStyle: {
        backgroundColor: '#1E0033',
      }, headerTintColor: 'white'}} />
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    {noRestaurants ? (
                        <Text style={{ textAlign: 'center', fontSize: 18, color: '#666' }}>
                            Ainda não possuem restaurantes dessa categoria
                        </Text>
                    ) : (
                        restaurants && (
                            <FlatList
                                data={restaurants}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handleRestaurantPress(item.id)}>
                                        <Card>
                                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.name}</Text>
                                            <Text>{item.description}</Text>
                                            <Text>{item.address}</Text>
                                        </Card>
                                    </TouchableOpacity>
                                )}
                            />
                        )
                    )}
                </>
            )}
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5
    }
})
