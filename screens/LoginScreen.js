import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ActivityIndicator, Dimensions, StatusBar, TextInput } from 'react-native'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getAuth, signInWithEmailAndPassword  } from 'firebase/auth'
import { FirebaseApp } from '../firebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENCRYPT } from '../Salts'

const LoginScreen = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();
    const auth = getAuth(FirebaseApp);
    
    const handleLogin = () => {
        if(email===''||password===''){
            alert('All Fields must be fillen')
        }else{
            try {
                setLoading(true)
                signInWithEmailAndPassword(auth, email, password).then(async (userCredential)=>{
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
            <Image source={require('../assets/images/login.png')} style={styles.image}/>

                <Text style={styles.boldTitle}>Let's Sign you In</Text>
                <Text style={styles.subTitle}>Welcome back</Text>
                <Text style={styles.subTitle}>You've been missed</Text>
                
            </View>
            <View style={styles.buttonView}>
                <View style={styles.inputView}>

                <View style={styles.inputContainer}>
                    <TextInput onChangeText={setEmail} value={email} keyboardType='email-address' placeholder='Email' />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput onChangeText={setPassword} value={password} secureTextEntry={true} placeholder='Password' />
                </View>
                </View>

                <Text style={styles.subTitle} >Don't have an account ?</Text>
                <TouchableOpacity onPress={()=>navigation.replace('Register')} ><Text style={styles.Title}>Register</Text></TouchableOpacity>
                <TouchableOpacity onPress={handleLogin} disabled={loading? true : false} style={styles.buttonContainer}>
                    {!loading ? <Text style={styles.buttonText}>Login</Text> :
                        <ActivityIndicator size={'small'} color={'white'} />}
                </TouchableOpacity>

            </View>
            <StatusBar barStyle={'dark-content'} backgroundColor={'lightyellow'} />
            </View>
        </KeyboardAwareScrollView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightyellow',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 50,
        height: Dimensions.get('screen').height-50
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
        marginBottom: 15
    }
});