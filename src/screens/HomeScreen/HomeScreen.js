import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function HomeScreen(props) {
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text>Home Page</Text>
            </View>
        </View>
    )
}
