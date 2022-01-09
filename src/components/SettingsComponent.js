import React from 'react';
import {View, Text, Alert} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import colors from '../../assets/theme/colors';
import Container from './Container/index'



const SettingsComponent = ({settingsOptions}) => {
  const navigation = useNavigation();
  return(
    <ScrollView style={{backgroundColor: colors.white}}>
      {settingsOptions.map(({title, subTitle, onPress}, index) => (
        <TouchableOpacity key={title} onPress={onPress}>
          <View style= {{
            paddingHorizontal: 20,
            paddingBottom: 20,
            paddingTop: 20,
          }}>
            <Text style={{fontSize: 17}}>{title}</Text>
            {subTitle && <Text style={{fontSize: 14, opacity: 0.5, color:colors.black, paddingTop: 5}}>{subTitle}</Text>}
          </View>

          <View style={{height: 0.5, backgroundColor: colors.grey}}/>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

export default SettingsComponent;