import { StyleSheet } from 'react-native';
import theme from '../../../global/styles/theme';

export const styles = StyleSheet.create({
    buttonPrimary:{
    padding: 20, 
    width: 150, 
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    alignSelf: 'center',
    top: '55%'
  },
  rectButtonText:{
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.white,
    fontSize: 14,
  },

  container:{
    width: '80%',
    alignSelf: 'center',
    top: '30%'
  },
  greeting:{
    textAlign: "center",
    fontFamily: theme.fonts.regular,
    color: theme.colors.default,
    fontSize: 22
  },
  text:{
    textAlign: "center",
    fontFamily: theme.fonts.light,
    color: theme.colors.default,
    fontSize: 14
  }
})