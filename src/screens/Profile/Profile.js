import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Image, ProgressBarAndroidComponent } from 'react-native'
import { Card, Button, Icon } from 'react-native-elements';
import styles from './styles';
import { firebase } from '../../firebase/config'
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}}/>
          <View style={styles.body}>

          <Card containerStyle={{ marginTop: 30 }}>
            <View style={styles.cardView}>
                <Icon name='person' size={40}/>
                <Text style={styles.cardContent}>
                {userData ? userData.fullName || '' : ''}
                </Text>
            </View>
          </Card>

          <Card containerStyle={{ marginTop: 10 }}>
            <View style={styles.cardView}>
                <Icon name='mail' size={40}/>
                <Text style={styles.cardContent}>
                {userData ? userData.email || '' : ''}
                </Text>
            </View>
          </Card>

          <Card containerStyle={{ marginTop: 10 }}>
            <View style={styles.cardView}>
                <Icon name='house' size={40}/>
                <Text style={styles.cardContent}>
                {userData ? userData.address || '' : ''}
                </Text> 
            </View>
          </Card>

          <Card containerStyle={{ marginTop: 10 }}>
            <View style={styles.cardView}>
                <Icon name='phone' size={40}/>
                <Text style={styles.cardContent}>
                {userData ? userData.phoneNum || '' : ''}
                </Text>
            </View>
          </Card>

          <Card containerStyle={{ marginTop: 10 }}>
            <View style={styles.cardView}>
              <FontAwesome name='birthday-cake' size={40}/>
                <Text style={styles.cardContent}>
                {userData ? userData.dob || '' : ''}
                </Text>
            </View>
          </Card>

          <Card containerStyle={{ marginTop: 10 }}>
            <View style={styles.cardView}>
            <FontAwesome name='id-card' size={40}/>
                <Text style={styles.cardContent}>
                {userData ? userData.healthCardNum || '' : ''}
                </Text>
            </View>
          </Card>
        </View>
      </View>
      </ScrollView>
    )
}