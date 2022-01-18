import { Feather } from '@expo/vector-icons'
import React, { useEffect, useRef } from 'react'
import { TouchableOpacity, TouchableOpacityProps, View, Text } from 'react-native'
import { styles } from './styles'
import CardFlip from 'react-native-card-flip';
import theme from '../../global/styles/theme';


interface Props extends TouchableOpacityProps{
    type: "up" | "down"
    handleType: (type: "up" | "down") => void
}

export function CardFlipTransationType({handleType, type} : Props){
    const cardSituation = useRef <CardFlip>(null)
    return(
        <CardFlip 
            style={{height: 60, width: 120}} 
            flipDirection='x' 
            ref={cardSituation} 
        >
            <TouchableOpacity
            style={[styles.buttonSituation,  type == 'up' ? styles.green : styles.red]}
            activeOpacity={0.8}
            onPress={() => {
                type !== 'down' ? handleType("down") : handleType("up")
                cardSituation.current && cardSituation.current.flip()
            }}
            >
                <Text style={[styles.textButton]}>
                    { type == 'up' ? "Entrada" : "Saída" }
                </Text>
                <Feather name="arrow-down-circle" size={24} color={theme.colors.white} />
            </TouchableOpacity>
            
            <TouchableOpacity
            style={[styles.buttonSituation, type == 'up' ? styles.green : styles.red]}
            activeOpacity={0.8}
            onPress={() => {
                type !== 'down' ? handleType("down") : handleType("up")
                cardSituation.current && cardSituation.current.flip()
            }}
            >
                <Text style={[styles.textButton]}>
                    { type == 'up' ? "Entrada" : "Saída" }
                </Text>
                <Feather name="arrow-up-circle" size={24} color={theme.colors.white} />
            </TouchableOpacity>

                   
        </CardFlip>
    )
}