import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
      },
      branch:{
        fontFamily: 'Inter_600SemiBold',
        color: '#49AA26',
        fontSize: 36
      },
      Mybranch:{
        fontFamily: 'Inter_400Regular',
        color: '#364869',
        fontSize: 36
      },
      containerBranch:{
        width: '100%',
        flexDirection: 'row',
        alignSelf: 'center', 
        alignItems: 'center',

        justifyContent: 'center',
      },
      card:{
        width: 280,
        height: 120,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 2,
        padding: 20,
        alignSelf: 'center',
        marginTop: '4%'
    },
    cardFlipContainer:{
        width: 280,
        marginHorizontal: 10,
        marginVertical: 6,
        alignItems: 'center',
        justifyContent: 'center',
        height: 140,
        borderRadius: 10,
    },
    title:{
      fontFamily: 'Inter_400Regular',
      color: '#364869',
      fontSize: 16
    },
    amount:{
      fontFamily: 'Inter_300Light',
      color: '#364869',
      fontSize: 36
    },
    button:{
      padding: 12,
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginHorizontal: 20,
      borderRadius: 100,
      elevation: 2
    },
    textButton:{
      fontFamily: 'Inter_600SemiBold',
      color: '#FFF',
      fontSize: 14,
      marginHorizontal: 10
      
    }
})