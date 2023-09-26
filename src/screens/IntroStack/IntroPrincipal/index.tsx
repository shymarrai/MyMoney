import React, {useState, useEffect, useRef} from 'react';
import { Animated, Text, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native';

import { styles } from './styles'

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../RootStackParamList';

import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { CardAmountFlip } from '../../../components/CardAmountFlip';
import CardTransaction from '../../../components/CardTransaction';

type IntroPrincipalScreenProp = StackNavigationProp<RootStackParamList, 'IntroPrincipal'>;


const collectionKey = '@mymoney:transactions';
export default function IntroPrincipal() {
    const navigation = useNavigation<IntroPrincipalScreenProp>()
  const [ animate, setAnimate ] = useState(new Animated.Value(100))
  const [ pay, setPay ] = useState(true)

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

  const data = {
    id: '1',
    name: 'Teste',
    amount: '100',
    amountFormated: 'R$ 100,00',
    type: "up",
    category: {
      key: 'card',
      name: 'Cartão',
      icon: 'credit-card',
      color: '#290000'
    },
    date: '01/01/2000',
    paid: pay,
    notes: ''
  }


  return (
    <View
      style={{flex: 1 }}
    >
        <View
            style={styles.container}
        >
            <Text 
                style={styles.text}
            >
                Ao clicar no Card de total você filtra entre (Total geral, Total pagas e Total não pagas)
            </Text>
            <CardAmountFlip 
              amount={100}
              NoPaid={50}
              Paid={50}
              title="Entradas"
              isLoading={false}
            />
            <Text 
                style={styles.text}
            >
                {'\n'}{'\n'}O Card de uma transação mostra opções arrastando para o lado. É possível alterar entre paga ou não paga pessionando o botão no canto direito
            </Text>
            <CardTransaction
              data={data} 
              handlePaid={() => setPay(!pay)}
              removeItem={() => {}}
              test={true}
            /> 
        </View>

        <RectButton 
            style={styles.buttonPrimary}
            onPress={() => navigation.navigate('IntroDelete')}
        >
            <Text style={styles.rectButtonText}>
                Próximo
            </Text>
        </RectButton>
    </View>

  );
}

