import React from 'react'

import {  styles } from './styles'

import Modal from 'react-native-modal'
import { Dimensions, TouchableOpacity, View, ViewProps } from 'react-native'

import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome } from '@expo/vector-icons';

interface ModalProps extends ViewProps{
    isVisible: boolean
    bar?: boolean
    close?: boolean
    height?: number
    setModal: () => void
    style?: object
}
const heightDevice = Dimensions.get("window").height
export function ModalBottom({ children,style, bar, height, close, setModal, isVisible }: ModalProps){

    return(
        <>
            <Modal 
                isVisible={isVisible}
                backdropColor='rgba(3,31,78,0.4)'
                animationInTiming={1000}
                animationOutTiming={1000}
                onBackdropPress={() => setModal()}
                onSwipeComplete={() => setModal()}
                onBackButtonPress={() => setModal()}
                swipeDirection={['down']}
                style={[styles.modal, {top: RFValue(heightDevice / (height ? height : 2.8)), ...style}]}
            >
                <View style={{flex:1, margin: 12, alignItems: 'center'}}>
                    { !bar &&
                        <View style={styles.line} />
                    
                    }
                    { !close &&
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModal()}
                        >
                            <FontAwesome name="close" size={24} color="#364869" />
                        </TouchableOpacity>
                    }
                    
                    { children }
                </View>
        </Modal>
        </>
    )
}