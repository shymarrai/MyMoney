import { Feather } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, TouchableOpacityProps, View, Text, Modal, FlatList } from 'react-native'
import { styles } from './styles'
import { categories } from '../../Utils/categories';

interface CategoriesProps {
    key: string,
    name: string,
    icon: string,
    color: string,
}

interface Props extends TouchableOpacityProps{
    open: boolean;
    handleOpen: () => void
    setCategory : ({}:CategoriesProps) => void
}

export function ModalCategories({ open, handleOpen, setCategory} : Props){
    
    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => {
            handleOpen()
        }}
        >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalWrapper}
          onPress={() => handleOpen()}
        >
          <View style={styles.select}>
            <View style={styles.line} />
              <FlatList 
                data={categories}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.key}
                renderItem={({ item }: any) => (
                  <TouchableOpacity
                    activeOpacity={0.8} 
                    style={[styles.option]}
                    onPress={() => {
                    setCategory({
                        key: item.key,
                        name: item.name,
                        icon: item.icon,
                        color: item.color
                    })
                      handleOpen()                              
                    }}
                  >
                      <Feather name={item.icon} color={item.color} size={18}/>
                      <Text style={styles.textCategory}>
                        { item.name }
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableOpacity>
          </Modal>

    )
}