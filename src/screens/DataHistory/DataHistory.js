import React from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { StyleSheet, ScrollView } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLine, VictoryLabel } from "victory-native";
import Swiper from 'react-native-swiper'
const heartdata =[
    { x: 1, y: 75 },
    { x: 2, y: 62 },
    { x: 3, y: 81 },
    { x: 4, y: 70 },
    { x: 5, y: 62 }
];

const oxdata =[
    { x: 1, y: 98 },
    { x: 2, y: 75 },
    { x: 3, y: 88 },
    { x: 4, y: 99 },
    { x: 5, y: 71 }
];

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Swiper style={styles.wrapper} showButtons={true}>
          <View style={styles.slide1}>
                <VictoryChart domain={{y: [0, 200]}} height={650} width={390} theme={VictoryTheme.material}>
                  <VictoryLabel text="Heart Rate" x={200} y={30} textAnchor="middle" style={{ fontWeight: 'bold' }}/>
                  <VictoryLine interpolation="natural" animate={{duration: 2000, onLoad: { duration: 1000}}} data={heartdata} x="x" y="y" />
                </VictoryChart>
          </View>
          <View style={styles.slide2} showButtons={true}>
            <VictoryChart domain={{y: [0, 100]}} height={650} width={390} theme={VictoryTheme.material}>
              <VictoryLabel text="Blood Oxygen Level" x={200} y={30} textAnchor="middle" style={{ fontWeight: 'bold' }}/>
              <VictoryLine interpolation="natural" animate={{duration: 2000, onLoad: { duration: 1000}}} data={oxdata} x="x" y="y" />
            </VictoryChart>
          </View>
        </Swiper>
      </View>
    );
  }
}