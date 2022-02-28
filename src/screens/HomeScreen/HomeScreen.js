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
import  Chart  from '../../components/HeartChart';
import  OxChart  from '../../components/OxChart';

export default function HomeScreen(props) {

  const database = firebaseRealtime.app().database('https://real-time-covid-monitoring-default-rtdb.firebaseio.com/');

  const [sensor, setSensor] = useState('')

  const uid = props.extraData.id
    var docRef = firebase.firestore().collection("users").doc(uid);
    const [userData, setUserData] = useState('');

    docRef.get().then((doc) => {
        if (doc.exists) {
            // console.log("Document data:", doc.data());
            setUserData(doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such userData document!");
        }
    }).catch((error) => {
        console.log("Error getting userData document:", error);
    });

    /*
    * Code to retrieve sensor data
    * For picker and topic name from sensor ID
    */
    const [sensorInfo, setSensorInfo] = useState([]);
    
    const renderSensorInfo = () => {
      const collectIdsAndDocs = (doc) => {
        return { id: doc.id, ...doc.data() };
      };
    
      useEffect(() => {
        const getSensor = async () => {
          const snapshot = await firebase.firestore().collection("users").doc(uid).collection('sensors').get();
          const mySensorList = snapshot.docs.map(collectIdsAndDocs);
          setSensorInfo(mySensorList);
        };
        getSensor();
      }, []);

      return sensorInfo.map((key) => {
            return <Picker.Item label={key.sensorName.toString()} value={key.sensorID.toString()} key={key.sensorID.toString()}/>
      });
      
    };

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
  const [selectedSensor, setSelectedSensor] = useState('');
  // console.log(sensor)

  var name = userData ? userData.fullName || '' : '';
  const names = name.split(' ');
  const firstName = names[0];
  // Listen to changes on the firebase database, specifically the "distance" entry
  useEffect(() => {
    const getSensorValue = async () => {
      const getValue = await database.ref(selectedSensor.toString());
      getValue.on("value", snapshot => {
        let value = snapshot.val();
        setSensor(value);
        // if ((sensor.oxygenLevel < 90) & (sensor.heartRate < 50)){
        //   Alert.alert("Both the blood oxygen level and the BPM is low")
        // }
        // else if ((sensor.oxygenLevel < 90) & (sensor.heartRate > 50)){
        //   Alert.alert("Low blood oxygen level")
        // }
        // else if ((sensor.oxygenLevel > 90) & (sensor.heartRate < 50)){
        //   Alert.alert("Low bpm")
        // }
      });
    }

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

    getSensorValue();

  }, [selectedSensor, sensor.heartRate]);


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
                <Chart></Chart>
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
            <OxChart></OxChart>
          </View>
      </Card>
      <Text style={{padding: 10}}/>
          <Card>
          <Picker
            selectedValue={selectedSensor}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedSensor(itemValue);
            }}>
            {renderSensorInfo()}
          </Picker>
          </Card>
        </View>
        </ScrollView>

      );
}