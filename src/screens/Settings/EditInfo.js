import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './editInfoStyles';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../firebase/config'

export default function EditInfo(props) {
    var fullName = props.extraData.fullName
    var email = props.extraData.email
    var address = props.extraData.address
    var phoneNum = props.extraData.phoneNum
    var dob = props.extraData.dob
    var healthCardNum = props.extraData.healthCardNum

    const [fullNameChange, setFullNameChange] = useState('');
    const [emailChange, setEmailChange] = useState('');
    const [addressChange, setAddressChange] = useState('');
    const [phoneNumChange, setPhoneNumChange] = useState('');
    const [dobChange, setDobChange] = useState('');
    const [healthCardNumChange, sethealthCardNumChange] = useState('');

    const uid = props.extraData.id
    const navigation = useNavigation(); 

    const onSaveInformation = () => {
        firebase.firestore()
            .collection('users')
            .doc(uid)
            .update({
                fullName: fullNameChange,
                email: emailChange,
                address: addressChange,
                phoneNum: phoneNumChange,
                dob: dobChange,
                healthCardNum: healthCardNumChange
            })
            .then(() => {
                console.log('User information updated!');
            });
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    defaultValue={fullName}
                    onChangeText={(text) => setFullNameChange(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Address'
                    placeholderTextColor="#aaaaaa"
                    defaultValue={address}
                    onChangeText={(text) => setAddressChange(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Phone Number'
                    placeholderTextColor="#aaaaaa"
                    defaultValue={phoneNum}
                    onChangeText={(text) => setPhoneNumChange(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Date of Birth'
                    placeholderTextColor="#aaaaaa"
                    defaultValue={dob}
                    onChangeText={(text) => setDobChange(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Health Card Number'
                    placeholderTextColor="#aaaaaa"
                    defaultValue={healthCardNum}
                    onChangeText={(text) => sethealthCardNumChange(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    defaultValue={email}
                    onChangeText={(text) => setEmailChange(text)}
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
