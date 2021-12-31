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
        width: '90%',
        height: 120,
        backgroundColor: '#fff',
        marginVertical: 6,
        borderRadius: 10,
        elevation: 2,
        padding: 20,
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
      backgroundColor: 'red',
      width: 150,
      padding: 12,
      flexDirection:'row',
      justifyContent: 'space-around',
      marginHorizontal: 20,
      borderRadius: 100,
      elevation: 2
    },
    textButton:{
      fontFamily: 'Inter_600SemiBold',
      color: '#FFF',
      fontSize: 14,
      
    }
})