import { StyleSheet } from 'react-native';
import theme from '../../global/styles/theme';

export const styles = StyleSheet.create({
  card:{
    width: 280,
    height: 120,
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
    color: theme.colors.default,
    fontSize: 16
  },
  amount:{
    fontFamily: theme.fonts.light,
    color: theme.colors.default,
    fontSize: 36
  },
})