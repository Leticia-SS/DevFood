import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, reverseGeocodeAsync } from 'expo-location'
import { useState, useEffect } from "react";

export default function CustomHeader() {
    const router = useRouter();
     const [location, setLocation] = useState<LocationObject | null>(null);
     const [address, setAddress] = useState<string>("");
    
    async function requestLocationPermissions() {
        const { granted } = await requestForegroundPermissionsAsync()

        if (granted) {
            const currentPosition = await getCurrentPositionAsync();
            setLocation(currentPosition);
            console.log("Localização atual: ", currentPosition);

            const [geocode] = await reverseGeocodeAsync({
                latitude: currentPosition.coords.latitude,
                longitude: currentPosition.coords.longitude,
            });

            if (geocode) {
                setAddress(`${geocode.street}, ${geocode.region}, ${geocode.country}`);
            }
        }
    }

    useEffect(()=>{
        requestLocationPermissions()
    },[])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => router.push('/pages/MapPage')}>
                    <Ionicons name="map-outline" size={20} color='black' />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>{address}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons />
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        backgroundColor: '#fff',
        height: 80,
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        // justifyContent: 'space-between',
        padding: 20,
    },
    titleContainer: {

    }
})