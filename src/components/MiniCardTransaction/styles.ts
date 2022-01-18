import { StyleSheet } from 'react-native';
import theme from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        width: '86%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 14,
        shadowColor: theme.colors.white,
        elevation: 2,
        overflow: 'hidden'
    },
    title:{
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.default,
        fontSize: 14,
        paddingRight: 10,
        paddingLeft: 6,
        maxWidth: 150,
        overflow: 'hidden'
    },
    price:{
        fontFamily: theme.fonts.semiBold,
        fontSize: 14,
        maxWidth: 120,
        overflow: 'hidden'
    },
    date:{
        fontFamily: theme.fonts.light,
        color: theme.colors.default,
        fontSize: 12,
    },

    select:{
        width: 10,
        height: 10,
        borderRadius: 10
    }
})