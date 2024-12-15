import { Text, FlatList, View, ActivityIndicator } from "react-native"
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Categories() {
    const [categories, setCategories] = useState<any[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

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

    return(
        <View>
      <Text>Categories</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        categories && (
          <FlatList
            data={categories}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text>{item.category}</Text>
            )}
          />
        )
      )}
    </View>
    )
}
