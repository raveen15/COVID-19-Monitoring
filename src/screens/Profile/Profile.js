import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function Profile(props) {
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text>Profile</Text>
            </View>
        </View>
    )
}
