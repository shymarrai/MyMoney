import React, { useEffect} from 'react'
import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { 
  TouchableOpacity, 
  Animated,
  Easing, 
  View, 
  Text,
  Dimensions
} from 'react-native'
import { styles } from './styles'
import { TransactionProps } from '../../screens/CardDetails'
import theme from '../../global/styles/theme'

interface PropsCardTransactionGradient extends TransactionProps{
  handleModal: () => void
}

export function CardTransactionGradient({ name,date, paid, type, amountFormated, category, handleModal }: PropsCardTransactionGradient){
  const COLORS = type === 'up' ? [theme.colors.primary_soft, theme.colors.primary] : [theme.colors.secondary_soft , theme.colors.secondary]
  var COLORSREVERT =  type == 'down' ? [theme.colors.secondary_soft , theme.colors.secondary] : [theme.colors.primary_soft, theme.colors.primary]
  const ANIMATION = new Animated.Value(1000)

  useEffect(() => {
    COLORSREVERT =  [theme.colors.secondary_soft , theme.colors.secondary]
  },[])

  useEffect(() => {
    Animated.timing(ANIMATION, {
    toValue: 0,
    duration: 300,
    easing: Easing.linear,
    useNativeDriver: true,
    }).start()
    
  }, [type])

    return(
        <LinearGradient
          style={styles.cardGradient}
          colors={COLORSREVERT}
          // colors={["rgba(0,0,0,0)", 'rgba(0,0,0,0)']}
        >
          <Animated.View
            style={[styles.animateGradient, {transform: [{translateX: ANIMATION},]}]}
          >
            <LinearGradient
              style={{width: '100%', height:250}}
              colors={COLORS}
              // colors={["red", 'green']}
            />
          </Animated.View>
          <View style={{alignSelf: 'flex-start', width: '50%', top: -30}}>
            <Text style={styles.situation}>
              { paid ? "Paga" : "Não Paga"}
            </Text>
            <Text style={styles.name}>
              { name && name }
            </Text>
            <Text style={[styles.price,{ top: 30 }]}>
              { amountFormated && amountFormated  }
            </Text>
          </View>
        
          <View style={[styles.wrapper]}>
            <View style={styles.containerCategory}>
              <View style={styles.wrapperCategory}>
                {/* <Text style={styles.categoryName}>
                    { category.name }
                  </Text> */}
                <TouchableOpacity 
                    style={styles.buttonRound}
                    activeOpacity={0.8}
                    onPress={handleModal}
                >
                    <Feather name={category.icon ? category.icon : "help-circle"} color={category.color ? category.color : theme.colors.default} size={30}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={[styles.date, { top: -20 }]}>
            { date && date}
          </Text>

        </LinearGradient>
    )
}