import React, {useState, useEffect, useRef} from 'react';
import { SafeAreaView, Animated, Text, TouchableOpacity, View, ScrollView, FlatList, ActivityIndicator } from 'react-native';

import { styles } from './styles'
import { LinearGradient } from 'expo-linear-gradient';
import { Feather,FontAwesome5, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardFlip from 'react-native-card-flip';

import CardTransaction from '../../components/CardTransaction';


import {useFocusEffect, useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParamList';
import { TransactionProps } from '../CardDetails';
import TabBarCustom from '../../components/TabBarCustom';

type DashboardScreenProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;


const collectionKey = '@mymoney:transactions';
export default function Dashboard() {
  const navigation = useNavigation<DashboardScreenProp>()
  const [ animate, setAnimate ] = useState(new Animated.Value(100))



  useEffect(() => navigation.addListener('blur', () => {
      Animated.timing(animate, {
        toValue: 1000,
        duration: 300,
        useNativeDriver: true
    }).start();
  }), []);


  

  useEffect(() => navigation.addListener('focus', () => {
    Animated.timing(animate, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
    
    
  }), []);


  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={{
          flex:1,
          transform:[
              {translateX: animate}
          ]
      }}
      >
        <LinearGradient
          style={{
            flex:1,
            paddingVertical: 60, 
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
          colors={['#FFF', '#E5E5E5']}
        >
     
          
          </LinearGradient>
        </Animated.View>
      </SafeAreaView>
  );
}

