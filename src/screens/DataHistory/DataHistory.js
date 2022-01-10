import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function DataHistory(props) {

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text>Data History</Text>
            </View>
        </View>
    )
}
