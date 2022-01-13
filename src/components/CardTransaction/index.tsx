import React from 'react'
import { styles } from './styles'
import { Text, View, TouchableOpacity, Alert } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { DataListProps } from '../../screens/Principal'
import { TransactionProps } from '../../screens/NewTransaction'
import { Swipeable } from 'react-native-gesture-handler'

interface cardTransaction {
    data: DataListProps
    handlePaid: (id: any) => void
    removeItem: (id: any) => void
}

export default function CardTransaction({
    data,
    handlePaid,
    removeItem
}:cardTransaction){


    const RightActions = () => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => removeItem(data.id)}
                style={{        
                    width: '20%',
                    height: '90%',
                    top: 8,
                    left: '22%',
                    backgroundColor: '#E94A65',
                    borderTopRightRadius: 14,
                    borderBottomRightRadius: 14,
                    shadowColor: '#FFF',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
              <Feather name="trash-2" size={24} color="#FFF" />
          </TouchableOpacity>
        )
       }

    return(
        <Swipeable
            renderRightActions={RightActions}
            containerStyle={{overflow: 'hidden'}}
            overshootRight={false}
            
        >
            <TouchableOpacity 
                activeOpacity={1} 
                style={styles.container}
            >
                <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12}}>
                    <Text style={styles.title}>
                        { data.name && data.name }
                    </Text>
                    
                    {
                        data.paid ?
                            <TouchableOpacity
                                style={{padding: 8, borderRadius: 24, backgroundColor: '#F5F5F5'}}
                                onPress={() => handlePaid(data.id)}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.select,data.type === 'down' ? {backgroundColor: '#E94A5A' } : {backgroundColor: '#6AC694'}]} />
                            </TouchableOpacity>
                        :                    
                            <TouchableOpacity
                            style={{padding: 8, borderRadius: 24, backgroundColor: '#F5F5F5'}}
                                onPress={() => handlePaid(data.id)}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.select,{backgroundColor: 'rgba(54, 72, 105,0.2)'}]} />
                            </TouchableOpacity>
                    }
                </View>
                {/* #E94A5A || #6AC694 */}
                <Text style={[styles.price, data.type === 'down' ? {color: '#E94A5A' } : {color: '#6AC694'}]}>
                    { data.type === 'down' && '-'} { data.amountFormated && `${data.amountFormated}` }
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
        </Swipeable>
    )
}