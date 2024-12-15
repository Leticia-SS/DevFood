import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject } from 'expo-location'
import { useEffect, useState } from 'react'
import { View, StyleSheet  } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { Stack, useRouter } from 'expo-router';


export default function Map(){
    const [location, setLocation] = useState<LocationObject | null>(null);

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
                        pinColor="blue"
                    />
                </MapView>
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '40%'

    },
    map: {
        flex: 1,
        width: '100%'
    },
})