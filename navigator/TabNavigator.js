import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Image, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {

  const navigation = useNavigation();
  return (
    <>
    <Tab.Navigator
        screenOptions={({route})=>({

            tabBarIcon: ({focused, color, size}) =>{
                if(route.name==='Home'){
                  if(focused){
                    return <Image source={require(`../assets/images/home.png`)} style={{height: size, width: size, tintColor: color}}/>
                  }else{
                    return <Image source={require(`../assets/images/home-alt.png`)} style={{height: size, width: size, tintColor: color}}/>
                  }
                }else if(route.name === 'Profile' || route.name==='Dash'){
                  if(focused){
                    return <Image source={require(`../assets/images/user.png`)} style={{height: size, width: size, tintColor: color}}/>

                  }else{
                    return <Image source={require(`../assets/images/user-alt.png`)} style={{height: size, width: size, tintColor: color}}/>

                  }

                }
            },
            tabBarActiveTintColor: '#DAA520',
            // tabBarInactiveTintColor: '#DAA520',
            headerShown: false,
            
            tabBarStyle: {
                backgroundColor: '#fff',
                height: 60,
                
            },
            headerTitleAlign: 'left', 
   
    headerLeft: () => (
      <TouchableOpacity
        style={{
          // paddingHorizontal: 20,
          padding: 10,
          marginHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#EFF3F6',
          borderRadius: 50
        }}
        onPress={()=>navigation.navigate('Profile')}
      >
        <Image source={require('../assets/images/menu.png')} tintColor={'black'} style={{width: 18, height: 18}} />
      </TouchableOpacity>
    )
        })}
    >
      <Tab.Screen name='Home' component={HomeScreen} options={{headerShown: true, headerTitle: 'All Books', 
    }} />
      <Tab.Screen name='Profile' component={ProfileScreen} 
        options={{headerTitle: 'Profile', headerShown: true, headerTitleAlign: 'left',
      }}
      />

      {/* <Tab.Screen name='Dash' component={ProfileScreen} options={{headerShown: true}}/> */}
    </Tab.Navigator>
    
    </>
  )
}

export default TabNavigator
