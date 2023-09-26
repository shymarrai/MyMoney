import React, {useState, useEffect, useRef} from 'react';
import { Animated, Text, TouchableOpacity, View, ScrollView } from 'react-native';

import { styles } from './styles'
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native'

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParamList';
import { addMonths, subMonths } from 'date-fns';
import theme from '../../global/styles/theme';
import HistoryCard from '../../components/HistoryCard';
import { DataListProps } from '../Principal';
import { categories } from '../../Utils/categories';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { format } from 'date-fns/esm';
import { ptBR } from 'date-fns/locale';

type DashboardScreenProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

interface CategoryData{
  key: string
  name: string;
  totalFormated: string
  total: number
  color: string,
  percent: string
  icon: string
}

const collectionKey = '@mymoney:transactions';
export default function Dashboard() {
  const navigation = useNavigation<DashboardScreenProp>()
  const [ animate, setAnimate ] = useState(new Animated.Value(100))

  const [ selectedDate, setSelectedDate ] = useState(new Date())
  const [ totalByCategories, setTotalByCategories ] = useState <CategoryData[]>([])

  function handleDateChange(action: 'next' | 'prev'){
    if(action === 'next'){
      setSelectedDate(addMonths(selectedDate, 1))
    }else{
      setSelectedDate(subMonths(selectedDate, 1))

    }

  }

  function formatDate(date: string){
    const stringDate = date

    const day = stringDate.slice(0,2) 
    const month = stringDate.slice(3,6)
    const year = stringDate.slice(5,stringDate.length)

    return month + day + year
  }

  async function loadData(){
    const response = await AsyncStorage.getItem(collectionKey)
    const responseFormated = response ? JSON.parse(response) : []


    const expensives = responseFormated.filter((expensive: DataListProps) => (
      expensive.type == 'down' &&
      new Date(formatDate(expensive.date)).getMonth() === selectedDate.getMonth() &&
      new Date(formatDate(expensive.date)).getFullYear() === selectedDate.getFullYear()
      ))

      
    const expensivesTotal = expensives.reduce((acumullator: number, expensive: DataListProps) => {
      return acumullator + Number(expensive.amount)
    }, 0)

    const totalByCategory: CategoryData[] = []

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: DataListProps) => {
        if(expensive.category.key === category.key){
          categorySum += Number(expensive.amount)
        }
      })
      if(categorySum > 0){
        const total = categorySum.toLocaleString('pt-BR',{
          style: 'currency',
          currency: "BRL"
        })

        const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`

        const name = category.name
        const color = category.color
        const key = category.key

        totalByCategory.push({
          key: key,
          name: name,
          totalFormated: total,
          total: categorySum,
          percent: percent,
          icon: category.icon,
          color: color
        })
      }
    })

    setTotalByCategories(totalByCategory)
  }



  useEffect(() => navigation.addListener('blur', () => {
    setTotalByCategories([])
      Animated.timing(animate, {
        toValue: 1000,
        duration: 300,
        useNativeDriver: true
    }).start();
  }), []);

  useEffect(() => {
    loadData()
  },[selectedDate])
  

  useEffect(() => navigation.addListener('focus', () => {
    loadData()
    Animated.timing(animate, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
    
    
  }), []);


  return (
    <ScrollView
      nestedScrollEnabled={true}
      style={{flex: 1}}
      contentContainerStyle={{flexGrow: 1}}
    >

    
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
            paddingVertical: 60, 
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
          colors={[theme.colors.shape_soft, theme.colors.shape]}
        >

        <View
          style={styles.controls}
        >
          <BorderlessButton
            onPress={() => handleDateChange('prev')}
          >
            <Feather name={'chevron-left'} size={30} color={theme.colors.default} />
          </BorderlessButton>

          <Text style={styles.month}>
            { format(selectedDate, 'MMMM, yyyy',{ locale: ptBR}) }
          </Text>

          <BorderlessButton
            onPress={() => handleDateChange('next')}
          >
          <Feather name={'chevron-right'} size={30} color={theme.colors.default} />
          </BorderlessButton>

        </View>

          <View
            style={styles.infoWrapper}
          >
            <VictoryPie 
              data={totalByCategories}
              colorScale={totalByCategories.map(category => category.color)}
              style={{
                labels: { 
                  fontSize: 18 ,
                  fontWeight: "bold",
                  fill: theme.colors.white
                },
              }}
              labelRadius={50}
              x="percent"
              y="total"
            /> 
          </View>

          <ScrollView
            nestedScrollEnabled={true}
            style={styles.scroll}
            contentContainerStyle={{padding: 20, paddingBottom: 50}}
            >
            
            {
              totalByCategories.map(item => (
                <HistoryCard
                  key={item.key}
                  icon={item.icon}
                  name={item.name}
                  price={item.totalFormated}
                  color={item.color}
                />
              ))
            }
          </ScrollView>
          </LinearGradient>
        </Animated.View>
      </View>
    </ScrollView>

  );
}

