import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cardGradient:{
    height: 250,
    paddingHorizontal: 20,
    width: '100%',
    paddingVertical: 50, 
    justifyContent: 'space-between',
    flexDirection: 'row'
              
  },
  situation:{
    fontFamily: 'Inter_300Light', 
    fontSize: 22, 
    color: '#FFF', 
    marginBottom: 20, 
    marginTop: 12
  },
  name:{
    fontFamily: 'Inter_300Light', 
    fontSize: 42, 
    color: '#FFF'
  },
  price:{
    fontFamily: 'Inter_600SemiBold', 
    fontSize: 48,
    color: '#FFF'
  },
  wrapper:{
    flex:1,
    width: '100%'
  },
  containerCategory:{
    width: '100%', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end'
  },
  wrapperCategory:{
    flexDirection: 'row', 
    alignItems: 'center'
  },
  categoryName:{
    fontFamily: 'Inter_400Regular', 
    fontSize: 18, 
    textAlign: 'right', 
    color: '#FFF'
  },
  buttonRound:{
    backgroundColor: '#FFF', 
    marginHorizontal: 10,
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 100, 
    width: 60, 
    height: 60
  },
  buttonRoundType:{
    backgroundColor: '#FEFEFE', 
    elevation: 2,
    marginHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center', 
    borderRadius: 100, 
    width: 60, 
    height: 60, 
    alignSelf: 'flex-end', 
    top: -30
  },
  wrapperButtons:{
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '80%', 
    alignSelf: 'center'
  },
  buttonPrimary:{
    padding: 20, 
    width: 150, 
    alignItems: 'center',
    backgroundColor: '#7CE3B1'
  },
  buttonSeconday:{
    padding: 20, 
    width: 150, 
    alignItems: 'center',
    backgroundColor: '#EB3349'
  },
  textLabel:{
    fontFamily: 'Inter_400Regular', 
    fontSize: 14, 
    color: "#364869",
    marginBottom: 10
  },
  textInput:{
    fontFamily: 'Inter_400Regular', 
    fontSize: 14, 
    color: "#364869",
  },
  form:{
    width: '95%',
    paddingHorizontal: 20,
  },
  input:{
    padding: 12,
    height: 50,
    width: '100%',
    backgroundColor: 'rgba(0, 181, 170, 0.2)' , //'rgba(233, 74, 95, 0.1)'
    marginBottom: 20
  },
  wrapperHorizontal: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  buttonSituation:{
    padding: 12,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 100,
    elevation: 2,
  },
  textButton:{
    fontFamily: 'Inter_600SemiBold',
    color: '#FFF',
    fontSize: 14,
    marginHorizontal: 6
  },
  red:{
    backgroundColor: "#EB3349"
  },
  green:{
    backgroundColor: "#3CD3AD"
  },
  textArea:{
    padding: 12,
    textAlignVertical: 'top',
    height: 150,
    width: '100%',
    backgroundColor: 'rgba(0, 181, 170, 0.2)' , //'rgba(233, 74, 95, 0.1)'
    marginBottom: 20
  }
})