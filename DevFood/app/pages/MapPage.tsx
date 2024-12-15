import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject } from 'expo-location'
import { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps'
import { Stack, useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Restaurant {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  price: string;
  time: string;
}

export default function MapPage(){
    const [location, setLocation] = useState<LocationObject | null>(null);
    const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [clickCounts, setClickCounts] = useState<{ [key: number]: number }>({});

    const router = useRouter();

    async function requestLocationPermissions() {
        const { granted } = await requestForegroundPermissionsAsync()

        if(granted){
            const currentPosition = await getCurrentPositionAsync()
            setLocation(currentPosition)

            console.log("Localização atual: ", currentPosition)
        }
    }

    useEffect(()=>{
        requestLocationPermissions()
    },[])

    async function getRestaurants() {
        const { data: Items, error } = await supabase.from('restaurants').select('*')
        if (error) {
            console.error("Erro ao buscar dados:", error);
            return null;
        }
      
        return Items as Restaurant[]
    }

    useEffect(() => {
        const fetchRestaurants = async () => {
          const savedRestaurants = await AsyncStorage.getItem('restaurants');
          
          if (savedRestaurants) {
            setRestaurants(JSON.parse(savedRestaurants));
            setLoading(false);
          } else {
            const items = await getRestaurants();
            if (items) {
              setRestaurants(items);
              setLoading(false);
              
              AsyncStorage.setItem('restaurants', JSON.stringify(items));
            }
          }
        };
    
        fetchRestaurants();
      }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    const handleRestaurantPress = (restaurantId: number) => {
        setClickCounts((prev) => {
          const newCounts = { ...prev };
    
          if (newCounts[restaurantId] === 1) {
            router.push(`/pages/restaurants/${restaurantId}`);
            newCounts[restaurantId] = 0;
          } else {
            newCounts[restaurantId] = (newCounts[restaurantId] || 0) + 1;
          }
    
          return newCounts;
        });
      };

    return (
        <>
            <Stack.Screen options={{title: 'Voltar'}} />
            <View style={styles.container}>
                {location && (
                <MapView 
                    style={styles.map}
                    initialRegion= {{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude
                        }}
                        title="Minha Localização"
                        pinColor="blue"
                    />
                    
                    {restaurants && restaurants.map((restaurant) => (
                        <Marker
                            key={restaurant.id}
                            coordinate={{
                                latitude: restaurant.latitude,
                                longitude: restaurant.longitude
                            }}
                            title={restaurant.name}
                            description={restaurant.description}
                            pinColor="#ffde59"
                            // opacity={1}
                            // zIndex={10}
                            onPress={() => handleRestaurantPress(restaurant.id)}
                            >
                                {/* <Callout 
                                    tooltip={false} 
                                    style={styles.calloutContainer}
                                    onPress={() => handleRestaurantPress(restaurant.id)}
                                >
                                    <View>
                                        <Text style={styles.calloutTitle}>{restaurant.name}</Text>
                                        <Text style={styles.calloutDescription}>{restaurant.description}</Text>
                                        <View style={styles.calloutDetails}>
                                            <Text style={styles.calloutPrice}>{restaurant.price}</Text>
                                            {restaurant.time && (
                                                <Text style={styles.calloutTime}>{restaurant.time}</Text>
                                            )}
                                        </View>
                                        <Text style={styles.calloutTap}>Toque para ver mais</Text>
                                    </View>
                                </Callout> */}
    
                        </Marker>
                    ))}
                </MapView>
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        flex: 1,
        width: '100%'
    },
    calloutContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        width: 250,
        height: 150,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    calloutTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    calloutDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10
    },
    calloutDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    calloutPrice: {
        fontSize: 16,
        color: '#4CAF50'
    },
    calloutTime: {
        fontSize: 16,
        color: '#2196F3'
    },
    calloutTap: {
        textAlign: 'center',
        color: '#007AFF',
        fontWeight: 'bold'
    }
})