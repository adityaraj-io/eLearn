import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity, Dimensions, TextInput, ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const profilePictureWidth = Dimensions.get("window").width * 0.4;
import HR from '../components/HR'
import { getAuth } from 'firebase/auth';
import ProgressBarModal from '../components/ProgressBarModal'
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref,onValue, update } from 'firebase/database';
import { FirebaseApp } from '../firebaseConfig';

const EditProfile = () => {

    
    const auth = getAuth();
   
    const [email, setEmail] = useState(auth.currentUser.email.toString());
    const [profileData, setProfileData] = useState({about: 'please Wait..', username: 'please Wait..', age: 'please Wait..'});
    const [userName, setUserName] = useState('')
    const [age, setAge] = useState('');
    const [about, setAbout] = useState('')
    const navigation = useNavigation();
    const database = getDatabase(FirebaseApp);
    const [isSaved, setIsSaved] = useState(false)

    const [loading, setLoading] = useState(true)
 
    useEffect(()=>{
      const profileRef = ref(database, `users/${auth.currentUser.uid}`)
      onValue(profileRef, async(snapshot)=>{
        const data = await snapshot.val();
        if(data!==null){
          setProfileData(data)
          setAbout(data.about)
          setAge(data.age)
          setUserName(data.username)
          setLoading(false)
          // console.log(data)
        }else{
          console.log('null')
        }
      })
      
    },[])

    const handleUpdate = () => {
      const profileRef = ref(database, `users/${auth.currentUser.uid}`)
      if(userName===''||age===""||about===''){
        alert('Please Fill up all fields!')
      }else{
        setIsSaved(true)
        const data = {
          username: userName,
          age: age,
          about: about,
          email: email,
        }
        update(profileRef, data).then(()=>{
          setIsSaved(false)
          alert('Changes Saved!')
        }).catch((error)=>{
          alert(error.message)
          setIsSaved(false)
        })
      }
      
    }

  return (
    <KeyboardAwareScrollView >
      <View style={styles.container}>
        <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 28, fontWeight: 'bold', textAlign:'center'}}>Your Profile Details</Text>
          <HR width={'70%'} />
        <View style={styles.inputView}>
            <View style={styles.inputText}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Name</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput value={userName} onChangeText={setUserName} placeholder='Name' maxLength={12} />
            </View>
        </View>

        <View style={styles.inputView}>
            <View style={styles.inputText}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Email - (Cannot be Updated)</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput editable={false} value={email} onChangeText={setEmail} placeholder='Email'  />
            </View>
        </View>

        <View style={styles.inputView}>
            <View style={styles.inputText}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Age</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput value={age} onChangeText={setAge} placeholder='Age'  />
            </View>
        </View>

        <View style={styles.inputView}>
            <View style={styles.inputText}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>About</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput value={about} multiline onChangeText={setAbout} placeholder='About'  />
            </View>
        </View>
        
        </View>
        
        <View style={{ width: '100%' }}>
          <TouchableOpacity disabled={isSaved} onPress={handleUpdate} style={styles.buttonContainer}>
            {!isSaved? <Text style={styles.buttonText}>Save Changes</Text>:
            <ActivityIndicator size={'small'} color={'#fff'} />}
          </TouchableOpacity>
        </View>

        <StatusBar style='dark' backgroundColor={'#fff'} />
        <ProgressBarModal visible={loading} />
      </View>

    </KeyboardAwareScrollView>
  )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#fff',
      justifyContent: 'space-between',
      height: Dimensions.get('window').height-Dimensions.get('window').height/12,
      padding: 20,
    },
    profileImage: {
      width: profilePictureWidth,
      height: profilePictureWidth,
      backgroundColor: 'lightgray',
      borderWidth: 5,
      borderColor: 'white',
      borderRadius: 250
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
   
    buttonText: {
      color: 'white',
    },
    inputView: {
        width: '100%'
    },
    inputContainer: {
        width: '100%',
        padding: 15,
        backgroundColor: '#D3D3D3',
        borderRadius: 10,
    },
    inputText: {
        width: '100%',
        paddingHorizontal: 7,
        paddingVertical: 5,
    }
})
  