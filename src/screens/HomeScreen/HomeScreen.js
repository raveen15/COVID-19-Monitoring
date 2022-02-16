import React, { useEffect, useState, useRef } from "react";
import { ScrollView, FlatList, Keyboard,Button, Text, Alert, TextInput, StyleSheet, TouchableOpacity, View, Animated } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import {Card} from 'react-native-shadow-cards'
import {Picker} from '@react-native-picker/picker';
import { firebaseRealtime } from '../../firebase/configRealtime';
import { Ionicons } from '@expo/vector-icons';
import ProgressCircle from 'react-native-progress-circle';
import { useFonts } from 'expo-font';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLine, VictoryLabel } from "victory-native";
import Swiper from 'react-native-swiper' 

export default function HomeScreen(props) {

  const database = firebaseRealtime.app().database('https://real-time-covid-monitoring-default-rtdb.firebaseio.com/');

  const [sensor, setSensor] = useState(0);

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

  const anim = useRef(new Animated.Value(1));

  var hour = new Date().getHours();
  var greeting = " ";
  if (hour >= 16){
    greeting = "Good Evening, ";
  }
  else if (hour < 16 && hour >= 12){
    greeting = "Good Afternoon, ";
  }
  else if (hour < 12){
    greeting = "Good Morning, ";
  }

  var name = userData ? userData.fullName || '' : '';
  const names = name.split(' ');
  const firstName = names[0];
  // Listen to changes on the firebase database, specifically the "distance" entry
  useEffect(() => {
    const getValue = database.ref("/Sensor 1");
    getValue.on("value", snapshot => {
      let value = snapshot.val();
      setSensor(value);
    });

    // makes the sequence loop
    Animated.loop(
      // runs given animations in a sequence
      Animated.sequence([
        // increase size
        Animated.timing(anim.current, {
          toValue: 1.2, 
          duration: 200,
          useNativeDriver: true,
        }),
        // decrease size
        Animated.timing(anim.current, {
          toValue: 1, 
          duration: 200,
          useNativeDriver: true,
        }),
      ])
    ).start();

  }, []);

  const [selectedLanguage, setSelectedLanguage] = useState();

    // if ((sensor.oxygenLevel < 90) & (sensor.heartRate < 50)){
    //   Alert.alert("Both the blood oxygen level and the BPM is low")
    // }
    // else if ((sensor.oxygenLevel < 90)&(sensor.heartRate > 50)){
    //   Alert.alert("Low blood oxygen level")
    // }
    // else if ((sensor.oxygenLevel > 90)&(sensor.heartRate < 50)){
    //   Alert.alert("Low bpm")
    // }

    const heartdata =[
    { x: 1, y: 75 },
    { x: 2, y: 62 },
    { x: 3, y: 81 },
    { x: 4, y: 70 },
    { x: 5, y: 62 }
  ];

  const oxdata =[
    { x: 1, y: 98 },
    { x: 2, y: 75 },
    { x: 3, y: 88 },
    { x: 4, y: 99 },
    { x: 5, y: 71 }
  ];

    return (
      <ScrollView>
        <View style={styles.container}>
            <Text style={styles.nameText}>{greeting}{firstName}</Text>
            <Card>
            <View style={styles.heart}>
            <Animated.View style={{ transform: [{ scale: anim.current }], paddingLeft: 20, marginRight: 'auto'}}>
            <Ionicons name="md-heart" size={64} color="red" />
            </Animated.View>
            <Text style={styles.heartText}> Heart Rate: {sensor.heartRate}bpm</Text>
            </View>
            <View style={styles.slide1}>
                <VictoryChart domain={{y: [30, 190]}} height={200} width={390} theme={VictoryTheme.material}>
                  <VictoryLabel x={200} y={30} textAnchor="middle" style={{ fontWeight: 'bold' }}/>
                  <VictoryLine interpolation="natural" animate={{duration: 2000, onLoad: { duration: 1000}}} data={heartdata} x="x" y="y" />
                </VictoryChart>
            </View>
            </Card>
            <Text style={{padding: 10}}>    </Text>
            <Card>
            <View style={styles.progress}>
            <ProgressCircle
              percent={sensor.oxygenLevel}
              radius={50}
              borderWidth={8}
              color="#3399FF"
              shadowColor="#999"
              bgColor="#fff"
            >

            <Text style={{ fontSize: 18 }}>{sensor.oxygenLevel}%</Text>
        </ProgressCircle>
        <Text style={styles.oxygenText}>Blood Oxygen Level: {sensor.oxygenLevel}%</Text>
        </View>

          <View style={styles.slide2} showButtons={true}>
            <VictoryChart domain={{y: [0, 100]}} height={200} width={390} theme={VictoryTheme.material}>
              <VictoryLabel x={200} y={30} textAnchor="middle" style={{ fontWeight: 'bold' }}/>
              <VictoryLine interpolation="natural" animate={{duration: 2000, onLoad: { duration: 1000}}} data={oxdata} x="x" y="y" />
            </VictoryChart>
          
      </View>
      </Card>
      <Text style={{padding: 10}}>    </Text>

          <Card>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)

              }>
              <Picker.Item label="Sensor 1" value="sen1" />
              <Picker.Item label="Sensor 2" value="sen2" />
              <Picker.Item label="Sensor 3" value="sen3"/>
              <Picker.Item label="Sensor 4" value="sen4"/>

            </Picker>
          </Card>
        </View>
        </ScrollView>

      );
}