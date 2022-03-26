import React, { useEffect, useState, useRef } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Picker} from '@react-native-picker/picker';
import styles from './editSensorStyles';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../../../firebase/config'

export default function EditSensor(props) {

    const uid = props.extraData.id
    const [sensorInfo, setSensorInfo] = useState([]);
    const navigation = useNavigation();

    const renderSensorInfo = () => {
        const collectIdsAndDocs = (doc) => {
          return { id: doc.id, ...doc.data() };
        };
      
        useEffect(() => {
          const getSensor = async () => {
            const snapshot = await firebase.firestore().collection("users").doc(uid).collection('sensors').get('sensorName');
            const mySensorList = snapshot.docs.map(collectIdsAndDocs);
            setSensorInfo(mySensorList);
            
          };
          getSensor();
        }, []);
  
        return sensorInfo.map((key) => {
              return <Picker.Item label={key.sensorName.toString()} value={key.incrementSensor.toString()} key={key.sensorID.toString()}/>
        });
        
      };

      // console.log(sensorInfo)

    const [selectedSensor, setSelectedSensor] = useState('');

    const deleteSensorAction = () => {
      firebase.firestore()
      .collection("users")
      .doc(uid)
      .collection('sensors')
      .doc(selectedSensor.toString())
      .delete()
      .then(() => {
        console.log('Sensor deleted!');
        alert("Success!", "Sensor deleted! Please login again.")
        navigation.navigate("Login")
      });
      // console.log(selectedSensor.toString())
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Picker
                style={{ marginTop: 100, width: '80%'}}
                    selectedValue={selectedSensor}
                    onValueChange={(itemValue, itemIndex) => {
                    setSelectedSensor(itemValue);
                }}>
                    {renderSensorInfo()}
                </Picker>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => deleteSensorAction()}>
                    <Text style={styles.buttonTitle}>Delete Sensor</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}
