import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './addSensorStyles';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../../../firebase/config'

export default function AddSensor(props) {

    const [sensorName, setSensorName] = useState('')
    const [sensorID, setSensorID] = useState('')
    const navigation = useNavigation();
    const uid = props.extraData.id

    const onAddSensorPress = () => {
        const data = {
            sensorName,
            sensorID
        };
        const usersRef = firebase.firestore().collection('users').doc(uid).collection('sensors')
        usersRef
            .doc(sensorName)
            .set(data)
            .then(() => {
                alert("Sensor added!")
                navigation.navigate("Login")
            })
            .catch((error) => {
                alert(error)
            });
    }
            
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
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