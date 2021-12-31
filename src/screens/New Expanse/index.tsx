import React , {useState, useEffect} from 'react';
import { ScrollView, Animated,  TextInput, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';

import { styles } from './styles'
import { LinearGradient } from 'expo-linear-gradient';
import { Feather,FontAwesome5, AntDesign } from '@expo/vector-icons';

import DatePicker from 'react-native-datepicker';

import {useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParamList';

type NewEntranceScreenProp = StackNavigationProp<RootStackParamList, 'NewEntrance'>;

export default function NewEntrance() {
  const navigation = useNavigation<NewEntranceScreenProp>();
  const [ animate, setAnimate ] = useState(new Animated.Value(1000))
  const  [ date ,  setDate ]  =  useState<any>( new  Date ( ) ) 
  const [ isFixed, setIsFixed ] = useState(false)

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
          colors={['#E94A65', '#E94A5A']}
        >
           <View style={[styles.containerBranch]}>
            <Text style={styles.title}>
              Nova Despeza
            </Text>
          </View>

          <View style={styles.modal}>
            <View style={styles.fieldSet}>
              <Text style={styles.label}>
                Nome
              </Text>
              <TextInput 
                style={styles.input} 
                placeholder='Digite o nome da despeza'
                placeholderTextColor={'rgb(233, 74, 95)'}
              />
            </View>

            <View style={styles.fieldSet}>
              <Text style={styles.label}>
                Valor
              </Text>
              <TextInput 
                style={styles.input} 
                placeholder='R$'
                placeholderTextColor={'rgb(233, 74, 95)'}
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
                      <View style={{flex: 1, backgroundColor: 'rgba(233, 74, 95, 0.4)', borderRadius: 10}} />
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
                    backgroundColor: 'rgba(233, 74, 95, 0.1)',
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgb(233, 74, 95)',
                    
                  },
                }}
              onDateChange={(date) => setDate(date)}
        />
            </View>

          </View>

        </LinearGradient>
      </Animated.View>
    </SafeAreaView>
  );
}

