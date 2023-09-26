import { Feather } from '@expo/vector-icons'
import React, { useEffect, useRef } from 'react'
import { TouchableOpacity, TouchableOpacityProps, View, Text } from 'react-native'
import { styles } from './styles'
import CardFlip from 'react-native-card-flip';
import theme from '../../global/styles/theme';


interface Props extends TouchableOpacityProps{
    handleSituation: (situation: boolean) => void
    situation: boolean
}

export function CardFlipSituation({handleSituation, situation} : Props){
    const cardSituation = useRef <CardFlip>(null)

    
    return(
        <CardFlip 
            style={{height: 60, width: 120}} 
            flipDirection='x' 
            ref={cardSituation} 
        >
            
            <TouchableOpacity
            style={[styles.buttonSituation, situation ? styles.green : styles.red]}
            activeOpacity={0.8}
            onPress={() => {
                situation ? handleSituation(true) :  handleSituation(false)
                cardSituation.current && cardSituation.current.flip()
            }}
            >
                <Text style={[styles.textButton]}>
                    { situation ? "Paga" : "Não Paga"}
                </Text>
                <Feather name={situation ? "check-circle" : "x-circle"} size={24} color={theme.colors.white} />
            </TouchableOpacity>

            <TouchableOpacity
            style={[styles.buttonSituation, situation ? styles.green : styles.red]}
            activeOpacity={0.8}
            onPress={() => {
                situation ? handleSituation(true) :  handleSituation(false)
                cardSituation.current && cardSituation.current.flip()
            }}
            >
                <Text style={[styles.textButton]}>
                    { situation ? "Paga" : "Não Paga"}
                </Text>
                <Feather name={situation ? "check-circle" : "x-circle"}  size={24} color={theme.colors.white} />
            </TouchableOpacity>
                    
        </CardFlip>
    )    
}