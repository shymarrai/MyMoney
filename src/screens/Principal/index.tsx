import React, {useState, useEffect} from 'react';
import { SafeAreaView, Animated, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles'
import { LinearGradient } from 'expo-linear-gradient';
import { Feather,FontAwesome5, AntDesign } from '@expo/vector-icons';

import {useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParamList';

type PrincipalScreenProp = StackNavigationProp<RootStackParamList, 'Principal'>;

export default function Principal() {
  const navigation = useNavigation<PrincipalScreenProp>();
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
          colors={['#FFF', '#f0f0f0']}
        >
          <View style={[styles.containerBranch, 
            { marginBottom: 40,}]}
          >
            <Text style={styles.Mybranch}>
              My
            </Text>
            <Text style={styles.branch}>
              Money
            </Text>

          </View>

            {/* ENTRADAS */}

          <View style={styles.card}>
            <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={styles.title}>
                Entradas
              </Text>
              <Feather name="arrow-up-circle" size={24} color="#6AC694" />
            </View>

            <View style={{flex:1, justifyContent: 'center' }}>
              <Text style={styles.amount}>
                R$ 0,00
              </Text>
            </View>
          </View>


            {/* SAÍDAS */}
          <View style={styles.card}>
            <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={styles.title}>
                Saídas
              </Text>
              <Feather name="arrow-down-circle" size={24} color="#E94A65" />
            </View>

            <View style={{flex:1, justifyContent: 'center' }}>
              <Text style={styles.amount}>
                R$ 0,00
              </Text>
            </View>
          </View>

            {/* CARTEIRA
            <View style={styles.card}>
            <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={styles.title}>
                Carteira
              </Text>
              <FontAwesome5 name="money-bill-alt" size={24} color="#364869" />
            </View>

            <View style={{flex:1, justifyContent: 'center' }}>
              <Text style={styles.amount}>
                R$ 0,00
              </Text>
            </View>
          </View> */}

            {/* POUPANÇA */}
            <View style={[styles.card, { backgroundColor: '#49AA26' }]}>
            <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={[styles.title, { color: '#fff'}]}>
                Poupança
              </Text>
              <Feather name="dollar-sign" size={24} color="#fff" />
            </View>

            <View style={{flex:1, justifyContent: 'center' }}>
              <Text style={[styles.amount, { color: '#fff' }]}>
                R$ 0,00
              </Text>
            </View>
          </View>


          <View style={[styles.containerBranch, { marginTop: 120}]}>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#E94A65' }]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('NewExpanse')}
            >
              <Text style={styles.textButton}>
                Nova Saída
              </Text>
              <AntDesign name="minuscircle" size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#6AC694'}]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('NewEntrance')}
            >
              <Text style={styles.textButton}>
                Nova Entrada
              </Text>
              <AntDesign name="pluscircle" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          </LinearGradient>
        </Animated.View>
      </SafeAreaView>
  );
}

