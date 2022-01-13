import React, {useState, useEffect, useRef} from 'react';
import { SafeAreaView, Animated, Text, TouchableOpacity, View, ScrollView, Keyboard, ActivityIndicator, TextInput, Platform, KeyboardAvoidingView } from 'react-native';

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
import { RectButton } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableWithoutFeedback } from 'react-native';

type CardDetailsScreenProp = StackNavigationProp<RootStackParamList, 'CardDetails'>;


const collectionKey = '@mymoney:transactions';
export default function CardDetails() {
  const navigation = useNavigation<CardDetailsScreenProp>()
  const [ animate, setAnimate ] = useState(new Animated.Value(100))
  const [ date, setDate] = useState<Date>(new Date())
  const [ open, setOpen ] = useState(false)
  const cardSituation = useRef <CardFlip>(null)

  function getDateActual(date: any){
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const dayformat = day <= 9 ? `0${day}` : day
    const monthformat = month <= 9 ? `0${month+1}` : month

    return `${dayformat}/${monthformat}/${year}`
  }
  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setOpen(Platform.OS === 'ios');
    setDate(currentDate);
  };

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


  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableWithoutFeedback style={{flex:1}} onPress={Keyboard.dismiss}>

      
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
          colors={['#FFF', '#E5E5E5']}
        >
          <LinearGradient
            style={styles.cardGradient}
          // colors={['#F45C43' , '#EB3349']}
            colors={['#4CB8C4', '#3CD3AD']}
          >
            <View style={{alignSelf: 'flex-start'}}>
              <Text style={styles.situation}>
                Paga
              </Text>
              <Text style={styles.name}>
                Luz
              </Text>
              <Text style={styles.price}>
                R$ 100,00
              </Text>
            </View>
            
            <View style={styles.wrapper}>
              <View style={styles.containerCategory}>
                <View style={styles.wrapperCategory}>
                  <Text style={styles.categoryName}>
                    Casa
                  </Text>
                  <TouchableOpacity style={styles.buttonRound}>
                    <Feather name={"home"} color="#FAE043" size={30}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          
            </LinearGradient>

            <TouchableOpacity style={styles.buttonRoundType}>
              {/* <Feather name="arrow-down-circle" size={30} color="#EB3349" /> */}
              <Feather name="arrow-up-circle" size={30} color="#3CD3AD" />
            </TouchableOpacity>

              <ScrollView style={{flex: 1, top: -30}}>
                <KeyboardAvoidingView 
                  style={{flex:1}}
                  behavior='padding'
                  
                >
                
                <View style={styles.form}>

                  <Text style={styles.textLabel}>
                    Nome
                  </Text>
                  <TextInput style={styles.input} />
                  <Text style={styles.textLabel}>
                    Valor
                  </Text>
                  <TextInput style={styles.input} />

                  <View style={[styles.wrapperHorizontal]}>
                    <View>
                      <Text style={styles.textLabel}>
                        Situação
                      </Text>

                      <CardFlip style={{height: 60, width: 120}} flipDirection='x' ref={cardSituation} >
                        <TouchableOpacity
                          style={[styles.buttonSituation, styles.red]}
                          activeOpacity={0.8}
                          onPress={() => {

                            cardSituation.current && cardSituation.current.flip()
                          }}
                        >
                          <Text style={[styles.textButton]}>
                            Não Paga
                          </Text>
                          <Feather name="arrow-down-circle" size={24} color={"#FFF"} />
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                          style={[styles.buttonSituation, styles.green]}
                          activeOpacity={0.8}
                          onPress={() => {
                            cardSituation.current && cardSituation.current.flip()
                          }}
                        >
                          <Text style={[styles.textButton]}>
                            Paga
                          </Text>
                          <Feather name="arrow-up-circle" size={24} color={"#FFF"} />
                        </TouchableOpacity>
                      </CardFlip>
                    </View>

                    <Text style={styles.textLabel}>
                      Categoria
                    </Text>
                  </View>


                  
                  <Text style={styles.textLabel}>
                    Data da transação
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setOpen(!open)} 
                    style={[styles.input]} 
                  >
                    <Text style={styles.textInput}>
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


                  <Text style={styles.textLabel}>
                    Observação:
                  </Text>
                  <TextInput style={styles.textArea}/>
                </View>

                <View style={styles.wrapperButtons}>                
                  
                  <RectButton style={styles.buttonSeconday}>
                    <Text>
                      Excluir
                    </Text> 
                  </RectButton>
                  <RectButton style={styles.buttonPrimary}>
                    <Text>
                      Salvar
                    </Text>
                  </RectButton>
                </View>
                </KeyboardAvoidingView>
              </ScrollView>



            </LinearGradient>
          </Animated.View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
  );
}

