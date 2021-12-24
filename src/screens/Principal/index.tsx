import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles'
import { LinearGradient } from 'expo-linear-gradient';
import { Feather,FontAwesome5, AntDesign } from '@expo/vector-icons';

export default function Principal() {
  return (
      <LinearGradient
        style={styles.container}
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

          {/* CARTEIRA */}
          <View style={styles.card}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={styles.title}>
              Carteira
            </Text>
            <FontAwesome5 name="money-bill-alt" size={24} color="#290000" />
          </View>

          <View style={{flex:1, justifyContent: 'center' }}>
            <Text style={styles.amount}>
              R$ 0,00
            </Text>
          </View>
        </View>

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


        <View style={[styles.containerBranch, { marginTop: 40}]}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#6AC694'}]}
          >
            <Text style={styles.textButton}>
              Nova Entrada
            </Text>
            <AntDesign name="pluscircle" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#E94A65' }]}
          >
            <Text style={styles.textButton}>
              Nova Saída
            </Text>
            <AntDesign name="minuscircle" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

      </LinearGradient>
  );
}

