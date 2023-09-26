import React from 'react'
import { styles } from './styles'
import { Text, View, TouchableOpacity, Alert } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { DataListProps } from '../../screens/Principal'
import { Swipeable } from 'react-native-gesture-handler'
import theme from '../../global/styles/theme'

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../screens/RootStackParamList';

type OptionScreenProp = StackNavigationProp<RootStackParamList>;


interface cardTransaction {
    data: DataListProps
    handlePaid: (id: any) => void
    removeItem: (id: any) => void
    test?: boolean
}

export default function CardTransaction({
    data,
    handlePaid,
    removeItem,
    test
}:cardTransaction){

const navigation = useNavigation <OptionScreenProp>()
    const RightActions = () => {
        return (
            <View style={{flexDirection: 'column', left: 50 }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => removeItem(data.id)}
                    style={{        
                        width: 80,
                        height: '45%',
                        top: 8,
                        left: '22%',
                        backgroundColor:theme.colors.secondary,
                        borderTopRightRadius: 14,
                        shadowColor: theme.colors.white,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Feather name="trash-2" size={24} color={theme.colors.white} />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => test !== true && navigation.navigate("CardDetails", {data: data})}
                    style={{        
                        width:80,
                        height: '45%',
                        top: 8,
                        left: '22%',
                        backgroundColor:theme.colors.secondary_soft,
                        borderBottomRightRadius: 14,
                        shadowColor: theme.colors.white,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Feather name="edit" size={24} color={theme.colors.white} />
                </TouchableOpacity>
            </View>
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
                    
                    <>
                        {
                            data.paid ?
                                <TouchableOpacity
                                style={{padding: 8, borderRadius: 24, backgroundColor: theme.colors.background, flexDirection: 'row', alignItems: 'center'}}
                                onPress={() => handlePaid(data.id)}
                                activeOpacity={0.7}
                                >
                                    <Text style={{paddingHorizontal: 4}}>
                                        Pago
                                    </Text>
                                    <View style={[styles.select,data.type === 'down' ? {backgroundColor: theme.colors.secondary } : {backgroundColor: theme.colors.primary}]} />
                                </TouchableOpacity>
                            :                    
                                <TouchableOpacity
                                style={{padding: 8, borderRadius: 24, backgroundColor: theme.colors.background}}
                                    onPress={() => handlePaid(data.id)}
                                    activeOpacity={0.7}
                                >
                                    <View style={[styles.select,{backgroundColor: theme.colors.default_light}]} />
                                </TouchableOpacity>
                        }
                    </>
                </View>
                
                <Text style={[styles.price, data.type === 'down' ? {color: theme.colors.secondary } : {color: theme.colors.primary}]}>
                    { data.type === 'down' && '-'} { data.amountFormated && `${data.amountFormated}` }
                </Text>

                <View style={styles.containerFooterCard}>
                    <View style={styles.containerCategory}>
                        {
                            data.category &&
                                <Feather name={data.category.icon ? data.category.icon : 'info'} color={data.category.color ? data.category.color : theme.colors.default} size={20} style={styles.icon}/>
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