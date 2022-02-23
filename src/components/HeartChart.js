import React, {Component, useState, useEffect} from "react";
import { SnapshotViewIOSBase, StyleSheet, View } from "react-native";
import { VictoryChart, VictoryBar, VictoryPie, VictoryGroup, VictoryTheme, VictoryAxis, VictoryLine } from "victory-native";
import Svg from 'react-native-svg';
import { firebaseRealtime } from '/Users/jacksonlandry/COVID-19-Monitoring/src/firebase/configRealtime';

export default class Chart extends React.Component {

    constructor() {
        super();
        this.state = {
          data: [],
          startTime: null
        };
      }

    
      // Add a new data point every 5 seconds
      componentDidMount() {
        const database = firebaseRealtime.app().database('https://real-time-covid-monitoring-default-rtdb.firebaseio.com/');
        const startTime = new Date();
        const time = 0;
        const getValue = database.ref("/Sensor 1");
        getValue.on("value", snapshot => {
            let num = snapshot.val();
            this.setState({ data: [{ time, num }], startTime });
        });
       // this.setState({ data: [{ time, num }], startTime });

        setInterval(this.getRandNum, 5000);
      }
    
      // get rand num from 1-5 along with current time,
      // and add it to data. not sure if this is right approach
      getRandNum = () => {
        var ref = firebaseRealtime.database().ref("/Sensor 1");
        ref.on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot){
                const actualTime = new Date();
                var childData = childSnapshot.val();
                let num = childData.heartRate;
                let time = Math.round((actualTime - this.state.startTime) / 1000);
                this.setState({
                    data: [...this.state.data, { time, num }]
                });
            });
        });
        
      };
    
      render() {
        return (
          <VictoryChart width={600} height={470}>
            <VictoryAxis dependentAxis />
            <VictoryAxis
              tickFormat={t =>
                `${Math.floor(t / 60)}:${Math.round(t % 60)
                  .toString()
                  .padStart(2, "0")}`
              }
            />
            <VictoryLine
              style={{
                data: { stroke: "lime" }
              }}
              data={this.state.data}
              x="time"
              y="num"
            />
          </VictoryChart>
        );
      }
    }
