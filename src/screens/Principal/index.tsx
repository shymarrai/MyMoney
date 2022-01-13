import React, {useState, useEffect, useRef} from 'react';
import { SafeAreaView, Animated, Text, TouchableOpacity, View, ScrollView, FlatList, ActivityIndicator, Alert } from 'react-native';

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

type PrincipalScreenProp = StackNavigationProp<RootStackParamList, 'Principal'>;

export interface DataListProps extends TransactionProps{
  id: string
}

const collectionKey = '@mymoney:transactions';
export default function Principal() {
  const navigation = useNavigation<PrincipalScreenProp>();
  const [ isLoading, setIsLoading] = useState(true)
  const [ animate, setAnimate ] = useState(new Animated.Value(-1000))
  const [data, setData] = useState<DataListProps[]>([])

  const [ first, setFirst ] = useState('')
  const [ last, setLast ] = useState('')

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
    // removeAll()
    setIncomes(0)
    setOutcomes(0)
    setTotal(0)

    setIncomesPaid(0)
    setOutcomesPaid(0)
    setTotalPaid(0)

    setIncomesNoPaid(0)
    setOutcomesNoPaid(0)
    setTotalNoPaid(0)

  },[])
  
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

    if(transactions.length >= 1){
      await calculateCurrency(transactions)
      const first = getFirstTransactionDate(transactions)
      const last = getLastTransactionDate(transactions)
  
      setFirst(first)
      setLast(last)
    }else{
      setFirst('')
      setLast('')
    }


  }

  async function removeItem(id: any){
    
    try{
      
      const transactions = data.filter(item => item.id !== id)

      
      const dataFormated = [
        ...transactions
      ]

      await AsyncStorage.setItem(collectionKey, JSON.stringify(dataFormated))
    }catch(e){
      console.log(e)
      Alert.alert("Não foi possível excluir")
    }finally{
      setIncomes(0)
      setOutcomes(0)
      setTotal(0)
  
      setIncomesPaid(0)
      setOutcomesPaid(0)
      setTotalPaid(0)
  
      setIncomesNoPaid(0)
      setOutcomesNoPaid(0)
      setTotalNoPaid(0)

      loadTransactions()
    }

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

  async function removeAll(){
    await AsyncStorage.removeItem(collectionKey)
  }

  function getLastTransactionDate(collection: DataListProps[]){
    const lastTransctionIn = new Date(
      Math.max.apply(Math, collection
        .filter(transaction =>  transaction.type === 'up')
        .map( transaction => {
          const stringDate = transaction.date

          const day = stringDate.slice(0,2) 
          const month = stringDate.slice(3,6)
          const year = stringDate.slice(5,stringDate.length)

          const formated = month + day + year

          return new Date(formated).getTime()
        })))

    const lastTransctionOut = new Date(
      Math.max.apply(Math, collection
        .filter(transaction =>  transaction.type === 'down')
        .map( transaction => {
          const stringDate = transaction.date
            
          const day = stringDate.slice(0,2) 
          const month = stringDate.slice(3,6)
          const year = stringDate.slice(5,stringDate.length)
            
          const formated = month + day + year
          
          return new Date(formated).getTime()
        })))

        const last = lastTransctionIn >= lastTransctionOut ? lastTransctionIn : lastTransctionOut
        return Intl.DateTimeFormat('pt-BR', {day: '2-digit', month: '2-digit'}).format(last)
    
  }

  function getFirstTransactionDate(collection: DataListProps[]){
    const firstTransctionIn = new Date(
      Math.min.apply(Math, collection
        .filter(transaction =>  transaction.type === 'up')
        .map( transaction => {
          const stringDate = transaction.date

          const day = stringDate.slice(0,2) 
          const month = stringDate.slice(3,6)
          const year = stringDate.slice(5,stringDate.length)

          const formated = month + day + year

          return new Date(formated).getTime()
        })))

    const firstTransctionOut = new Date(
      Math.min.apply(Math, collection
        .filter(transaction =>  transaction.type === 'down')
        .map( transaction => {
          const stringDate = transaction.date
            
          const day = stringDate.slice(0,2) 
          const month = stringDate.slice(3,6)
          const year = stringDate.slice(5,stringDate.length)
            
          const formated = month + day + year
            
          return new Date(formated).getTime()
        })))

        const last = firstTransctionIn <= firstTransctionOut ? firstTransctionIn : firstTransctionOut
        return Intl.DateTimeFormat('pt-BR', {day: '2-digit', month: '2-digit'}).format(last)
  }

  async function handleCardPaid(id: any){
    
    try{
      const transactionHandled = data.filter(item => item.id === id)
      transactionHandled[0].paid = !transactionHandled[0].paid
      
      
      const transactions = data.filter(item => item.id !== id)

      const dataFormated = [
        ...transactionHandled,
        ...transactions
      ]

      await AsyncStorage.setItem(collectionKey, JSON.stringify(dataFormated))
    }catch(e){
      console.log(e)
      Alert.alert("Não foi possível alternar situação de pagamento")
    }finally{
      setIncomes(0)
      setOutcomes(0)
      setTotal(0)
  
      setIncomesPaid(0)
      setOutcomesPaid(0)
      setTotalPaid(0)
  
      setIncomesNoPaid(0)
      setOutcomesNoPaid(0)
      setTotalNoPaid(0)

      loadTransactions()
    }

  }

  useEffect(() => navigation.addListener('blur', () => {
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
        toValue: -1000,
        duration: 300,
        useNativeDriver: true
    }).start();
  }), []);

  useEffect(() => navigation.addListener('focus', () => {

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
            style={{height: 0, top: -20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingLeft: '12%', paddingRight: '12%', alignItems: 'center'}}
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
                        cardIncomesNoPay.current && cardIncomesNoPay.current.flip()
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
                        cardOutcomesNoPay.current && cardOutcomesNoPay.current.flip()
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
                        cardTotalNoPay.current && cardTotalNoPay.current.flip()
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
            
   
          <View style={styles.filter}>
            <Text style={styles.title}>
              { first && last && `${first} à ${last} `}
            </Text>
          </View>
          <FlatList
            style={{height: 280, width: '100%', marginTop: -24 }}
            data={data}
            contentContainerStyle={{paddingTop: 20, paddingBottom: 40}}
            keyExtractor={(item) => item.id}

            renderItem={({item}) => (
              <>
              {
                item.name &&
                <CardTransaction
                  data={item} 
                  handlePaid={handleCardPaid}
                  removeItem={removeItem}
                />

              }
              </>
            )}
          />
          </LinearGradient>
        </Animated.View>
      </SafeAreaView>
  );
}

