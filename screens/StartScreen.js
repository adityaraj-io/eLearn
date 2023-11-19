import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DECRYPT } from '../Salts';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseApp } from '../firebaseConfig';

const StartScreen = () => {

    const [logged, setLogged] = useState(true);
    const Auth = getAuth(FirebaseApp);

    const navigation = useNavigation();

    const navigateTo = (routeName) => {
        navigation.replace(routeName);
    }
    
    
    useEffect(()=>{
      (async() => {try {
        const auth = await AsyncStorage.getItem('auth');
        if(auth){
          const value = JSON.parse(auth);
          const email = value.email.toString();
          const password = DECRYPT(value.password.toString());
          signInWithEmailAndPassword(Auth, email, password).then(()=>{
          navigateTo('Main')
        }).catch((err)=>{
          setLogged(false)
          
        })
        }else{
          setLogged(false)
        }
      } catch (error) {
        setLogged(false)
      }})();

    },[])

  return (
    <>
    {logged?<>
    <View style={styles.containerView}>
      <ActivityIndicator color={'black'} size={'large'} />
    </View>
    </> :<View style={styles.container}>
        <View style={styles.upperView}>
            <Image source={require('../assets/images/book.png')} style={styles.image} />
        </View>
      <View style={{width: '100%'}}>
        <View style={styles.textcontainer}>
        <Text style={[styles.title,{textAlign: 'center'}]} >Welcome to Elearn</Text>
        <Text style={[styles.subTitle, {textAlign: 'center'}]} >Learn and grow everyday by learning and applying new things and get ahead of 99% people.</Text>

        </View>
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={()=>navigateTo('Login')} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity  onPress={()=>navigateTo('Register')} style={[styles.buttonContainer, {backgroundColor: 'gray'}]}>
            <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
      </View>
      <StatusBar barStyle={'dark-content'} backgroundColor={'lightyellow'} />
    </View>}
    </>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    backgroundColor: 'lightyellow',
    padding: 50,
    justifyContent: 'space-between'
  },
  containerView:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightyellow',
    justifyContent: 'center'
  },
  buttonContainer: {
    backgroundColor: 'black',
    width: '100%',
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: StyleSheet.hairlineWidth,
  },
  buttonView: {
    width: '100%',
    marginVertical: 5
  },
  buttonText: {
    color: 'white',
  },
  image: {
    width: 200,
    height: 200,
  },
  upperView:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  textcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    marginVertical: 10
  },
  subTitle: {
    color: 'gray',
    marginVertical: 30

  }
});
