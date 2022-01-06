import AppLoading from 'expo-app-loading';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',

      },
      goBack:{
        position: 'absolute',
        top: 50,
        left:10,
        padding: 20
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
      },
      fieldSet:{
        width: '100%',
        marginVertical: 10,
        
      },
      label:{
        fontFamily: 'Inter_300Light',
        
        fontSize: 14,
        marginHorizontal: 14

      }, input:{
        height: 40,
        borderRadius: 2,
        borderBottomWidth: 1,
        paddingHorizontal: 14,
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        marginTop: 4

      },
      dateBox:{
        marginTop: 4,
        width: '100%',
      },
      check:{
        width: 18,
        height: 18,
        padding: 1,
        borderRadius: 20,
        borderWidth: 2,
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
        fontSize: 36,
        marginTop: -60
      },
      button:{
        width: 150,
        padding: 12,
        flexDirection:'row',
        justifyContent: 'space-around',
        marginHorizontal: 20,
        borderRadius: 100,
        elevation: 2,
        marginVertical: 25
      },
      textButton:{
        fontFamily: 'Inter_600SemiBold',
        color: '#FFF',
        fontSize: 14,
        
      },
      option:{
        width: 250,
        borderBottomColor: '#364869',
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center'
        
      },
      textCategory:{
        fontFamily: 'Inter_600SemiBold',
        color: '#364869',
        fontSize: 14,
        marginHorizontal: 14
      }
})