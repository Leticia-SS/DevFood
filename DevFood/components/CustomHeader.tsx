import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router';

export default function CustomHeader() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => router.push('/pages/MapPage')}>
                    <Ionicons name="map-outline" size={20} color='black' />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Pesquisar</Text>
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