import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function Profile(props) {

    var fullName = props.extraData.fullName
    var email = props.extraData.email
    var address = props.extraData.address
    var phoneNum = props.extraData.phoneNum
    var dob = props.extraData.dob
    var healthCardNum = props.extraData.healthCardNum


    return (
        <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}}/>
          <View style={styles.body}>
            <Text style={styles.name} defaultValue={fullName}>{fullName}</Text>
            <Text style={styles.description}>{email}</Text>
            <Text style={styles.description}>{address}</Text>
            <Text style={styles.description}>{phoneNum}</Text>
            <Text style={styles.description}>{dob}</Text>
            <Text style={styles.description}>{healthCardNum}</Text>
        </View>
      </View>
    )
}