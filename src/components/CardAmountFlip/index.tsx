import { Feather } from '@expo/vector-icons'
import React, { useRef } from 'react'
import { TouchableOpacity, TouchableOpacityProps, View, Text } from 'react-native'
import { styles } from './styles'
import CardFlip from 'react-native-card-flip';
import theme from '../../global/styles/theme';
import Load from '../Load';

interface Props extends TouchableOpacityProps{
  amount: number
  NoPaid: number
  Paid: number
  title: "Entradas" | "Saídas" | "Restantes"
  isLoading?: boolean
}

export function CardAmountFlip({  amount, NoPaid, Paid, title, isLoading ,...rest} : Props){
  const cardPrimary = useRef <CardFlip>(null)
  const cardSecondary = useRef <CardFlip>(null)
    return(
        <CardFlip ref={cardPrimary} style={[styles.cardFlipContainer]}>
          <TouchableOpacity 
            style={[styles.card,{ backgroundColor: title === "Restantes" ? theme.colors.primary  : theme.colors.white }]}
            activeOpacity={0.8}
            onPress={() => {
              if(cardPrimary.current){
                cardPrimary.current.flip()
              }
            }}
          >
            <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={[styles.title,  title === "Restantes" && { color: theme.colors.white}]}>
                { title }
              </Text>
                  {
                    title === "Entradas" &&
                    <Feather name="arrow-up-circle" size={24} color={theme.colors.primary } />
                  }
                  {
                    title === "Saídas" &&
                      <Feather name="arrow-down-circle" size={24} color={theme.colors.secondary} />
                  }
                  {
                    title === "Restantes" &&
                      <Feather name="dollar-sign" size={24} color={theme.colors.white} />
                  }
            </View>

            <View style={{flex:1, justifyContent: 'center' }}>

              {
                isLoading ?
                  <Load />

                :

                  <Text style={[styles.amount,  title === "Restantes" && { color: theme.colors.white}]}>

                    { amount.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                      }) 
                    }

                  </Text>
              }
            </View>
          </TouchableOpacity>
          <CardFlip ref={cardSecondary} style={[styles.cardFlipContainer,{ marginVertical: 0}]}>
            <TouchableOpacity 
              style={[styles.card,{ backgroundColor: title === "Restantes" ? theme.colors.primary   : theme.colors.white}]}
              activeOpacity={0.8}
              onPress={() => {
                if(cardSecondary.current){
                  cardSecondary.current.flip()
                }
              }}
            >
              <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <Text style={[styles.title,  title === "Restantes" && { color: theme.colors.white}]}>
                  { title }(Pagas)
                </Text>
                  {
                  title === "Entradas" &&
                    <Feather name="arrow-up-circle" size={24} color={theme.colors.primary } />
                  }
                  {
                    title === "Saídas" &&
                      <Feather name="arrow-down-circle" size={24} color={theme.colors.secondary} />
                  }
                  {
                    title === "Restantes" &&
                      <Feather name="dollar-sign" size={24} color={theme.colors.white} />
                  }
              </View>

              <View style={{flex:1, justifyContent: 'center' }}>

                {
                  isLoading ?
                    <Load />

                  :
                    <Text style={[styles.amount,  title === "Restantes" && { color: theme.colors.white}]}>

                      { Paid.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                        }) 
                      }

                    </Text>
                }

              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.card,{ backgroundColor: title === "Restantes" ? theme.colors.primary   : theme.colors.white}]}
              activeOpacity={0.8}
              onPress={() => {
                if(cardPrimary.current){
                  cardPrimary.current.flip()
                  cardSecondary.current && cardSecondary.current.flip()
                }
              }}
            >
            <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={[styles.title,  title === "Restantes" && { color: theme.colors.white}]}>
                { title }(Não Pagas)
              </Text>
              {
                title === "Entradas" &&
                  <Feather name="arrow-up-circle" size={24} color={theme.colors.primary } />
              }
              {
                title === "Saídas" &&
                  <Feather name="arrow-down-circle" size={24} color={theme.colors.secondary} />
              }
              {
                title === "Restantes" &&
                  <Feather name="dollar-sign" size={24} color={theme.colors.white} />
              }
            </View>

            <View style={{flex:1, justifyContent: 'center' }}>

              {
                  isLoading ?
                  <Load />

                  :

                    <Text style={[styles.amount,  title === "Restantes" && { color: theme.colors.white}]}>

                      { NoPaid.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                        }) 
                      }

                    </Text>
                }


            </View>
          </TouchableOpacity>

        </CardFlip>

      </CardFlip>
    )
}