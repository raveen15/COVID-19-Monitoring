import React, {Component, useState, useEffect} from "react";
import { SnapshotViewIOSBase, StyleSheet, View } from "react-native";
import { VictoryChart, VictoryBar, VictoryPie, VictoryGroup, VictoryTheme, VictoryAxis, VictoryLine } from "victory-native";
import Svg from 'react-native-svg';
import { firebaseRealtime } from '/Users/jacksonlandry/COVID-19-Monitoring/src/firebase/configRealtime';
import styles from "../screens/HomeScreen/styles";

export default class OxChart extends React.Component {

    constructor() {
        super();
        this.state = {
          data: [],
          startTime: null
        };
      }

    
      // Add a new data point every 5 seconds
      componentDidMount() {
        const startTime = new Date();
        const time = 0;
        const num = 90;

        this.setState({ data: [{ time, num }], startTime });

        setInterval(this.getRandNum, 5000);
      }
    
      // get rand num from 1-5 along with current time,
      // and add it to data. not sure if this is right approach
      getRandNum = () => {
        const database = firebaseRealtime.app().database('https://real-time-covid-monitoring-default-rtdb.firebaseio.com/');
        var ref = database.ref("/Sensor 1");
        ref.on("value", snapshot => {
          const actualTime = new Date();
          var data = snapshot.val();
          let num = data.oxygenLevel;
          console.log(num)
          let time = Math.round((actualTime - this.state.startTime) / 1000);
          this.setState({
              data: [...this.state.data, { time, num }]
          });
        });
      };
    
      render() {
        return (
          <VictoryChart domain={{y: [0, 120]}} width={390} height={200} theme={VictoryTheme.material}>
            <VictoryAxis dependentAxis />
            <VictoryAxis
              tickFormat={t =>
                `${Math.floor(t / 60)}:${Math.round(t % 60)
                  .toString()
                  .padStart(2, "0")}`
              }
            />
            <VictoryLine
              interpolation="cardinal"
              animate={{duration: 2000, onLoad: { duration: 1000}}}
              data={this.state.data}
              x="time"
              y="num"
            />
          </VictoryChart>
        );
      }
    }
