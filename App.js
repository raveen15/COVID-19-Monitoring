import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, View, Image, TouchableOpacity} from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { firebase } from './src/firebase/config'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen, Settings, Profile, DataHistory } from './src/screens'
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  if (loading) {
    return (
      <></>
    )
  }

  function HomeTabs(){
    return(
      <Tab.Navigator initialRouteName = "Home">
        <>
          <Tab.Screen name="Home" component={HomeScreen}
          options={{
                    tabBarIcon: ({focused}) => (
                        <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={require('./assets/home.png')}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? '#FFFFFF' : '#FFFFFF',
                                }}
                            />
                        </View>   
                    ),
                }}
          />
          <Tab.Screen name="Data History" component={DataHistory}
          options={{
                    tabBarIcon: ({focused}) => (
                        <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={require('./assets/history.png')}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? '#FFFFFF' : '#FFFFFF',
                                }}
                            />
                        </View>   
                    ),
                }} 
          />
          <Tab.Screen name="Profile" component={Profile}
          options={{
                    tabBarIcon: ({focused}) => (
                        <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={require('./assets/profile.png')}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? '#FFFFFF' : '#FFFFFF',
                                }}
                            />
                        </View>   
                    ),
                }}
          />
          <Tab.Screen name="Settings" component={Settings}
          options={{
                    tabBarIcon: ({focused}) => (
                        <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={require('./assets/settings.png')}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? '#FFFFFF' : '#FFFFFF',
                                }}
                            />
                        </View>   
                    ),
                }}
          />
        </>
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="COVID-19 Monitoring" component={HomeTabs}/>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
