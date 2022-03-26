import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './addSensorStyles';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../../../firebase/config'

var incrementSensor = 0

export default function AddSensor(props) {

    const [sensorName, setSensorName] = useState('')
    const [sensorID, setSensorID] = useState('')
    const navigation = useNavigation();
    const uid = props.extraData.id
    

    const onAddSensorPress = () => {
        incrementSensor++;
        const data = {
            sensorName,
            sensorID,
            incrementSensor
        };
        const usersRef = firebase.firestore().collection('users').doc(uid).collection('sensors')
        usersRef 
            .doc(incrementSensor.toString())
            .set(data)
            .then(() => {
                alert("Success!", "Sensor added! Please login again.")
                navigation.navigate("Login")
            })
            .catch((error) => {
                alert(error)
            });
    }
            
    return (
        <View style={styles.container}>
        <View style={styles.title}/>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%', backgroundColor: 'white'}}
                keyboardShouldPersistTaps="always">
                <TextInput
                    style={styles.input}
                    placeholder='Sensor Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setSensorName(text)}
                    value={sensorName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Sensor ID'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setSensorID(text)}
                    value={sensorID}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {/* <Text>{props.extraData.id}</Text> */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onAddSensorPress()}>
                    <Text style={styles.buttonTitle}>Add Sensor</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}
