import { Text, StyleSheet } from "react-native"
import { Stack } from "expo-router"
import Map from "@/components/Map"

export default function Order() {
    return(
        <>
            <Stack.Screen options={{title: 'Voltar'}} />
            <Map />
        </>
    )
}

const styles = StyleSheet.create({
    
})
