import { StyleSheet } from 'react-native';
import theme from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 2,
        height: 50,
        paddingHorizontal: 14,
    },
    icon:{
        fontSize: 20
    },
    title:{
        fontFamily: theme.fonts.regular,
        fontSize: 14
    }
})