import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import { getDatabase, ref, onValue } from "firebase/database";
import { FirebaseApp } from '../firebaseConfig'
import Book from '../components/Book';
import { useNavigation } from '@react-navigation/native';

const Ebooks = () => {
  const navigation = useNavigation();
  const database = getDatabase(FirebaseApp);
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    const startCountRef =  ref(database, 'EBooks/');
    onValue(startCountRef,async (snapshot)=>{
      const data = await snapshot.val();
      if(data!==null){
        const ebooksSet = Object.keys(data).map((key)=>({
          id: key,
          ...data[key]
        }));
  
        setEbooks(ebooksSet)
        setLoading(false)
        // console.log(ebooksSet)  
      }else{
        console.log('null')
        setLoading(false)

      }
    })
  },[])
  const navigateAndPassData = (item) => {
    navigation.navigate('EBookInfo', {
      name: item.name.toString(),
      image: item.thumbnail.toString(),
      description: item.description.toString(),
      rating: item.rating.toString(),
      category: item.category.toString(),
      author: item.author.toString(),
      link: item.link.toString(),
    })
  }
  return (
    <View style={styles.container}>

{loading && <ActivityIndicator style={{marginTop: Dimensions.get('screen').height/3}} color={'black'} size={'large'} />}
      <FlatList
        data={ebooks}
        numColumns={2}
        keyExtractor={(item) => item.name.toString()} 
        renderItem={({item, index})=>{
          return <TouchableOpacity key={item.name.toString()} onPress={()=>navigateAndPassData(item)}>
            <Book name={item.name} image={item.thumbnail} />
          </TouchableOpacity>
        }}
      />
      
      <StatusBar backgroundColor='#fff' style='dark'/>

    </View>
  )
}

export default Ebooks


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#fff',
      justifyContent: 'center'
    },
  })
  