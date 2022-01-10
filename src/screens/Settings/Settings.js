import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { firebase } from '../../firebase/config'
import SettingsComponent from '../../components/SettingsComponent';


export default function Settings({navigation}) {
  
  //const navigation = useNavigation();
  const settingsOptions=[
    {title: 'Sensors', subTitle: 'Configure sensors', onPress: () => {}},
    {title: 'Personal Information', subTitle: 'Edit personal information', onPress: () => {}},
    {title: 'Reset Password', onPress: () => {}},
    {title: 'Logout', onPress: () => {
      navigation.navigate("Login")
    }}
  ]
  return <SettingsComponent settingsOptions={settingsOptions} />;
  
}