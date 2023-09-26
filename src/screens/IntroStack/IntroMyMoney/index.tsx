import React, {useState, useEffect, useRef} from 'react';
import { Animated, Text, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native';

import { styles } from './styles'

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../RootStackParamList';

import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

type IntroMyMoneyScreenProp = StackNavigationProp<RootStackParamList, 'IntroMyMoney'>;


const collectionKey = '@mymoney:transactions';
export default function IntroMyMoney() {
    const navigation = useNavigation<IntroMyMoneyScreenProp>()
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
    <View
      style={{flex: 1 }}
    >
        <View
            style={styles.container}
        >
            <Text 
                style={styles.greeting}
            >
                Bem vindo,{'\n'}
                MyMoney é um app de gestão financeira.{'\n'}
            </Text>
            <Text 
                style={styles.text}
            >
                É importante deixar claro que não capturamos nenhum dado do usuário, o objetivo é apenas fornecer funções para ajudar a ter controle financeiro!
            </Text>
        </View>

        <RectButton 
            style={styles.buttonPrimary}
            onPress={() => navigation.navigate('IntroPrincipal')}
        >
            <Text style={styles.rectButtonText}>
                Próximo
            </Text>
        </RectButton>
    </View>

  );
}

