import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './styles';

import { Entypo, Feather, Foundation } from '@expo/vector-icons'

import {useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../screens/RootStackParamList';


type TabBarBottomProp = StackNavigationProp<RootStackParamList, 'TabBarBottom'>;

export default function TabBarCustom({item, logo}: any) {
  const navigation = useNavigation<any>();

  const [ tintColorPrincipal, setTintColorPrincipal ] = useState(false)
  const [ tintColorDashboard, setTintColorDashboard ] = useState(false)
  const [ tintColorFabButton, setTintColorFabButton ] = useState(false) /*#6AC694 */

  const handleGoPage = (screenName: any) => {
    navigation.navigate(screenName)
    toggleTintColorIcon()

  };

  useEffect(() =>{
    toggleTintColorIcon()
  },[])

  useEffect(() =>{
    toggleTintColorIcon()
  },[tintColorFabButton, tintColorDashboard, tintColorPrincipal])

  function toggleTintColorIcon(){
    if(navigation.getCurrentRoute().name === "NewTransaction"){
      setTintColorFabButton(true)
    }else{
      setTintColorFabButton(false)
    }
    
    if(navigation.getCurrentRoute().name === "Dashboard"){
      setTintColorDashboard(true)
    }else{
      setTintColorDashboard(false)
    }
    
    if(navigation.getCurrentRoute().name === "Principal"){
      setTintColorPrincipal(true)
    }else{
      setTintColorPrincipal(false)
    }
  }

  return (
    <>
      <View style={styles.tabArea}>
        <TouchableOpacity style={styles.tabItem} onPress={() => handleGoPage('Principal')}>
          <Foundation name="list" size={24} color={tintColorPrincipal ? "#6AC694" : "#364869"} />
        </TouchableOpacity>

        
          <TouchableOpacity
            onPress={() => handleGoPage('NewTransaction')}
            activeOpacity={1}
            style={[styles.tabItemCenter, {backgroundColor:  tintColorFabButton ? "#6AC694" : "#364869"}]}
          >
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 60,
              height: 60,
              borderRadius: 40
            }}>
              <Feather name="plus" size={20} color="#FFF" style={{zIndex: 1}}/>
            </View>

          </TouchableOpacity>
        

        <TouchableOpacity style={styles.tabItem}  onPress={() => handleGoPage('Dashboard')} >
          <Entypo name="bar-graph" size={24} color={tintColorDashboard ? "#6AC694" : "#364869"} />
        </TouchableOpacity>
      </View>
    </>
  );
}
