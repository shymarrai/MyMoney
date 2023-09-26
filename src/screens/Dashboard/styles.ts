import { StyleSheet } from 'react-native';
import theme from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,  
    top: -25  
  },
  scroll:{
    width: '100%',
    height: 200,
    top: -30
  },
  infoWrapper:{
    width: '100%',
    alignItems: 'center'
  },
  controls:{
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  month:{
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.default,
    fontSize: 20
  }
})