import React, { useEffect, useState } from "react";
import { FlatList, Keyboard,Button, Text, Alert, TextInput, StyleSheet, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import {Card} from 'react-native-shadow-cards'
import {Picker} from '@react-native-picker/picker';
import { firebaseRealtime } from '../../firebase/configRealtime';


export default function HomeScreen(props) {

  const database = firebaseRealtime.app().database('https://real-time-covid-monitoring-default-rtdb.firebaseio.com/');

  const [sensor, setSensor] = useState(0);

  // Listen to changes on the firebase database, specifically the "distance" entry
  useEffect(() => {
    const getValue = database.ref("/Sensor 1");
    getValue.on("value", snapshot => {
      let value = snapshot.val();
      setSensor(value);
    });
  }, []);

  const [selectedLanguage, setSelectedLanguage] = useState();

    if ((sensor.oxygenLevel < 90) & (sensor.heartRate < 65)){
      Alert.alert("Both the blood oxygen level and the BPM is low")
    }
    else if ((sensor.oxygenLevel < 90)&(sensor.heartRate > 65)){
      Alert.alert("Low blood oxygen level")
    }
    else if ((sensor.oxygenLevel > 90)&(sensor.heartRate < 65)){
      Alert.alert("Low bpm")
    }


    return (
        <View style={styles.container}>
          <Card style={{padding: 10, margin: 10}}>
            <Text>Blood Oxygen Level {sensor.oxygenLevel}%</Text>
          </Card>
          <Card style={{padding: 10, margin: 10, height: 50}}>
            <Text> HeartBeat {sensor.heartRate}bpm</Text>
          </Card>

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