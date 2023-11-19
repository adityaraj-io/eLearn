import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const profilePictureWidth = Dimensions.get("window").width * 0.4;
import HR from '../components/HR';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Book from '../components/Book';
import { getDatabase, ref, onValue } from 'firebase/database';
import { FirebaseApp } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBarModal from '../components/ProgressBarModal';

const ProfileScreen = () => {
  const auth = getAuth();
  const navigation = useNavigation();
  const database = getDatabase(FirebaseApp);
  const [ebooks, setEbooks] = useState([]);
  const [audiobooks, setAudioBooks] = useState([]);
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState({});
  useEffect(()=>{
    const startCountRef =  ref(database, 'EBooks/');
    const audioRef =  ref(database, 'AudioBooks/');
    const profileRef = ref(database, `users/${auth.currentUser.uid}`)
    onValue(profileRef, async(snapshot)=>{
      const data = await snapshot.val();
      if(data!==null){
        

        setProfileData(data)
      }else{
        console.log('null')
      }
    })
    onValue(startCountRef,async (snapshot)=>{
      const data = await snapshot.val();
      if(data!==null){
        const ebooksSet = Object.keys(data).map((key)=>({
          id: key,
          ...data[key]
        }));
  
        setEbooks(ebooksSet)
        // console.log(ebooksSet)  
      }else{
        console.log('null')
      }
    })

    onValue(audioRef,async (snapshot)=>{
      const data = await snapshot.val();
      if(data!==null){
        const ebooksSet = Object.keys(data).map((key)=>({
          id: key,
          ...data[key]
        }));
  
        setAudioBooks(ebooksSet)
        // console.log(ebooksSet.audios)
        // console.log(ebooksSet)  
      }else{
        console.log('null')

      }
    })
  },[])

  const handleSignOut = () => {
    setLoading(true)
    auth.signOut().then( ()=>{
      AsyncStorage.removeItem('auth').then(()=>{
        navigation.replace('Start');
        setLoading(false)
      })
    });
    
  }

  return (
    <KeyboardAwareScrollView >
      <View style={styles.container}>
        <View style={{width: '100%', alignItems: 'left'}}>
        
        <Text style={[styles.name,{marginTop: 10}]}>Hi, {profileData.username}</Text>
        <Text style={[styles.subTitle, { marginVertical: 10, textAlign: 'left' }]}>{profileData.about}</Text>
        <Text >You are signed in as {auth.currentUser.email}</Text>
         
        <View style={{ width: '100%', marginTop: 20, flexDirection: 'row' }}>
          <TouchableOpacity onPress={()=>navigation.navigate('EditProfile')} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={handleSignOut} style={[styles.buttonContainer, {marginHorizontal: 10}]}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <HR width={'90%'} />
        <Text style={styles.recommended}>Recommended EBooks</Text>
        <FlatList
          data={ebooks}
          numColumns={1}
          inverted
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.name.toString()} 
          renderItem={({item, index})=>{
          return <TouchableOpacity key={item.name.toString()} onPress={()=>navigation.navigate('EBookInfo', {
            name: item.name.toString(),
            image: item.thumbnail.toString(),
            description: item.description.toString(),
            rating: item.rating.toString(),
            category: item.category.toString(),
            author: item.author.toString(),
            link: item.link.toString(),
          })}>
            <Book name={item.name} image={item.thumbnail} />
          </TouchableOpacity>
        }}
      />

      <Text style={styles.recommended}>Recommended Audio Books</Text>
          <FlatList
          data={audiobooks}
          keyExtractor={(item) => item.name.toString()} 
          numColumns={1}
          horizontal
          showsHorizontalScrollIndicator={false}
          
          renderItem={({item, index})=>{
          return <TouchableOpacity key={item.name.toString()} onPress={()=>navigation.navigate('AudioBookInfo', {
            name: item.name.toString(),
            image: item.thumbnail.toString(),
            description: item.description.toString(),
            rating: item.rating.toString(),
            category: item.category.toString(),
            author: item.author.toString(),
          })}>
            <Book name={item.name} image={item.thumbnail} />
          </TouchableOpacity>
        }}
        />
        </View>
       

          

        <StatusBar style='dark' backgroundColor={'#fff'} />
        <ProgressBarModal visible={loading} />
      </View>

    </KeyboardAwareScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 20,
  },
  recommended: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight:  'bold'
  },
  profileImage: {
    width: profilePictureWidth,
    height: profilePictureWidth,
    backgroundColor: 'black',
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 250
  },
  buttonContainer: {
    backgroundColor: 'black',
    width: '40%',
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: StyleSheet.hairlineWidth,
  },
  name: {
    fontSize: 25,
    fontStyle: 'normal',
    fontWeight: 'bold',

  },
  buttonText: {
    color: 'white',
  },
  info: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
    marginTop: -10
  },
  infoTab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  subTitle: {
    color: 'gray'
  },
  read: {
    fontSize: 25,
    fontWeight: 'bold'
  }
})
