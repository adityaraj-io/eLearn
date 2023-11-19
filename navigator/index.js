import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from '../screens/LoginScreen';
import StartScreen from '../screens/StartScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TabNavigator from './TabNavigator';
import EBookInfo from '../screens/EBookInfo';
import EditProfile from '../screens/EditProfile';
import AudioBookInfo from '../screens/AudioBookInfo';


const Stack = createNativeStackNavigator();

const Navigator = () => {
 
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={'Start'}>
            <Stack.Screen name='Start' component={StartScreen} options={{headerShown: false}} />
            <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}} />
            <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown: false}} />
            <Stack.Screen name='Main' component={TabNavigator} options={{headerShown: false}} />
            <Stack.Screen name='EBookInfo' component={EBookInfo} options={{headerShown: true, headerTitle: ''}} />
            <Stack.Screen name='AudioBookInfo' component={AudioBookInfo} options={{headerShown: true, headerTitle: ''}} />
            <Stack.Screen name='EditProfile' component={EditProfile} options={{headerShown: true, headerTitle: 'Edit Profile'}} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}


export default Navigator
