import { Feather } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, TouchableOpacityProps, View, Text } from 'react-native'
import { styles } from './styles'

interface Props extends TouchableOpacityProps{
    title: string
    textColor: string
    backgroundColor: string
}

export function CategorySelect({ title, textColor, backgroundColor, ...rest} : Props){
    return(
        <TouchableOpacity 
            style={[styles.container, {backgroundColor: backgroundColor }]}
            activeOpacity={0.7}
            {...rest}
        >
            <Text style={[styles.title, {color: textColor}]}>
                { title }
            </Text>
            <Feather name="chevron-down" style={[styles.icon, {color: textColor}]} />

        </TouchableOpacity>
    )
}