import React , {useState, useEffect} from 'react';
import { ScrollView, Animated,  Text, TouchableOpacity, View, SafeAreaView } from 'react-native';

import { styles } from './styles'
import { LinearGradient } from 'expo-linear-gradient';
import { Feather,FontAwesome5, AntDesign } from '@expo/vector-icons';

import {useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParamList';

type NewEntranceScreenProp = StackNavigationProp<RootStackParamList, 'NewEntrance'>;

export default function NewEntrance() {
  const navigation = useNavigation<NewEntranceScreenProp>();
  const [ animate, setAnimate ] = useState(new Animated.Value(1000))

  useEffect(() => navigation.addListener('blur', () => {

    Animated.timing(animate, {
        toValue: 1000,
        duration: 1000,
        useNativeDriver: true
    }).start();
}), []);



useEffect(() => navigation.addListener('focus', () => {

    Animated.timing(animate, {
        toValue: 0,
        duration: 1000,
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
            justifyContent: 'center',
        }}
            colors={['#7CE3B1', '#7CC4B1']}
        >

        </LinearGradient>
      </Animated.View>
    </SafeAreaView>
  );
}

