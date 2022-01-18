import React from 'react'
import { styles } from './styles'
import { Text, View, TouchableOpacity } from 'react-native'
import { TransactionProps } from '../../screens/CardDetails'
import { Feather } from '@expo/vector-icons'
import theme from '../../global/styles/theme'

interface cardTransaction{
    data: TransactionProps
}

export default function MiniCardTransaction({
data
}:cardTransaction){
    return(
        <TouchableOpacity activeOpacity={0.7} style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                {
                    data.category &&
                        <Feather 
                            name={data.category.icon ? data.category.icon : 'info'} 
                            color={data.category.color ? data.category.color : theme.colors.default} 
                            size={20} 
                        />
                }
                <Text style={styles.title}>
                    { data.name && data.name }
                </Text>
                
                <Text style={[styles.price, data.type === 'down' ? {color: theme.colors.secondary } : {color: theme.colors.primary}]}>
                    { data.type === 'down' && '-'} { data.amountFormated && data.amountFormated }
                </Text>
            </View>
            <Text style={styles.date}>
                { data.date && String(data.date).slice(0,5) }
            </Text>
            {
                data.paid &&
                    <View style={[styles.select,data.type === 'down' ? {backgroundColor: theme.colors.secondary} : {backgroundColor: theme.colors.primary}]} />
            }
        </TouchableOpacity>
    )
}