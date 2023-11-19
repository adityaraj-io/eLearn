import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ActivityIndicator, Dimensions, StatusBar, TextInput } from 'react-native'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getAuth, createUserWithEmailAndPassword  } from 'firebase/auth'
import { FirebaseApp } from '../firebaseConfig'
import { getDatabase, set, ref } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ENCRYPT } from '../Salts'

const RegisterScreen = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState('');
    const [about, setAbout] = useState('')
    const navigation = useNavigation();
    const auth = getAuth(FirebaseApp);
    const database = getDatabase(FirebaseApp);
   
    const  handleRegister =  () => {
        if(email===''||password===''||name===''||age===''||about===''){
            
            alert('All Fields must be fillen')
        }else{
            setLoading(true)
            try {
                createUserWithEmailAndPassword(auth, email, password).then(async (userCredential)=>{
                    console.info('Logged in wait saving data')
                    await set(ref(database, 'users/' + userCredential.user.uid), {
                        username: name,
                        email: email,
                        age : age,
                        about: about,
                    }).then(async ()=>{
                        try {
                            const value = {
                                email: email,
                                password: ENCRYPT(password)
                            }
                            await AsyncStorage.setItem('auth', JSON.stringify(value)).then(()=>{
                                setLoading(false);
                                navigation.replace('Main')
                            })
                        } catch (error) {
                            console.log(error.message);
                            setLoading(false);
                            navigation.replace('Main')
                        }
                        
                    }).catch((error)=>{
                        alert(error.message)
                        setLoading(false)
                    })
                })
            } catch (error) {
                alert(error.message)
                setLoading(false)
            }
        }
    }
    return (
        <KeyboardAwareScrollView >
            <View  style={styles.container}>
            <View style={styles.upperView}>
            <Image source={require('../assets/images/write.png')} style={styles.image}/>
                <Text style={styles.boldTitle}>Let's Register you</Text>
                
            </View>
            <View style={styles.buttonView}>
                <View style={styles.inputView}>
                <View style={styles.inputContainer}>
                    <TextInput  onChangeText={setName} keyboardType='default' value={name} placeholder='Name' />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput maxLength={3} onChangeText={setAge} keyboardType='numeric' value={age} placeholder='Age' />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput  onChangeText={setEmail} keyboardType='email-address' value={email} placeholder='Email' />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput maxLength={10} onChangeText={setPassword} value={password} secureTextEntry={true} placeholder='Password' />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput multiline onChangeText={setAbout} value={about} placeholder='Tell us Something about yourself' />
                </View>
                </View>

                <Text style={styles.subTitle} >Already have an account ?</Text>
                <TouchableOpacity onPress={()=>navigation.replace('Login')}><Text style={styles.Title}>Sign In</Text></TouchableOpacity>
                <TouchableOpacity disabled={loading? true : false} onPress={handleRegister} style={styles.buttonContainer}>
                    {!loading ? <Text style={styles.buttonText}>Register</Text> :
                        <ActivityIndicator size={'small'} color={'white'} />}
                </TouchableOpacity>

            </View>
            <StatusBar barStyle={'dark-content'} backgroundColor={'lightyellow'} />
            </View>
        </KeyboardAwareScrollView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightyellow',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 50,
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
        marginVertical: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
    },
    subTitle: {
        color: 'gray',
    },
    Title: {
        fontWeight: 'bold',
        marginBottom: 5
    },
    boldTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    upperView: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        backgroundColor: '#EEE9CB',
        borderRadius: 10,
        width: '100%',
        marginVertical: 5,
        padding: 15,
    },
    inputView: {
        width: '100%',
        marginVertical: 30,
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 15,
        borderRadius: 270,
        // backgroundColor: 'lightgray'
    }
});