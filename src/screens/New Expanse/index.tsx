import React , {useState, useEffect} from 'react';
import { ScrollView, Animated,  Text, TouchableOpacity, View, SafeAreaView } from 'react-native';

import { styles } from './styles'
import { LinearGradient } from 'expo-linear-gradient';
import { Feather,FontAwesome5, AntDesign } from '@expo/vector-icons';

import {useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParamList';

type NewExpanseScreenProp = StackNavigationProp<RootStackParamList, 'NewExpanse'>;

export default function NewExpanse() {
  const navigation = useNavigation<NewExpanseScreenProp>();
  const [ animate, setAnimate ] = useState(new Animated.Value(-1000))

  useEffect(() => navigation.addListener('blur', () => {

    Animated.timing(animate, {
        toValue: -1000,
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
            colors={['#E94A65', '#E94A5A']}
        >

        </LinearGradient>
      </Animated.View>
    </SafeAreaView>
  );
}

