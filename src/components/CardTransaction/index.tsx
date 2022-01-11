import React from 'react'
import { styles } from './styles'
import { Text, View, TouchableOpacity } from 'react-native'
import { TransactionProps } from '../../screens/NewTransaction'
import { Feather } from '@expo/vector-icons'

interface cardTransaction{
    data: TransactionProps
}

export default function CardTransaction({
data
}:cardTransaction){
    return(
        <TouchableOpacity activeOpacity={0.7} style={styles.container}>
            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12}}>
                <Text style={styles.title}>
                    { data.name && data.name }
                </Text>
                
                {
                    data.isFixed &&
                      <View style={[styles.select,data.type === 'down' ? {backgroundColor: '#E94A5A' } : {backgroundColor: '#6AC694'}]} />
                }
            </View>
            {/* #E94A5A || #6AC694 */}
            <Text style={[styles.price, data.type === 'down' ? {color: '#E94A5A' } : {color: '#6AC694'}]}>
                { data.type === 'down' && '-'} { data.amount && `R$ ${data.amount}` }
            </Text>

            <View style={styles.containerFooterCard}>
                <View style={styles.containerCategory}>
                    {
                        data.category &&
                            <Feather name={data.category.icon ? data.category.icon : 'info'} color={data.category.color ? data.category.color : '#364869'} size={20} style={styles.icon}/>
                    }
                    <Text style={styles.categoryName}>
                        { data.category && data.category.name }
                    </Text>
                </View>

                <Text style={styles.date}>
                    { data.date && data.date }
                </Text>
            </View>

        </TouchableOpacity>
    )
}