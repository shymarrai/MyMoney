import React from 'react'
import { styles } from './styles'
import { Text, View, TouchableOpacity } from 'react-native'
import { TransactionProps } from '../../screens/NewTransaction'
import { Feather } from '@expo/vector-icons'

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
                            color={data.category.color ? data.category.color : '#364869'} 
                            size={20} 
                        />
                }
                <Text style={styles.title}>
                    { data.name && data.name }
                </Text>
                {/* #E94A5A || #6AC694 */}
                <Text style={[styles.price, data.type === 'down' ? {color: '#E94A5A' } : {color: '#6AC694'}]}>
                    { data.type === 'down' && '-'} { data.amount && data.amount }
                </Text>
            </View>
            <Text style={styles.date}>
                { data.date && data.date.slice(0,5) }
            </Text>
            {
                true &&
                <View style={[styles.select,data.type === 'down' ? {backgroundColor: '#E94A5A' } : {backgroundColor: '#6AC694'}]} />
            }
        </TouchableOpacity>
    )
}