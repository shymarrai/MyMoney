import { StyleSheet } from 'react-native';
import theme from '../../global/styles/theme';

export const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4
      
    },
  name:{
    fontFamily: theme.fonts.regular,
    color: theme.colors.default,
    fontSize: 16,
    paddingHorizontal: 10
  },
  price:{
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.default,
    fontSize: 16,
  }
})