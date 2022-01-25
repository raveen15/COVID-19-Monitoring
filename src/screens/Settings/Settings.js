import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { firebase } from '../../firebase/config'
import SettingsComponent from '../../components/SettingsComponent';


export default function Settings(props) {

  const email = props.extraData.email
  const userID = props.extraData.id
  const navigation = useNavigation(); 

  const settingsOptions=[
    {title: 'Sensors', subTitle: 'Configure sensors', onPress: () => {
      navigation.navigate("Sensor Configuration")
    }},
    {title: 'Personal Information', subTitle: 'Edit personal information', onPress: () => {
      navigation.navigate("Edit Personal Information")
    }},
    {title: 'Reset Password', onPress: () => {
      firebase.auth().sendPasswordResetEmail(email)
        .then(function () {
        alert('Password reset link has been sent to your email!')
      }).catch(function (e) {
        console.log(e)
      })
    }},
    {title: 'Logout', onPress: () => {
      navigation.navigate("Login")
    }}
  ]
  return (
  <>
  <View style={{marginTop: 50}}/>
    <SettingsComponent settingsOptions={settingsOptions} />
  </>
  );
}