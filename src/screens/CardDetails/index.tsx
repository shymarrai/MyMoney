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
import { TransactionProps } from '../NewTransaction';
import TabBarCustom from '../../components/TabBarCustom';

type CardDetailsScreenProp = StackNavigationProp<RootStackParamList, 'CardDetails'>;


const collectionKey = '@mymoney:transactions';
export default function CardDetails() {
  const navigation = useNavigation<CardDetailsScreenProp>()
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
            flex: 1,
            alignItems: 'center',
            
        }}
          colors={['#FFF', '#E5E5E5']}
        >
          <LinearGradient
            style={{
              height: 250,
              paddingHorizontal: 12,
              width: '100%',
              paddingVertical: 60, 
              justifyContent: 'flex-start',
          }}
          colors={['#e37c91' , '#E94A65']}
            // colors={['#7CE3B1', '#7CC4B1']}
          >
            <View style={{flex: 1, width: '100%'}}>
              <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontFamily: 'Inter_400Regular', fontSize: 18, textAlign: 'right', color: '#FFF'}}>
                    Casa
                  </Text>
                  <TouchableOpacity style={{backgroundColor: '#FFF', marginHorizontal: 10,alignItems: 'center', justifyContent: 'center', borderRadius: 100, width: 60, height: 60}}>
                    <Feather name={"home"} color="#FAE043" size={30}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{alignSelf: 'flex-start', bottom: -25}}>
              <Text style={{fontFamily: 'Inter_300Light', fontSize: 42, color: '#FFF'}}>
                Luz
              </Text>
              <Text style={{fontFamily: 'Inter_600SemiBold', fontSize: 48,color: '#FFF'}}>
                R$ 100,00
              </Text>
            </View>
            

          
            </LinearGradient>
            <TouchableOpacity style={{backgroundColor: '#FEFEFE', elevation: 2,marginHorizontal: 22,alignItems: 'center',justifyContent: 'center', borderRadius: 100, width: 60, height: 60, alignSelf: 'flex-end', top: -30}}>
              <Feather name="arrow-down-circle" size={30} color="#E94A65" />
            </TouchableOpacity>




          </LinearGradient>
        </Animated.View>
      </SafeAreaView>
  );
}

