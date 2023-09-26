import { StyleSheet } from 'react-native';
import theme from '../../global/styles/theme';

export const styles = StyleSheet.create({
    buttonSituation:{
        padding: 12,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 100,
        elevation: 2,
      },
      textButton:{
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.white,
        fontSize: 14,
        marginHorizontal: 6
      },
      red:{
        backgroundColor: theme.colors.secondary
      },
      green:{
        backgroundColor: theme.colors.primary
      },
})