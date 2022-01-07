import React , {useState, useEffect} from 'react';
import { Modal, Animated,  TextInput, Text, TouchableOpacity, View, SafeAreaView, FlatList } from 'react-native';
import { styles } from './styles'
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';

import DatePicker from 'react-native-datepicker';
import { categories } from '../../Utils/categories';

import {useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParamList';
import { CategorySelect } from '../../components/CategorySelect';

type NewTransactionScreenProp = StackNavigationProp<RootStackParamList, 'NewTransaction'>;

export default function NewTransaction() {
  const navigation = useNavigation<NewTransactionScreenProp>();
  const [ animate, setAnimate ] = useState(new Animated.Value(1000))
  const  [ date ,  setDate ]  =  useState<any>( new  Date ( ) ) 
  const [ isFixed, setIsFixed ] = useState(false)
  const [ modal, setModal ] = useState(false)
  const [ category, setCategory ] = useState('Categorias')
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

  })

  function handleModal(){
    setModal(!modal)
  }
  function handleTypeTransaction(type: 'up' | 'down'){
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

      })
    }else{
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
      })
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
          colors={[colors.color_gradient_in, colors.color_gradient_out]}
        >        
          <TouchableOpacity
            style={styles.goBack}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color={colors.color_icon} />
          </TouchableOpacity>

           <View style={[styles.containerBranch]}>
            <Text style={[styles.title, {color: colors.color_icon}]}>
              Nova Transação
            </Text>
          </View>

          <View style={[styles.modal, {shadowColor: colors.color}]}>
            
          <TouchableOpacity
              style={{ flexDirection: 'row', justifyContent: 'flex-end'}}
              activeOpacity={0.8}
              onPress={() => setIsFixed(!isFixed)}
            >

              <Text style={[styles.label, {color: colors.color }]}>
                Fixa
              </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.check, { borderColor: colors.color }]}
                  onPress={() => setIsFixed(!isFixed)}
                >
                  {
                    isFixed &&
                      <View style={{flex: 1, backgroundColor: colors.color_light, borderRadius: 10}} />
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
              />
            </View>

            <View style={styles.fieldSet}>
              <Text style={[styles.label, {color: colors.color}]}>
                Valor
              </Text>
              <TextInput 
                style={[styles.input, {
                  color: colors.color,
                  borderBottomColor: colors.color,
                  backgroundColor: colors.color_light,
                }]} 
                placeholder='R$'
                keyboardType="numeric"
                placeholderTextColor={colors.color}
              />
            </View>


            <View style={styles.fieldSet}>
              <Text style={[styles.label, {color: colors.color }]}>
                Data
              </Text>
              <DatePicker
                showIcon={false}
                androidMode="spinner"
                style={[styles.dateBox, { color: colors.color }]}
                date={date}
                mode="date"
                placeholder="DD/MM/YYYY"
                format="DD/MM/YYYY"
                confirmBtnText="Chọn"
                cancelBtnText="Hủy"
                customStyles={{
                  dateInput: {
                    backgroundColor: colors.color_light,
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.color,
                    
                  },
                }}
              onDateChange={(date) => setDate(date)}
            />
            </View>

            <View style={styles.fieldSet}>
              <CategorySelect title={category}
                backgroundColor={colors.color_light}
                textColor={colors.color}
                onPress={handleModal}
              />

            </View>


          </View>

          <View style={[styles.containerBranch, { top: 20}]}>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.background_outcome, shadowColor: colors.color_icon }]}
                activeOpacity={0.8}
                onPress={() => handleTypeTransaction('down')}
              >
                <Text style={[styles.textButton, { color: colors.text_outcome}]}>
                  Nova Saída
                </Text>
                <AntDesign name="minuscircle" size={24} color={colors.icon_outcome} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.background_income, shadowColor: colors.color_icon}]}
                activeOpacity={0.8}
                onPress={() => handleTypeTransaction('up')}
              >
                <Text style={[styles.textButton, { color: colors.text_income}]}>
                  Nova Entrada
                </Text>
                <AntDesign name="pluscircle" size={24} color={colors.icon_income} />
              </TouchableOpacity>
          </View>

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
                      style={styles.option}
                      onPress={() => {
                        setCategory(item.name)
                        handleModal()
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

