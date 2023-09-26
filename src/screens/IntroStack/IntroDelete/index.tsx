import React, { useState, useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View, ScrollView, SafeAreaView, Alert } from 'react-native';

import { styles } from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../RootStackParamList';

import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

type IntroDeleteScreenProp = StackNavigationProp<RootStackParamList, 'IntroDelete'>;


const collectionKey = '@mymoney:transactions';
export default function IntroDelete() {
  const navigation = useNavigation<IntroDeleteScreenProp>()
  const [animate, setAnimate] = useState(new Animated.Value(100))
  const [pay, setPay] = useState(true)

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

  async function removeAll() {
    Alert.alert('🤔Tem certeza?', "Atenção serão deletado todas as transações", [
      {
        text: "Sim",
        onPress: async () => {
          await AsyncStorage.removeItem(collectionKey)
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "Não",
      },
    ])
    // await AsyncStorage.removeItem(collectionKey)
  }


  return (
    <View
      style={{ flex: 1 }}
    >
      <View
        style={styles.container}
      >
        <Text
          style={styles.greeting}
        >
          Meu nome é Bruno, sou o desenvolvedor e agradeço pelo uso!😄{'\n\n\n'}
        </Text>

        <Text
          style={styles.text}
        >
          Se tiver alguma reclamação ou sugestão que ajude a melhorar o app deixe seu comentário que estarei respondendo!{'\n\n\n\n\n'}
          Você pode a qualquer momento resetar toda as suas transações. Essa opção estará sempre diponível!!{'\n\n'}
        </Text>
        <RectButton
          style={styles.buttonSeconday}
          onPress={() => removeAll()}
        >
          <Text style={styles.rectButtonText}>
            RESETAR
          </Text>
          <Feather name="trash-2" size={14} color="#FFF" style={{ alignSelf: 'center' }} />
        </RectButton>

      </View>

      <RectButton
        style={styles.buttonPrimary}
        onPress={() => navigation.navigate('Principal')}
      >
        <Text style={styles.rectButtonText}>
          Concluído!
        </Text>
      </RectButton>
    </View>

  );
}

