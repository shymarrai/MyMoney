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

type PrincipalScreenProp = StackNavigationProp<RootStackParamList, 'Principal'>;

interface DataListProps extends TransactionProps{
  id: string
}

const collectionKey = '@mymoney:transactions';
export default function Principal() {
  const navigation = useNavigation<PrincipalScreenProp>();
  const [ isLoading, setIsLoading] = useState(true)
  const [ animate, setAnimate ] = useState(new Animated.Value(-1000))
  const [data, setData] = useState<DataListProps[]>([])

  const [ incomes, setIncomes ] = useState(0)
  const [ outcomes, setOutcomes ] = useState(0)
  const [ total, setTotal ] = useState(0)

  const [ incomesPaid, setIncomesPaid ] = useState(0)
  const [ outcomesPaid, setOutcomesPaid ] = useState(0)
  const [ totalPaid, setTotalPaid ] = useState(0)

  const [ incomesNoPaid, setIncomesNoPaid ] = useState(0)
  const [ outcomesNoPaid, setOutcomesNoPaid ] = useState(0)
  const [ totalNoPaid, setTotalNoPaid ] = useState(0)

  const cardIncomes = useRef<CardFlip>(null)
  const cardIncomesNoPay = useRef<CardFlip>(null)
  const cardOutcomes = useRef<CardFlip>(null)
  const cardOutcomesNoPay = useRef<CardFlip>(null)
  const cardTotal = useRef<CardFlip>(null)
  const cardTotalNoPay = useRef<CardFlip>(null)
  
  useEffect(() => {
    const soma = incomes - outcomes
    setTotal(soma)

  },[incomes, outcomes ])

  useEffect(() => {
    const somaPaid = incomesPaid - outcomesPaid
    setTotalPaid(somaPaid)

  },[incomesPaid, outcomesPaid ])

  useEffect(() => {
    const somaNoPaid = incomesNoPaid - outcomesNoPaid
    setTotalNoPaid(somaNoPaid)

  },[incomesNoPaid, outcomesNoPaid ])
  

  async function loadTransactions(){
    
    const response = await AsyncStorage.getItem(collectionKey)

    const transactions = response ? JSON.parse(response) : []

    setData(transactions)
    await calculateCurrency(transactions)
  }



  async function calculateCurrency(allTransactions:any){
    allTransactions.map((item: any) => {
      if(item.type === "up"){
        setIncomes(state => state + Number(item.amount))
        if(item.paid === true){
          setIncomesPaid(state => state + Number(item.amount))
        }
        
        if(item.paid === false){
          setIncomesNoPaid(state => state + Number(item.amount))
        }
      }
      
      if(item.type === "down"){
        setOutcomes(state => state + Number(item.amount))

        if(item.paid === true){
          setOutcomesPaid(state => state + Number(item.amount))
        }
        
        if(item.paid === false){
          setOutcomesNoPaid(state => state + Number(item.amount))
        }
      }
    })
  }

  useEffect(() => navigation.addListener('blur', () => {

    Animated.timing(animate, {
        toValue: -1000,
        duration: 300,
        useNativeDriver: true
    }).start();
}), []);

  function resetValues(){
    setIncomes(0)
    setOutcomes(0)
    setTotal(0)

    setIncomesPaid(0)
    setOutcomesPaid(0)
    setTotalPaid(0)

    setIncomesNoPaid(0)
    setOutcomesNoPaid(0)
    setTotalNoPaid(0)
  }

  useEffect(() => navigation.addListener('focus', () => {
      // async function removeAll(){
      //   await AsyncStorage.removeItem(collectionKey)
      // }
      // removeAll()

    loadTransactions()
    setIncomes(0)
    setOutcomes(0)
    setTotal(0)

    setIncomesPaid(0)
    setOutcomesPaid(0)
    setTotalPaid(0)

    setIncomesNoPaid(0)
    setOutcomesNoPaid(0)
    setTotalNoPaid(0)
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
          <View style={[styles.containerBranch, 
            { marginBottom: 30,}]}
          >
            <Text style={styles.Mybranch}>
              My
            </Text>
            <Text style={styles.branch}>
              Money
            </Text>

          </View>

          <ScrollView
            style={{ height: 10}}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingLeft: '12 %', paddingRight: '12%'}}
          >

              {/* ENTRADAS */}
              <CardFlip ref={cardIncomes} style={[styles.cardFlipContainer]}>
                <TouchableOpacity 
                  style={styles.card}
                  activeOpacity={0.8}
                  onPress={() => {
                    if(cardIncomes.current){
                      cardIncomes.current.flip()
                    }
                  }}
                >
                  <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style={styles.title}>
                      Entradas
                    </Text>
                    <Feather name="arrow-up-circle" size={24} color="#6AC694" />
                  </View>

                  <View style={{flex:1, justifyContent: 'center' }}>
                    <Text style={styles.amount}>
                      { incomes.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }) }
                    </Text>
                  </View>
                </TouchableOpacity>
                <CardFlip ref={cardIncomesNoPay} style={[styles.cardFlipContainer,{ marginVertical: 0}]}>
                  <TouchableOpacity 
                    style={styles.card}
                    activeOpacity={0.8}
                    onPress={() => {
                      if(cardIncomesNoPay.current){
                        cardIncomesNoPay.current.flip()
                      }
                    }}
                  >
                    <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                      <Text style={styles.title}>
                        Entradas(Pagas)
                      </Text>
                      <Feather name="arrow-up-circle" size={24} color="#6AC694" />
                    </View>

                    <View style={{flex:1, justifyContent: 'center' }}>
                      <Text style={styles.amount}>
                        { incomesPaid.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }) }
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.card}
                    activeOpacity={0.8}
                    onPress={() => {
                      if(cardIncomes.current){
                        cardIncomes.current.flip()
                        cardIncomesNoPay.current.flip()
                      }
                    }}
                  >
                    <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                      <Text style={styles.title}>
                        Entradas(Não Pagas)
                      </Text>
                      <Feather name="arrow-up-circle" size={24} color="#6AC694" />
                    </View>

                    <View style={{flex:1, justifyContent: 'center' }}>
                      <Text style={styles.amount}>
                        { incomesNoPaid.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }) }
                      </Text>
                    </View>
                  </TouchableOpacity>

                </CardFlip>

              </CardFlip>



              {/* SAÍDAS */}
              <CardFlip ref={cardOutcomes} style={[styles.cardFlipContainer]}>
                <TouchableOpacity 
                  style={styles.card}
                  activeOpacity={0.8}
                  onPress={() => {
                    if(cardOutcomes.current){
                      cardOutcomes.current.flip()
                    }
                  }}
                >
                  <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style={styles.title}>
                      Saídas
                    </Text>
                    <Feather name="arrow-down-circle" size={24} color="#E94A65" />
                  </View>

                  <View style={{flex:1, justifyContent: 'center' }}>
                    <Text style={styles.amount}>
                    { outcomes.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }) }
                    </Text>
                  </View>
                </TouchableOpacity>

                <CardFlip ref={cardOutcomesNoPay} style={[styles.cardFlipContainer, {marginVertical: 0}]}>
                  <TouchableOpacity 
                    style={styles.card}
                    activeOpacity={0.8}
                    onPress={() => {
                      if(cardOutcomesNoPay.current){
                        cardOutcomesNoPay.current.flip()
                      }
                    }}
                  >
                    <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                      <Text style={styles.title}>
                        Saídas(Pagas)
                      </Text>
                      <Feather name="arrow-down-circle" size={24} color="#E94A65" />
                    </View>

                    <View style={{flex:1, justifyContent: 'center' }}>
                      <Text style={styles.amount}>
                      { outcomesPaid.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }) }
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.card}
                    activeOpacity={0.8}
                    onPress={() => {
                      if(cardOutcomes.current){
                        cardOutcomes.current.flip()
                        cardOutcomesNoPay.current.flip()
                      }
                    }}
                  >
                    <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                      <Text style={styles.title}>
                        Saídas(Não Pagas)
                      </Text>
                      <Feather name="arrow-down-circle" size={24} color="#E94A65" />
                    </View>

                    <View style={{flex:1, justifyContent: 'center' }}>
                      <Text style={styles.amount}>
                      { outcomesNoPaid.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }) }
                      </Text>
                    </View>
                  </TouchableOpacity>

                </CardFlip>

              </CardFlip>

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

              {/* RESTANTE */}
              <CardFlip ref={cardTotal} style={[styles.cardFlipContainer]}>
                <TouchableOpacity 
                  style={[styles.card, { backgroundColor: '#49AA26' }]}
                  activeOpacity={0.8}
                  onPress={() => {
                    if(cardTotal.current){
                      cardTotal.current.flip()
                    }
                  }}
                >
                  <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style={[styles.title, { color: '#fff'}]}>
                      Restante
                    </Text>
                    <Feather name="dollar-sign" size={24} color="#fff" />
                  </View>

                  <View style={{flex:1, justifyContent: 'center' }}>
                    <Text style={[styles.amount, { color: '#fff' }]}>
                    { total.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }) }
                    </Text>
                  </View>
                </TouchableOpacity>

                <CardFlip ref={cardTotalNoPay} style={[styles.cardFlipContainer, {marginVertical: 0}]}>
                  <TouchableOpacity 
                    style={[styles.card, { backgroundColor: '#49AA26' }]}
                    activeOpacity={0.8}
                    onPress={() => {
                      if(cardTotalNoPay.current){
                        cardTotalNoPay.current.flip()
                      }
                    }}
                  >
                    <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                      <Text style={[styles.title, { color: '#fff'}]}>
                        Restante(Pagas)
                      </Text>
                      <Feather name="dollar-sign" size={24} color="#fff" />
                    </View>

                    <View style={{flex:1, justifyContent: 'center' }}>
                      <Text style={[styles.amount, { color: '#fff' }]}>
                      { totalPaid.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }) }
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.card, { backgroundColor: '#49AA26' }]}
                    activeOpacity={0.8}
                    onPress={() => {
                      if(cardTotal.current){
                        cardTotal.current.flip()
                        cardTotalNoPay.current.flip()
                      }
                    }}
                  >
                    <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                      <Text style={[styles.title, { color: '#fff'}]}>
                        Restante(Não Pagas)
                      </Text>
                      <Feather name="dollar-sign" size={24} color="#fff" />
                    </View>

                    <View style={{flex:1, justifyContent: 'center' }}>
                      <Text style={[styles.amount, { color: '#fff' }]}>
                      { totalNoPaid.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }) }
                      </Text>
                    </View>
                  </TouchableOpacity>

                </CardFlip>

              </CardFlip>
              
          </ScrollView>


            <FlatList
              style={{height: 260, width: '100%'}}
              data={data}
              contentContainerStyle={{paddingVertical: 10}}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <>
                  <CardTransaction data={item} />
                </>
              )}
            />


          <View style={[styles.containerBranch, { top: 20}]}>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#364869' }]}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('NewTransaction')}
            >
              <Text style={styles.textButton}>
                Nova Transação
              </Text>
              <AntDesign name="pluscircle" size={24} color={"#FFF"} />
            </TouchableOpacity>
          </View>
          </LinearGradient>
        </Animated.View>
      </SafeAreaView>
  );
}

