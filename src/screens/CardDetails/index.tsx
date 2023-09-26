import React, {useState, useEffect} from 'react';
import { 
  SafeAreaView, 
  Animated, 
  Text, 
  TouchableOpacity, 
  View, ScrollView,
  TextInput, 
  Platform, 
  KeyboardAvoidingView,
  Alert,
  Keyboard
} from 'react-native';

import { styles } from './styles'
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CategorySelect } from '../../components/CategorySelect';
import uuid from 'react-native-uuid'
import { useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParamList';
import { RectButton, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ModalCategories } from '../../components/ModalCategories';
import { CardFlipSituation } from '../../components/CardFlipSituation';
import { CardTransactionGradient } from '../../components/CardTransactionGradient';
import CurrencyInput from 'react-native-currency-input';
import { CardFlipTransationType } from '../../components/CardFlipTransationType';
import theme from '../../global/styles/theme';
import { DataListProps } from '../Principal';


type CardDetailsScreenProp = StackNavigationProp<RootStackParamList, 'CardDetails'>;

export type Category = {
  key: string
  name: string
  icon: any
  color: string
}
type TypeTransaction = "up" | "down"

export interface TransactionProps{
  name: string;
  amount: string;
  amountFormated: string;
  type: TypeTransaction;
  category: Category;
  date: string;
  paid: boolean
  notes: string
}


const collectionKey = '@mymoney:transactions';
export default function CardDetails({ route}: any) {
  const navigation = useNavigation<CardDetailsScreenProp>()

  const  { data } = route.params

  const [ animate, setAnimate ] = useState(new Animated.Value(100))
  const [ open, setOpen ] = useState(false)
  const [ modal, setMotal ] = useState(false)
  
  const [ allTransactions , setAllTransactions ] = useState<any>()

  const [ name, setName ] = useState('')
  const [ amount, setAmount ] = useState('')
  const [ notes, setNotes ] = useState('')
  const [ date, setDate] = useState<Date>(new Date())
  const [ situation, setSituation ] = useState(false)
  const [ type, setType ] = useState<TypeTransaction>("down")
  const [ amountFormated, setAmountFormated ] = useState('')
  const [ error, setError ] = useState({
    name: false,
    amount: false,
    category: false
  })
  const [ category, setCategory ] = useState({
    key: 'category',
    name: 'Categorias',
    icon: '',
    color: ''
  })
  

  useEffect(() => navigation.addListener('blur', () => {
    Animated.timing(animate, {
      toValue: 1000,
      duration: 300,
      useNativeDriver: true
    }).start();
  }), []);

  useEffect(() =>{
    if(data){

      const stringDate = data.date

      const day = stringDate.slice(0,2) 
      const month = stringDate.slice(3,6)
      const year = stringDate.slice(5,stringDate.length)
      const formated = new Date(month + day + year)


      setName(data.name)
      setAmount(data.amount)
      setType(data.type)
      setAmountFormated(data.amountFormated)
      setCategory(data.category)
      setDate(formated)
      setSituation(data.paid)
      setNotes(data.notes)
    }
  },[data])

  useEffect(() => navigation.addListener('focus', () => {    
    Animated.timing(animate, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  }), []);


  function handleModal(){
    setMotal(!modal)
  }
  function handleSituation(sit: boolean){
    setSituation(!sit) 
  }
  function handleType(type: TypeTransaction){
    setType(type) 
  }
  
  async function removeItem(id: any){
    
    try{
      const allTransactions = await AsyncStorage.getItem(collectionKey)
      const currentData = allTransactions ? JSON.parse(allTransactions) : []

      const transactions = currentData.filter((item: DataListProps) => item.id !== id)

      
      const dataFormated = [
        ...transactions
      ]

      await AsyncStorage.setItem(collectionKey, JSON.stringify(dataFormated))
    }catch(error){
      console.log(error)
      Alert.alert("Não foi possível excluir")
    }finally{

      resetStates()
      loadData()
    }

  }

  function resetStates(){
    setCategory({
      key: 'category',
      name: 'Categorias',
      icon: '',
      color: ''
    })
    setName('')
    setAmount('')
    setNotes('')
    setError({
      name: false,
      amount: false,
      category: false
    })
  }

  function getDateActual(date: any){
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const dayformat = day < 9 ? `0${day}` : day
    const monthformat = month < 9 ? `0${month+1}` : month+1
    return `${dayformat}/${monthformat}/${year}`
  }

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setOpen(Platform.OS === 'ios');
    setDate(currentDate);
  };


  async function loadData(){
    const data = await AsyncStorage.getItem(collectionKey)
    setAllTransactions(JSON.parse(data!))
  }

  async function editTransaction(){
    if(name === '' ){
      setError({...error, name: true})
      return
    }else{
      setError({...error, name: false})
    }
    
    if(amount === '' ){
      setError({...error, amount: true})
      return
    }else{
      setError({...error, amount: false})
    }
  
    if(category.name === 'Categorias' ){
      setError({...error, category: true})
      return
    }else{
      setError({...error, category: false})
    }
      try{
        const allTransactions = await AsyncStorage.getItem(collectionKey)
        const currentData = allTransactions ? JSON.parse(allTransactions) : []

        const NewTransaction = {
          id: String(uuid.v4()),
          name: name,
          amount: amount,
          amountFormated: amountFormated,
          date: getDateActual(date),
          type: type != undefined ? type : 'down',
          paid: situation,
          category: category,
          notes: notes
          
        }

        const transactions = currentData.filter((item: DataListProps) => item.id !== data.id)
  
        
        const dataFormated = [
          NewTransaction,
          ...transactions
        ]
  
        await AsyncStorage.setItem(collectionKey, JSON.stringify(dataFormated))

         
        resetStates()
        loadData()

      }catch(error){
        console.log(error)
        Alert.alert("Não foi possível excluir")
      }
  
    
  }

  async function handleNewTransaction(){
    if(name === '' ){
      setError({...error, name: true})
      return
    }else{
      setError({...error, name: false})
    }
    
    if(amount === '' ){
      setError({...error, amount: true})
      return
    }else{
      setError({...error, amount: false})
    }
  
    if(category.name === 'Categorias' ){
      setError({...error, category: true})
      return
    }else{
      setError({...error, category: false})
    }
    
    const NewTransaction = {
      id: String(uuid.v4()),
      name: name,
      amount: amount,
      amountFormated: amountFormated,
      date: getDateActual(date),
      type: type != undefined ? type : 'down',
      paid: situation,
      category: category,
      notes: notes
      
    }

    try{
      const data = await AsyncStorage.getItem(collectionKey)
      const currentData = data ? JSON.parse(data) : []

      const dataFormated = [
        NewTransaction,
        ...currentData
      ]

      await AsyncStorage.setItem(collectionKey, JSON.stringify(dataFormated))
      
      resetStates()
      loadData()

    }catch(error){
      console.log(error)
      Alert.alert('Não foi possível salvar')
    }
  }

  return (
    <>
    <View style={{flex: 1}}>
      <Animated.View
        style={{
          flex:1,
          transform:[
              {translateX: animate}
          ]
      }}
      >
        <LinearGradient
          style={{flex: 1}}
          colors={[theme.colors.white, theme.colors.shape]}
        >
            
          <CardTransactionGradient 
              name={name}
              amount={amount}
              amountFormated={amountFormated}
              type={type}
              category={category}
              date={getDateActual(date)}
              paid={situation}
              notes={notes}
              handleModal={handleModal}
            
          />
            <ScrollView style={styles.scroll}>
              <KeyboardAvoidingView 
                style={{flex:1}}
                behavior='padding'
              >
              <View style={styles.form}>

                <Text style={styles.textLabel}>
                  Nome
                </Text>
                <TextInput 
                  style={styles.input} 
                  placeholder='Nome da despeza'
                  placeholderTextColor={theme.colors.default}
                  value={name}
                  onChangeText={(e) => {
                    setName(e)
                    if(e === '' ){
                      setError({...error, name: true})
                    }else{
                      setError({...error, name: false})
                    }
                    
                  }}
                  autoCapitalize='sentences'
                  autoCorrect={false}
                />
                {
                  error.name &&
                    <Text style={[styles.error]}>
                      Necessário um nome 🤭
                    </Text>
                }
                <Text style={styles.textLabel}>
                  Valor
                </Text>
                <CurrencyInput 
                  style={styles.input} 
                  placeholder='Valor da despeza'
                  placeholderTextColor={theme.colors.default}
                  value={Number(amount)}
                  onChangeValue={(e) => {
                    setAmount(String(e))
                    if(amount === '' ){
                      setError({...error, amount: true})
                    }else{
                      setError({...error, amount: false})
                    }
                  }}
                  prefix="R$"
                  delimiter="."
                  separator=","
                  minValue={0}
                  precision={2}
                  onChangeText={(formattedValue: string) => {
                    setAmountFormated(formattedValue); // $2,310.46
                  }}
                />
                {
                  error.amount &&
                    <Text style={[styles.error]}>
                      Necessário um valor 🤔
                    </Text>
                }

                <View style={[styles.wrapperHorizontal]}>
                  <View>
                    <Text style={styles.textLabel}>
                      Situação
                    </Text>

                    
                        <CardFlipSituation situation={situation} handleSituation={handleSituation} />
               
    
                  </View>

                  <View style={{width: '50%'}}>
                    <Text style={[styles.textLabel, { textAlign: 'right'}]}>
                      Categoria
                    </Text>

                    <CategorySelect
                      title={category.name}
                      backgroundColor={theme.colors.primary_light}
                      textColor={theme.colors.default}
                      onPress={handleModal}
                    />
                      {
                        error.category &&
                          <Text style={[styles.error, { top: 0}]}>
                            Escolha uma categoria ☺️
                          </Text>
                      }
                  </View>
                </View>


                <View style={[styles.wrapperHorizontal]}>
                  <View>
                    <Text style={styles.textLabel}>
                      Tipo de transação
                    </Text>
                    
                    <CardFlipTransationType type={type} handleType={handleType} />

                    
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={[styles.textLabel,{ textAlign: 'right'}]}>
                      Data da transação
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => setOpen(!open)} 
                      style={[styles.input, { paddingTop: 14}]} 
                    >
                      <Text style={[styles.textInput, {textAlign: 'center'}]}>
                        { getDateActual(date) }
                      </Text>
                    </TouchableOpacity>
                    {
                      open && (
                        <DateTimePicker
                          value={date}
                          mode={'date'}
                          display='default'
                          onChange={(e: any, date: any) => onChangeDate(e,date)}
                        />
                      )}
                  </View>

                </View>


                <Text style={styles.textLabel}>
                  Observação:
                </Text>
                <TextInput 
                  style={styles.textArea}
                    value={notes}
                    onChangeText={setNotes}
                />
              </View>

            {
                error.name &&
                  <Text style={[styles.error, { alignSelf: 'center'}]}>
                    Necessário um nome 🤭
                  </Text>
            }
            {
                error.amount &&
                  <Text style={[styles.error, { alignSelf: 'center'}]}>
                    Necessário um valor 🤔
                  </Text>
            }
            {
                error.category &&
                  <Text style={[styles.error, { alignSelf: 'center'}]}>
                    Escolha uma categoria ☺️
                  </Text>
            }
            <View style={styles.wrapperButtons}>                
              
              <RectButton style={styles.buttonSeconday}
                onPress={() => {
                  if(data){
                    removeItem(data.id)
                  }else{
                    resetStates()
                  }
                }}
              >
                <Text style={styles.rectButtonText}>
                  Excluir
                </Text> 
              </RectButton>
              <RectButton 
                style={styles.buttonPrimary}
                onPress={() => {
                  if(data){
                    editTransaction()
                  }else{
                    handleNewTransaction()
                  }
                }}
              >
                <Text style={styles.rectButtonText}>
                  Salvar
                </Text>
              </RectButton>
            </View>

              
            {/* LISTA DE CATEGORIAS */}
            <ModalCategories 
              open={modal} 
              handleOpen={handleModal} 
              setCategory={setCategory}  
            />
            
          </KeyboardAvoidingView>
        </ScrollView>



            </LinearGradient>
          </Animated.View>
      </View>
    </>

  );
}

