import React , {useState, useEffect} from 'react';
import { ScrollView, Animated,  TextInput, Text, TouchableOpacity, View, SafeAreaView, NativeEventEmitter, FlatList } from 'react-native';

import { styles } from './styles'
import { LinearGradient } from 'expo-linear-gradient';
import { Feather,FontAwesome5, Ionicons, AntDesign } from '@expo/vector-icons';

import DatePicker from 'react-native-datepicker';
import { formatNumber } from '../../services/format';
import CurrencyInput from 'react-native-currency-input';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParamList';

type NewEntranceScreenProp = StackNavigationProp<RootStackParamList, 'NewEntrance'>;

type EntranceProps ={
  key: number
  name: string
  value: string
  isFixed: boolean
  date: string
}

export default function NewEntrance() {
  const navigation = useNavigation<NewEntranceScreenProp>();
  const [ animate, setAnimate ] = useState(new Animated.Value(1000))
  const [ date ,  setDate ]  =  useState<any>( new  Date ()) 
  const [ numberFormat, setNumberFormat ] = useState<any>()
  const [ name, setName ] = useState('')
  const [ isFixed, setIsFixed ] = useState<boolean>(false)
  const [ newEntrance, setNewEntrance ] = useState<EntranceProps>()
  const [ entrances, setEntrances ] = useState<any>()
  const [ keys, setKeys ] = useState<any>()


  function clearInput(){
    setName('')
    setIsFixed(false)
    setNumberFormat('')
    setDate(new  Date ())
  }
  const handleInsertEntrance = async () => {
    const id = Number(new Date())
    try {
      setNewEntrance({
        key: id,
        name: name,
        value: numberFormat,
        isFixed: isFixed,
        date: date
      })
      if(newEntrance){
        var teste = ['']
        const entranceStringfied = JSON.stringify(newEntrance)
        await AsyncStorage.setItem( String(id)  , entranceStringfied)
        clearInput()
        const allkeys = getKeys()
        setKeys(allkeys)
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function getKeys(){
      try{
        const allKeys = await AsyncStorage.getAllKeys();
        allKeys.map(async (key: string) => {
          await AsyncStorage.getItem(key).then(jsonValue => {
            if(jsonValue != null){
              const entrance = JSON.parse(jsonValue)
              const entrances = [...entrance]
              console.log(entrances)
            }
          })
        })
      }catch(e){
        console.log(e)
      }
  }



  useEffect(() => navigation.addListener('blur', () => {

    Animated.timing(animate, {
        toValue: 1000,
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
            colors={['#7CE3B1', '#7CC4B1']}
        >
          <TouchableOpacity
            style={styles.goBack}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>

           <View style={[styles.containerBranch]}>
            <Text style={styles.title}>
              Novo Ganho
            </Text>
          </View>

          <View style={styles.modal}>
            <View style={styles.fieldSet}>
              <Text style={styles.label}>
                Nome
              </Text>
              <TextInput 
                style={styles.input} 
                placeholder='Digite o nome do ganho'
                placeholderTextColor={'rgb(0, 181, 170)'}
                onChange={(text) => setName(String(text.nativeEvent.text))}
                value={name}
              />
            </View>

            <View style={styles.fieldSet}>
              <Text style={styles.label}>
                Valor
              </Text>
              <CurrencyInput
                style={styles.input}
                placeholderTextColor={'rgb(0, 181, 170)'}
                keyboardType='number-pad'
                placeholder='R$'
                value={numberFormat}
                onChangeValue={setNumberFormat}
                prefix="R$ "
                delimiter=","
                separator="."
                precision={2}
                
            />
            </View>

            <TouchableOpacity
              style={[styles.fieldSet, { flexDirection: 'row', justifyContent: 'center', marginVertical: 24}]}
              activeOpacity={0.8}
              onPress={() => setIsFixed(!isFixed)}
            >

              <Text style={styles.label}>
                Fixa
              </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.check}
                  onPress={() => setIsFixed(!isFixed)}
                >
                  {
                    isFixed &&
                      <View style={{flex: 1, backgroundColor: 'rgba(0, 181, 170, 0.4)', borderRadius: 10}} />
                  }
                </TouchableOpacity>
            </TouchableOpacity>

            <View style={styles.fieldSet}>
              <Text style={styles.label}>
                Data
              </Text>
              <DatePicker
                showIcon={false}
                androidMode="spinner"
                style={styles.dateBox}
                date={date}
                mode="date"
                placeholder="DD/MM/YYYY"
                format="DD/MM/YYYY"
                confirmBtnText="Chọn"
                cancelBtnText="Hủy"
                customStyles={{
                  dateInput: {
                    backgroundColor: 'rgba(0, 181, 170, 0.1)',
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgb(0, 181, 170)',
                    
                  },
                }}
                onDateChange={(date) => setDate(date)}
              />
            </View>

          </View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#FFF' }]}
            activeOpacity={0.8}
            onPress={handleInsertEntrance}
          >
            <Text style={styles.textButton}>
              Inserir
            </Text>
            <AntDesign name="pluscircle" size={24} color="#6AC694" />
          </TouchableOpacity>

        </LinearGradient>
      </Animated.View>
    </SafeAreaView>
  );
}

