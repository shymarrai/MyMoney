import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',

      },
      modal:{
        width: 300,
        height: 350,
        borderRadius: 14,
        padding: 30,
        justifyContent: 'space-around',
        backgroundColor: '#FFF',
        alignSelf: 'center',
        elevation: 10,
        shadowColor: '#FFF'
      },
      fieldSet:{
        width: '100%',
        marginVertical: 10,
        
      },
      label:{
        fontFamily: 'Inter_300Light',
        color: '#364869',
        fontSize: 14,
        marginHorizontal: 14

      }, input:{
        height: 40,
        borderBottomColor: 'rgb(233, 74, 95)',
        backgroundColor: 'rgba(233, 74, 95, 0.1)',
        borderRadius: 2,
        borderBottomWidth: 1,
        paddingHorizontal: 14,
        fontFamily: 'Inter_400Regular',
        color: 'rgb(233, 74, 95)',
        fontSize: 14,
        marginTop: 4

      },
      dateBox:{
        marginTop: 4,
        width: '100%',
        color: 'rgb(233, 74, 95)',
      },
      check:{
        width: 18,
        height: 18,
        padding: 1,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'rgb(233, 74, 95)',
        alignSelf: 'center'
      },
      containerBranch:{
        width: '100%',
        flexDirection: 'row',
        alignSelf: 'center', 
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'center',
      },
      title:{
        fontFamily: 'Inter_400Regular',
        color: '#FFF',
        fontSize: 36,
        marginTop: -60
      }
})