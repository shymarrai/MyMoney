import React, {useState, useEffect, useRef} from 'react';
import {Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles'
import theme from '../../global/styles/theme';
import { Feather } from '@expo/vector-icons';

interface Props{
    name: string,
    price: string,
    color: string
    icon: any
}

export default function HistoryCard({
    name,
    price,
    icon,
    color
}: Props) {
    return(
        <View
            style={[styles.card,{
                borderLeftWidth: 5,
                borderLeftColor: color
            }]}
        >
            <View
                style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
            >
                <Feather name={icon} color={color} size={18} />
                <Text
                    style={styles.name}
                >
                { name }
                </Text>
            </View>

            <Text
                style={styles.price}
            >
                { price }
            </Text>
        </View>
    )
}