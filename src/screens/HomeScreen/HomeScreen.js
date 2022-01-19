import React, { useState } from "react";
import { FlatList, Keyboard,Button, Text, Alert, TextInput, StyleSheet, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import {Card} from 'react-native-shadow-cards'
import {Picker} from '@react-native-picker/picker';
export default function HomeScreen(props) {
  const [selectedLanguage, setSelectedLanguage] = useState();
    var bol = 95;
    var bpm = 90;

    if ((bol <90) & (bpm < 65)){
      Alert.alert("Both the blood oxygen level and the BPM is low")
    }
    else if ((bol < 90)&(bpm > 65)){
      Alert.alert("Low blood oxygen level")
    }
    else if ((bol > 90)&(bpm < 65)){
      Alert.alert("Low bpm")
    }


    return (
        <View style={styles.container}>
          <Card style={{padding: 10, margin: 10}}>
            <Text>Blood Oxygen Level {bol}%</Text>
          </Card>
          <Card style={{padding: 10, margin: 10, height: 50}}>
            <Text> HeartBeat {bpm}bpm</Text>
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