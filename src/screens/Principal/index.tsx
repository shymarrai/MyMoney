import React, {useState, useEffect, useRef} from 'react';
import { 
  SafeAreaView, 
  Animated, 
  Text, 
  View, 
  ScrollView, 
  FlatList, 
  ActivityIndicator, 
  Alert,
  TouchableOpacity
} from 'react-native';

import { styles } from './styles'
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather, Entypo } from '@expo/vector-icons';
import CardTransaction from '../../components/CardTransaction';
import { addMonths, subMonths } from 'date-fns';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParamList';
import { TransactionProps } from '../CardDetails';
import { CardAmountFlip } from '../../components/CardAmountFlip';
import theme from '../../global/styles/theme';
import Load from '../../components/Load';

import { format } from 'date-fns/esm';
import { ptBR } from 'date-fns/locale';

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

  const [ selectedDate, setSelectedDate ] = useState(new Date())


  function handleDateChange(action: 'next' | 'prev'){
    setIsLoading(true)
    if(action === 'next'){
      setSelectedDate(addMonths(selectedDate, 1))
    }else{
      setSelectedDate(subMonths(selectedDate, 1))
    }
    setIsLoading(false)
  }

  useEffect(() => {
    resetStates()
    loadTransactions()
  },[selectedDate])
  
  useEffect(() => {
    resetStates()
    loadTransactions()
  },[])

  useEffect(() => {
    // removeAll()
    setIsLoading(true)
    resetStates()
    setIsLoading(false)
  },[])
  
  useEffect(() => {
    setIsLoading(true)
    const soma = incomes - outcomes
    setTotal(soma)
    setIsLoading(false)
  },[incomes, outcomes ])

  useEffect(() => {
    setIsLoading(true)
    const somaPaid = incomesPaid - outcomesPaid
    setTotalPaid(somaPaid)
    setIsLoading(false)
  },[incomesPaid, outcomesPaid ])

  useEffect(() => {
    setIsLoading(true)
    const somaNoPaid = incomesNoPaid - outcomesNoPaid
    setTotalNoPaid(somaNoPaid)
    setIsLoading(false)
  },[incomesNoPaid, outcomesNoPaid ])

  function formatDate(date: string){
    const stringDate = date

    const day = stringDate.slice(0,2) 
    const month = stringDate.slice(3,6)
    const year = stringDate.slice(5,stringDate.length)

    return month + day + year
  }
  
  async function loadTransactions(){
    setIsLoading(true)
    const response = await AsyncStorage.getItem(collectionKey)
    const transactions = response ? JSON.parse(response) : []

    const transactionsFiltered = transactions.filter((transaction: DataListProps) =>( 
      new Date(formatDate(transaction.date)).getMonth() === selectedDate.getMonth() &&
      new Date(formatDate(transaction.date)).getFullYear() === selectedDate.getFullYear()
    ))

      
    setData(transactionsFiltered)
    if(transactionsFiltered.length >= 1){
      await calculateCurrency(transactionsFiltered)
      const first = getFirstTransactionDate(transactionsFiltered)
      const last = getLastTransactionDate(transactionsFiltered)
  
      setFirst(first)
      setLast(last)
    }else{
      setFirst('')
      setLast('')
    }

    setIsLoading(false)
  }

  function resetStates(){
    setIsLoading(true)
    setIncomes(0)
    setOutcomes(0)
    setTotal(0)

    setIncomesPaid(0)
    setOutcomesPaid(0)
    setTotalPaid(0)

    setIncomesNoPaid(0)
    setOutcomesNoPaid(0)
    setTotalNoPaid(0)
    setIsLoading(false)
  }

  async function removeItem(id: any){
    setIsLoading(true)
    
    try{
      const response = await AsyncStorage.getItem(collectionKey)
      const transactionsData = response ? JSON.parse(response) : []
  
      
      const transactions = transactionsData.filter((item: DataListProps)  => item.id !== id)

      
      const dataFormated = [
        ...transactions
      ]

      await AsyncStorage.setItem(collectionKey, JSON.stringify(dataFormated))
    }catch(error){
      console.log(error)
      Alert.alert("Não foi possível excluir")
    }finally{

      resetStates()
      loadTransactions()
    }
    setIsLoading(false)
  }

  async function calculateCurrency(allTransactions:any){
    setIsLoading(true)
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

    setIsLoading(false)
  }

  async function removeAll(){
    await AsyncStorage.removeItem(collectionKey)
  }

  function getLastTransactionDate(collection: DataListProps[]){
    setIsLoading(true)

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

        setIsLoading(false)
        const last = lastTransctionIn >= lastTransctionOut ? lastTransctionIn : lastTransctionOut
        return Intl.DateTimeFormat('pt-BR', {day: '2-digit', month: '2-digit'}).format(last)


  }

  function getFirstTransactionDate(collection: DataListProps[]){
    setIsLoading(true)

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
        setIsLoading(false)
        return Intl.DateTimeFormat('pt-BR', {day: '2-digit', month: '2-digit'}).format(last)
  }

  async function handleCardPaid(id: any){
    setIsLoading(true)
    
    try{

      const response = await AsyncStorage.getItem(collectionKey)
      const transactionsData = response ? JSON.parse(response) : []

      const transactionHandled = transactionsData.filter((item: DataListProps) => item.id === id)
      transactionHandled[0].paid = !transactionHandled[0].paid
      
      
      const transactions = transactionsData.filter((item: DataListProps) => item.id !== id)

      const dataFormated = [
        ...transactionHandled,
        ...transactions
      ]

      await AsyncStorage.setItem(collectionKey, JSON.stringify(dataFormated))
    }catch(error){
      console.log(error)
      Alert.alert("Não foi possível alternar situação de pagamento")
    }finally{
      resetStates()

      loadTransactions()
    }
    setIsLoading(false)
  }

  useEffect(() => navigation.addListener('blur', () => {
    resetStates()
    
    Animated.timing(animate, {
        toValue: -1000,
        duration: 300,
        useNativeDriver: true
    }).start();
  }), []);

  useEffect(() => navigation.addListener('focus', () => {
    resetStates()
    loadTransactions()
    setSelectedDate(selectedDate)
    Animated.timing(animate, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
    
    
  }), []);


  return (
    <View style={styles.container}>
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
            paddingVertical: 20, 
        }}
          colors={[theme.colors.white, theme.colors.shape]}
        >
          <View style={[styles.containerBranch]}>
            <Text style={styles.Mybranch}>
              My
            </Text>
            <Text style={styles.branch}>
              Money
              
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>  navigation.navigate('IntroMyMoney')}
              style={{padding: 10, right: -80}}
            >
              <Entypo name="info-with-circle" size={24} color={theme.colors.default} />
            </TouchableOpacity>

          </View>

          <ScrollView
            horizontal
            style={{position: 'absolute', top: '13%'}}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingLeft: '12%', paddingRight: '12%', alignItems: 'center'}}
          >

            {/* ENTRADAS */}
            <CardAmountFlip  
              amount={incomes}
              NoPaid={incomesNoPaid}
              Paid={incomesPaid}
              title="Entradas"
              isLoading={isLoading}
            />
              {/* SAÍDAS */}             
              <CardAmountFlip  
              amount={outcomes}
              NoPaid={outcomesNoPaid}
              Paid={outcomesPaid} 
              title="Saídas"
              isLoading={isLoading}
            />
              {/* RESTANTES */}
              <CardAmountFlip  
              amount={total}
              NoPaid={totalNoPaid}
              Paid={totalPaid}
              title="Restantes"
              isLoading={isLoading}
            />

              
          </ScrollView>
            
            
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: '6%',
              top: '41%'
            }}
          >
            <View
            style={styles.controls}
          >
            <BorderlessButton
              onPress={() => handleDateChange('prev')}
            >
              <Feather name={'chevron-left'} size={24} color={theme.colors.default} />
            </BorderlessButton>

            <Text style={styles.month}>
              { format(selectedDate, 'MMM/yyyy',{ locale: ptBR})  }
            </Text>

            <BorderlessButton
              onPress={() => handleDateChange('next')}
            >
            <Feather name={'chevron-right'} size={24} color={theme.colors.default} />
            </BorderlessButton>

          </View>


            <View style={styles.filter}>
              <Text style={styles.title}>
                { first && last && `${first} à ${last} `}
              </Text>
            </View>
          </View>


          {
            isLoading ?

              <View
                style={{height: 300, width: '100%', position: 'absolute', top: '55%'}}
              >
                <Load />
              </View>

            :
            <FlatList
              style={{height: 300, width: '100%', top:'30%'}}
              data={data}
              contentContainerStyle={{paddingTop: 10, paddingBottom: '100%'}}
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
          }
          </LinearGradient>
        </Animated.View>
      </View>
  );
}

