import AppLoading from 'expo-app-loading';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',

      },
      goBack:{
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
        marginTop: 12
      },
      fieldSet:{
        width: '100%',
        marginVertical: 10,
        
      },
      label:{
        fontFamily: 'Inter_300Light',
        
        fontSize: 14,
        marginHorizontal: 14

      }, 
      input:{
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
      // containerBranch:{
      //   width: '100%',
      //   flexDirection: 'row',
      //   alignSelf: 'center', 
      //   alignItems: 'center',
      //   marginBottom: 20,
      //   justifyContent: 'center',
      // },
      containerButtons:{
        width: '90%',
        flexDirection: 'row',
        alignSelf: 'center', 
        alignItems: 'flex-end',
        marginBottom: 20,
        justifyContent: 'space-between',
      },
      title:{
        fontFamily: 'Inter_400Regular',
        fontSize: 26,
        alignSelf: 'center',
        marginLeft: '10%'
      },
      button:{
        width: 160,
        padding: 12,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: 10,
        borderRadius: 100,
        elevation: 2,
        marginVertical: 25
      },
      textButton:{
        fontFamily: 'Inter_600SemiBold',
        color: '#FFF',
        fontSize: 14,
        marginHorizontal: 6
      },
      option:{
        width: 280,
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginVertical: 2,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#fafafa"
        
      },
      textCategory:{
        fontFamily: 'Inter_600SemiBold',
        color: '#364869',
        fontSize: 14,
        marginHorizontal: 14
      },
      modalWrapper:{
        flex: 1, 
        width: "100%", 
        alignItems: 'center', 
        justifyContent: 'flex-end'
      },
      select:{
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        height: 300, 
        backgroundColor: '#FFF', 
        width: '100%',
        alignItems: 'center',
        elevation: 10,
        paddingTop: 10,
      },
      line:{
        marginBottom: 20,
        backgroundColor: '#DCDCDC',
        height: 8,
        width: 60,
        borderRadius: 4,
        alignSelf: 'center'
    
    },
    containerCards:{
      width: '100%',
      alignItems: 'center' ,
    },
    wrapper:{
      flex: 1,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: -50
    },
    error:{
      fontFamily: 'Inter_400Regular',
      fontSize: 12,
    }
})