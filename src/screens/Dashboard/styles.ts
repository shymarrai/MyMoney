import { StyleSheet } from 'react-native';
import theme from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
      },
      branch:{
        fontFamily: theme.fonts.semiBold,
        color: '#49AA26',
        fontSize: 36
      },
      Mybranch:{
        fontFamily: theme.fonts.regular,
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
      fontFamily: theme.fonts.regular,
      color: '#364869',
      fontSize: 16
    },
    amount:{
      fontFamily: theme.fonts.light,
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
      fontFamily: theme.fonts.semiBold,
      color: '#FFF',
      fontSize: 14,
      marginHorizontal: 10
      
    }
})