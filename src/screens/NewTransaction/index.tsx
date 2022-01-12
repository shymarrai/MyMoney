import React , {useState, useEffect} from 'react';
import { Modal, 
  Animated,  
  TextInput, 
  Text, 
  TouchableOpacity, 
  View, 
  SafeAreaView, 
  FlatList, 
  Alert, 
  KeyboardAvoidingView,
  Dimensions,
  Button,
  Platform
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParamList';

import { styles } from './styles'
import { categories } from '../../Utils/categories';


import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import DatePicker from 'react-native-datepicker';
import uuid from 'react-native-uuid'
import DateTimePicker from '@react-native-community/datetimepicker';
import CurrencyInput from 'react-native-currency-input';
import { CategorySelect } from '../../components/CategorySelect';
import MiniCardTransaction from '../../components/MiniCardTransaction';



export type Category = {
  key: string
  name: string
  icon: any
  color: string
}

export interface TransactionProps{
  name: string;
  amount: string;
  amountFormated: string;
  type: 'up' | 'down';
  category: Category;
  date: string;
  pay: boolean
}

type NewTransactionScreenProp = StackNavigationProp<RootStackParamList, 'NewTransaction'>;

const HEIGHT = Dimensions.get('screen').height
const collectionKey = '@mymoney:transactions';

export default function NewTransaction() {
  const navigation = useNavigation<NewTransactionScreenProp>();
  const [ animate, setAnimate ] = useState(new Animated.Value(1000))
  const [ modal, setModal ] = useState(false)
  const [open, setOpen] = useState(false)
  const  [ date ,  setDate ]  =  useState<any>(new Date()) 
  const [ pay, setPay ] = useState(false)
  const [ category, setCategory ] = useState({
    key: 'category',
    name: 'Categorias',
    icon: '',
    color: ''
  })
  const [ name, setName ] = useState('')
  const [ amount, setAmount ] = useState('')
  const [ amountFormated, setAmountFormated ] = useState('')
  const [ type, setType] = useState('default')
  const [ error, setError ] = useState({
    name: false,
    amount: false,
    category: false
  })
  const [ allTransactions , setAllTransactions ] = useState<any>()

  const [ colors,  setColors ] = useState({
    color: '#364869' ,
    color_light: 'rgba(54, 72, 105,0.1)' ,
    color_icon: '#364869',
    color_gradient_in: '#FFF',
    color_gradient_out: '#f0f0f0',
    icon_outcome: "#FFF",
    text_outcome: "#FFF" ,
    background_outcome: '#E94A5A' ,
    icon_income: "#FFF",
    text_income:"#FFF" ,
    background_income: '#6AC694',
    error: '#E94A5A'

  })

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setOpen(Platform.OS === 'ios');
    setDate(currentDate);
  };

  useEffect(() => {
    if(type === 'down') {
      setColors({
        color: '#E94A5A' ,
        color_light: 'rgba(233, 74, 95, 0.1)' ,
        color_icon: '#FFF',
        color_gradient_in: '#E94A65',
        color_gradient_out: '#E94A5A',
        icon_outcome: '#FFF',
        text_outcome: '#FFF' ,
        background_outcome: 'rgb(77, 24, 33)',
        icon_income: '#6AC694' ,
        text_income: '#6AC694' ,
        background_income: '#FFF',
        error: '#FFF'

      })
    }
    
    if(type === 'up'){
      setColors({
        color: '#6AC694' ,
        color_light: 'rgba(0, 181, 170, 0.2)' ,
        color_icon: '#FFF',
        color_gradient_in: '#7CE3B1',
        color_gradient_out: '#7CC4B1',
        icon_outcome: '#E94A5A',
        text_outcome: '#E94A5A' ,
        background_outcome: '#FFF',
        icon_income: '#FFF' ,
        text_income: '#FFF' ,
        background_income: 'rgb(35, 66, 49) ',
        error: '#FFF'
      })
    }

    if(type === 'default'){
      setColors({
        color: '#364869' ,
        color_light: 'rgba(54, 72, 105,0.1)' ,
        color_icon: '#364869',
        color_gradient_in: '#FFF',
        color_gradient_out: '#f0f0f0',
        icon_outcome: "#FFF",
        text_outcome: "#FFF" ,
        background_outcome: '#E94A5A' ,
        icon_income: "#FFF",
        text_income:"#FFF" ,
        background_income: '#6AC694',
        error: '#E94A5A'
    
      })
    }


  },[type, setType])

  function handleModal(){
    setModal(!modal)
  }

  function getDateActual(date: any){
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const dayformat = day <= 9 ? `0${day}` : day
    const monthformat = month <= 9 ? `0${month+1}` : month

    return `${dayformat}/${monthformat}/${year}`
  }

  async function loadData(){
    const data = await AsyncStorage.getItem(collectionKey)
    setAllTransactions(JSON.parse(data!))
  }


  async function handleNewTransaction(type: 'up' | 'down'){
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
  
    if(category.key === 'category' ){
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
      // date: date.toString().split().indexOf('-') != -1 ? date : getDateActual(),
      date: getDateActual(date),
      isFixed: pay,
      type: type,
      category: category
      
    }
    try{
      const data = await AsyncStorage.getItem(collectionKey)
      const currentData = data ? JSON.parse(data) : []

      const dataFormated = [
        NewTransaction,
        ...currentData
      ]

      await AsyncStorage.setItem(collectionKey, JSON.stringify(dataFormated))
      setType(type)
      setPay(false)
      setCategory({
        key: 'category',
        name: 'Categorias',
        icon: '',
        color: ''
      })
      setName('')
      setAmount('')
      loadData()
      setTimeout(() => {
        setType('default')
      },400)

    }catch(error){
      console.log(error)
      Alert.alert('Não foi possível salvar')
    }
  }

  useEffect(() => {
    // async function removeAll(){
    //   await AsyncStorage.removeItem(collectionKey)
    // }
    // removeAll()

  },[])

  useEffect(() => navigation.addListener('blur', () => {
    loadData()
    Animated.timing(animate, {
        toValue: 1000,
        duration: 300,
        useNativeDriver: true
    }).start();
}), []);



useEffect(() => navigation.addListener('focus', () => {
  setDate(new Date())
  loadData()
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
              justifyContent: 'center',
            }}
            colors={[colors.color_gradient_in, colors.color_gradient_out]}
          >     
            <View style={{flexDirection: 'row', width: '100%'}}>
              <TouchableOpacity
                style={styles.goBack}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="chevron-back" size={24} color={colors.color_icon} />
              </TouchableOpacity>
              <Text style={[styles.title, {color: colors.color_icon}]}>
                Nova Transação
              </Text>
            </View>   
            <KeyboardAvoidingView
            style={{height: HEIGHT - 300 }}
            behavior='height'
            keyboardVerticalOffset={-450}
            >
              <View style={styles.wrapper}>
                <View style={[styles.modal, {shadowColor: colors.color}]}>
                  <TouchableOpacity
                      style={{ flexDirection: 'row', justifyContent: 'flex-end'}}
                      activeOpacity={0.8}
                      onPress={() => setPay(!pay)}
                    >

                      <Text style={[styles.label, {color: colors.color }]}>
                        Paga
                      </Text>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          style={[styles.check, { borderColor: colors.color }]}
                          onPress={() => setPay(!pay)}
                        >
                          {
                            pay &&
                              <View style={{flex: 1, backgroundColor: colors.color, borderRadius: 10}} />
                          }
                        </TouchableOpacity>
                    </TouchableOpacity>


                    <View style={styles.fieldSet}>
                      <Text style={[styles.label, {color: colors.color }]}>
                        Nome
                      </Text>

                      <TextInput 
                        style={[styles.input, {
                          color: colors.color,
                          borderBottomColor: colors.color,
                          backgroundColor: colors.color_light,
                        }]} 
                        placeholder='Digite o nome da despeza'
                        placeholderTextColor={colors.color}
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
                          <Text style={[styles.error, { color: colors.error}]}>
                            Insira um nome
                          </Text>
                      }
                    </View>



                    <View style={styles.fieldSet}>
                      <Text style={[styles.label, {color: colors.color}]}>
                        Valor
                      </Text>
                      {/* <TextInput 
                        style={[styles.input, {
                          color: colors.color,
                          borderBottomColor: colors.color,
                          backgroundColor: colors.color_light,
                        }]} 
                        placeholder='R$'
                        keyboardType="numeric"
                        placeholderTextColor={colors.color}
                        onChangeText={currencyFormat}

                      /> */}
                      <CurrencyInput
                         style={[styles.input, {
                          color: colors.color,
                          borderBottomColor: colors.color,
                          backgroundColor: colors.color_light,
                        }]} 
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
                          <Text style={[styles.error, { color: colors.error}]}>
                            Insira um valor
                          </Text>
                      }
                    </View>


                    <View style={styles.fieldSet}>
                      <Text style={[styles.label, {color: colors.color }]}>
                        Data
                      </Text>

                        <TouchableOpacity
                          onPress={() => setOpen(!open)} 
                          style={[styles.input, {
                            justifyContent: 'center',
                            borderBottomColor: colors.color,
                            backgroundColor: colors.color_light,
                          }]} 
                        >
                          <Text style={{color: colors.color}}>
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
                          )


                        }


                    </View>

                    <View style={styles.fieldSet}>
                      <Text style={[styles.label, {color: colors.color}]}>
                        Categoria
                      </Text>
                      <CategorySelect 
                        title={category.name}
                        backgroundColor={colors.color_light}
                        textColor={colors.color}
                        onPress={handleModal}
                      />
                      {
                        error.category &&
                          <Text style={[styles.error, { color: colors.error}]}>
                            Insira uma categoria
                          </Text>
                      }

                    </View>
                </View>
              <View style={[styles.containerButtons, { top: 0}]}>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.background_outcome, shadowColor: colors.color_icon }]}
                    activeOpacity={0.8}
                    onPress={() => {
                      handleNewTransaction('down')
                    }}
                  >
                    <Text style={[styles.textButton, { color: colors.text_outcome}]}>
                      Inserir Saída
                    </Text>
                    <Feather name="arrow-down-circle" size={24} color={colors.icon_outcome} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.background_income, shadowColor: colors.color_icon}]}
                    activeOpacity={0.8}
                    onPress={() => {
                      handleNewTransaction('up')
                    }}
                  >
                    <Text style={[styles.textButton, { color: colors.text_income}]}>
                      Inserir Entrada
                    </Text>
                    <Feather name="arrow-up-circle" size={24} color={colors.icon_income} />
                  </TouchableOpacity>
              </View>
          
            </View>
          </KeyboardAvoidingView>
            {
              allTransactions != undefined  &&
                <View style={styles.containerCards}>
                  {/* <CardTransaction data={allTransactions[allTransactions.length -1]} /> */}
                  <MiniCardTransaction  data={allTransactions[0]} />
                </View>
            }

            {/* LISTA DE CATEGORIAS */}

            <Modal
              animationType="slide"
              transparent={true}
              visible={modal}
              onRequestClose={() => {
                handleModal()
              }}
              >
              <TouchableOpacity
                activeOpacity={1}
                style={styles.modalWrapper}
                onPress={() => handleModal()}
              >
                <View style={styles.select}>
                  <View style={styles.line} />
                  <FlatList 
                    data={categories}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }: any) => (
                      <TouchableOpacity
                        activeOpacity={0.8} 
                        style={[styles.option, {backgroundColor: colors.color_light}]}
                        onPress={() => {
                          setCategory({
                            key: item.key,
                          name: item.name,
                          icon: item.icon,
                          color: item.color
                          })
                          handleModal()
                          setError({...error, category: false})
                          
                        }}
                      >
                        <Feather name={item.icon} />
                        <Text style={styles.textCategory}>
                          { item.name }
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </TouchableOpacity>
            </Modal>


      


          </LinearGradient>
        </Animated.View>
    </SafeAreaView>

  );
}

