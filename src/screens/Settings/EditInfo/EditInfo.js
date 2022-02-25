import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './editInfoStyles';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../../firebase/config'

export default function EditInfo(props) {
    
    const uid = props.extraData.id
    var docRef = firebase.firestore().collection("users").doc(uid);
    const [userData, setUserData] = useState('');
    const navigation = useNavigation();

    const getUser = async() => {
        const currentUser = await firebase.firestore()
        .collection('users')
        .doc(uid)
        .get()
        .then((documentSnapshot) => {
        if( documentSnapshot.exists ) {
            console.log('User Data', documentSnapshot.data());
            setUserData(documentSnapshot.data());
        }
        })
    }

    useEffect(() => {
        getUser();
        return () => {
            setState({}); // This worked for me
        };
    }, []);
    

    const onSaveInformation = () => {

        firebase.firestore()
            .collection('users')
            .doc(uid)
            .update({
                fullName: userData.fullName,
                address: userData.address,
                phoneNum: userData.phoneNum,
                dob: userData.dob,
                healthCardNum: userData.healthCardNum
            })
            .then(() => {
                console.log('User information updated!');
                alert(
                    'Profile Updated!',
                    'Your profile has been updated successfully.'
                );
            });
    }

    return (
        <View style={styles.container}>
        <View style={styles.title}/>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    defaultValue={userData ? userData.fullName : ''}
                    onChangeText={(txt) => setUserData({...userData, fullName: txt})}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Address'
                    placeholderTextColor="#aaaaaa"
                    defaultValue={userData ? userData.address : ''}
                    onChangeText={(txt) => setUserData({...userData, address: txt})}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Phone Number'
                    placeholderTextColor="#aaaaaa"
                    defaultValue={userData ? userData.phoneNum : ''}
                    onChangeText={(txt) => setUserData({...userData, phoneNum: txt})}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Date of Birth'
                    placeholderTextColor="#aaaaaa"
                    defaultValue={userData ? userData.dob : ''}
                    onChangeText={(txt) => setUserData({...userData, dob: txt})}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Health Card Number'
                    placeholderTextColor="#aaaaaa"
                    defaultValue={userData ? userData.healthCardNum : ''}
                    onChangeText={(txt) => setUserData({...userData, healthCardNum: txt})}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onSaveInformation()}>
                    <Text style={styles.buttonTitle}>Save Personal Information</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}
