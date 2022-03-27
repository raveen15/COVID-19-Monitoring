import React from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { StyleSheet, ScrollView } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLine, VictoryLabel } from "victory-native";
import Swiper from 'react-native-swiper'
import  BigHeart  from '../../components/BigHeart';
import  BigOx  from '../../components/BigOx';


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Swiper style={styles.wrapper} showButtons={true}>
          <View style={styles.slide1}>
            <BigHeart></BigHeart>
          </View>
          <View style={styles.slide2} showButtons={true}>
            <BigOx></BigOx>
          </View>
        </Swiper>
      </View>
    );
  }
}