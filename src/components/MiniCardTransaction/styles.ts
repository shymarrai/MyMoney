import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: '86%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 14,
        shadowColor: '#FFF',
        elevation: 2,
        overflow: 'hidden'
    },
    title:{
        fontFamily: 'Inter_600SemiBold',
        color: '#364869',
        fontSize: 14,
        paddingRight: 10,
        paddingLeft: 6,
        maxWidth: 150,
        overflow: 'hidden'
    },
    price:{
        fontFamily: 'Inter_600SemiBold',
        fontSize: 14,
        maxWidth: 120,
        overflow: 'hidden'
    },
    date:{
        fontFamily: 'Inter_300Light',
        color: '#364869',
        fontSize: 12,
    },

    select:{
        width: 10,
        height: 10,
        borderRadius: 10
    }
})