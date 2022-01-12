import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: '86%',
        backgroundColor: '#FFF',
        alignSelf: 'center',
        marginVertical: 4,
        padding: 20,
        paddingTop: 12,
        borderRadius: 14,
        shadowColor: '#FFF',
        elevation: 2
    },
    title:{
        fontFamily: 'Inter_600SemiBold',
        color: '#364869',
        fontSize: 18,
    },
    price:{
        fontFamily: 'Inter_600SemiBold',
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
        fontFamily: 'Inter_400Regular',
        color: '#364869',
        fontSize: 14,
    },
    date:{
        fontFamily: 'Inter_300Light',
        color: '#364869',
        fontSize: 12,
    },

    select:{
        width: 14,
        height: 14,
        borderRadius: 10
    }
})