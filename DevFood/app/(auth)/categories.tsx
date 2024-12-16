import { Text, FlatList, View, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native"
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import Card from "@/components/Card";

export default function Categories() {
    const [categories, setCategories] = useState<any[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    async function getCategories() {
        const { data: Items, error } = await supabase.from('categories').select('*')
        if (error) {
            console.error("Erro ao buscar dados:", error);
          }
      
        return Items
    }

    useEffect(() => {
        const fetchCategories = async () => {
          const savedCategories = await AsyncStorage.getItem('categories');
          
          if (savedCategories) {
            setCategories(JSON.parse(savedCategories));
            setLoading(false);
          } else {
            const items = await getCategories();
            setCategories(items);
            setLoading(false);
            
            AsyncStorage.setItem('categories', JSON.stringify(items));
          }
        };
    
        fetchCategories();
      }, []);

      const handleCategoryPress = (categoryId: string) => {
        router.push(`/pages/category/${categoryId}`);
    };


    const categoryColors = ['#8c52ff', '#f6cb1e', '#ff3131', '#1E0033'];

    const getCardColor = (index: number) => {
        return categoryColors[index % categoryColors.length];
    };

    return(
      <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>
      {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
      ) : (
          categories && (
              <FlatList
                  data={categories}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => handleCategoryPress(item.id)}>
                        <Card style={{ backgroundColor: getCardColor(index), margin: 10 }}>
                          <Text style={styles.text}>{item.category}</Text>
                        </Card>
                    </TouchableOpacity>
                  )}
              />
          )
      )}
  </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8c52ff', 
    backgroundColor: '#ffde59',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    elevation: 5,
    textAlign: 'center',
    marginBottom: 20
  },
})