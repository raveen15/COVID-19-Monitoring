import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function Profile(props) {

    const uid = props.extraData.id
    var docRef = firebase.firestore().collection("users").doc(uid);
    const [userData, setUserData] = useState('');

    docRef.get().then((doc) => {
        if (doc.exists) {
            // console.log("Document data:", doc.data());
            setUserData(doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

    return (
        <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}}/>
          <View style={styles.body}>
            <Text style={styles.name}>{userData ? userData.fullName || '' : ''}</Text>
            <Text style={styles.description}>{userData ? userData.email || '' : ''}</Text>
            <Text style={styles.description}>{userData ? userData.address || '' : ''}</Text>
            <Text style={styles.description}>{userData ? userData.phoneNum || '' : ''}</Text>
            <Text style={styles.description}>{userData ? userData.dob || '' : ''}</Text>
            <Text style={styles.description}>{userData ? userData.healthCardNum || '' : ''}</Text>
        </View>
      </View>
    )
}