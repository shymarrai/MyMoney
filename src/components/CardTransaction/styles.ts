import { StyleSheet } from 'react-native';
import theme from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        width: '86%',
        backgroundColor: theme.colors.white,
        alignSelf: 'center',
        marginVertical: 4,
        padding: 20,
        paddingTop: 12,
        borderRadius: 14,
        shadowColor: theme.colors.white,
        elevation: 2
    },
    title:{
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.default,
        fontSize: 18,
    },
    price:{
        fontFamily: theme.fonts.semiBold,
        fontSize: 20,
    },
    containerFooterCard:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16
    },
    containerCategory:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon:{
        paddingRight: 2
    },
    categoryName:{
        fontFamily: theme.fonts.regular,
        color: theme.colors.default,
        fontSize: 14,
    },
    date:{
        fontFamily: theme.fonts.light,
        color: theme.colors.default,
        fontSize: 12,
    },

    select:{
        width: 14,
        height: 14,
        borderRadius: 10
    }
})