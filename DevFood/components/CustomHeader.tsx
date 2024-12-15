import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

export default function CustomHeader() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity>
                    <Text>sdfvnfxtgn</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Header</Text>
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
        backgroundColor: '#8c52ff',
        height: 80,
        flexDirection: 'row',
        gap: 20,
        // alignItems: 'center',
        // justifyContent: 'space-between'
    },
    titleContainer: {

    }
})