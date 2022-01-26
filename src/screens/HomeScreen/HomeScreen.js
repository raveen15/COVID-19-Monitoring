import React, { useEffect, useState, useRef } from "react";
import { FlatList, Keyboard,Button, Text, Alert, TextInput, StyleSheet, TouchableOpacity, View, Animated } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import {Card} from 'react-native-shadow-cards'
import {Picker} from '@react-native-picker/picker';
import { firebaseRealtime } from '../../firebase/configRealtime';
import { Ionicons } from '@expo/vector-icons';
import ProgressCircle from 'react-native-progress-circle'


export default function HomeScreen(props) {

  const database = firebaseRealtime.app().database('https://real-time-covid-monitoring-default-rtdb.firebaseio.com/');

  const [sensor, setSensor] = useState(0);

  const anim = useRef(new Animated.Value(1));

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

    if ((sensor.oxygenLevel < 90) & (sensor.heartRate < 50)){
      Alert.alert("Both the blood oxygen level and the BPM is low")
    }
    else if ((sensor.oxygenLevel < 90)&(sensor.heartRate > 50)){
      Alert.alert("Low blood oxygen level")
    }
    else if ((sensor.oxygenLevel > 90)&(sensor.heartRate < 50)){
      Alert.alert("Low bpm")
    }


    return (
        <View style={styles.container}>
            <Animated.View style={{ transform: [{ scale: anim.current }] }}>
            <Ionicons name="md-heart" size={64} color="red" />
            </Animated.View>
            <Text style={styles.heartText}> Heart Rate: {sensor.heartRate}bpm</Text>
            <ProgressCircle
            percent={sensor.oxygenLevel}
            radius={50}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff"
            marginTop="70"
        >
            <Text style={{ fontSize: 18 }}>{sensor.oxygenLevel}%</Text>
        </ProgressCircle>

            <Text style={styles.oxygenText}>Blood Oxygen Level: {sensor.oxygenLevel}%</Text>

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

      );
}