import { StyleSheet } from 'react-native';
import theme from '../../global/styles/theme';

export const styles = StyleSheet.create({

  wrapperButtons:{
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '80%', 
    alignSelf: 'center',
    paddingBottom: 120
  },
  buttonPrimary:{
    padding: 20, 
    width: 150, 
    alignItems: 'center',
    backgroundColor: theme.colors.primary
  },
  buttonSeconday:{
    padding: 20, 
    width: 150, 
    alignItems: 'center',
    backgroundColor: theme.colors.secondary
  },
  textLabel:{
    fontFamily: theme.fonts.regular, 
    fontSize: 14, 
    color: theme.colors.default,
    marginBottom: 10
  },
  textInput:{
    fontFamily: theme.fonts.regular, 
    fontSize: 14, 
    color: theme.colors.default,
  },
  form:{
    width: '100%',
    paddingHorizontal: 20,
    flex: 1
  },
  input:{
    padding: 12,
    height: 50,
    width: '100%',
    backgroundColor: theme.colors.primary_light , //'rgba(233, 74, 95, 0.1)'
    marginBottom: 20,
    color: theme.colors.default
  },
  wrapperHorizontal: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  red:{
    backgroundColor: theme.colors.secondary
  },
  green:{
    backgroundColor:theme.colors.primary
  },
  textArea:{
    padding: 12,
    textAlignVertical: 'top',
    color:theme.colors.default ,
    height: 150,
    width: '100%',
    backgroundColor: theme.colors.primary_light , //'rgba(233, 74, 95, 0.1)'
    marginBottom: 20
  },
  scroll:{
    flex: 1, 
    paddingTop: 20,
  },
  rectButtonText:{
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.white,
    fontSize: 14,
  },
  error:{
    fontFamily: theme.fonts.regular,
    fontSize: 12,
    color:theme.colors.secondary,
    top: -12
  }
})