import { StyleSheet, Dimensions } from 'react-native'
import { RFValue } from "react-native-responsive-fontsize";

const widthDevice = Dimensions.get("window").width


export const styles = StyleSheet.create({
    modal: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowOffset: { width: 70, height: 70 },
        shadowColor: "#111",
        elevation: 20,
        shadowRadius: 1,
        shadowOpacity: 1.0,
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButton:{
        width: widthDevice - RFValue(60),
        height: 20,
        justifyContent: 'center',
        alignItems: 'flex-end',
        color: '#364869'
    },
    line:{
        backgroundColor: '#DCDCDC',
        height: 8,
        width: 60,
        borderRadius: 4,
        alignSelf: 'center'
    
    },
})

