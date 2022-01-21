import { StyleSheet } from 'react-native';
import theme from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,        
      },
      branch:{
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.primary,
        fontSize: 36
      },
      Mybranch:{
        fontFamily: theme.fonts.regular,
        color: theme.colors.default,
        fontSize: 36
      },
      containerBranch:{
        width: '100%',
        flexDirection: 'row',
        alignSelf: 'center', 
        alignItems: 'center',

        justifyContent: 'center',
      },  
    title:{
      fontFamily: theme.fonts.regular,
      color: theme.colors.default,
      fontSize: 16
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
      color: theme.colors.white,
      fontSize: 14,
      marginHorizontal: 10
      
    },
    filter:{
      width: '100%',
      top: -25,
      height: 40,
      paddingHorizontal: 40,
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexDirection: 'row'
    }
})