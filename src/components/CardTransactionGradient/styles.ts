import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../global/styles/theme';

const SCREEN_WIDTH = Dimensions.get('screen').width
export const styles = StyleSheet.create({
    cardGradient:{
        height: 250,
        paddingHorizontal: 20,
        paddingLeft: 20,
        width: '100%',
        paddingVertical: 50, 
        justifyContent: 'space-between',
        flexDirection: 'row'
                  
      },
      animateGradient:{
        width: SCREEN_WIDTH, 
        height:250, 
        position: 'absolute'
      },
    situation:{
        fontFamily: theme.fonts.light, 
        fontSize: 22, 
        color: theme.colors.white, 
        marginBottom: 20, 
        marginTop: 12
      },
      name:{
        width: SCREEN_WIDTH,
        overflow: 'hidden',
        fontFamily: theme.fonts.light, 
        fontSize: 42, 
        color: theme.colors.white,
        height: 60
      },
      price:{
        fontFamily: theme.fonts.semiBold, 
        fontSize: 48,
        color: theme.colors.white,
        width: SCREEN_WIDTH,
        overflow: 'hidden',
        flexWrap: 'nowrap',
        height: 60
      },
      wrapper:{
        flex:1,
        width: '100%',
        
      },
      containerCategory:{
        width: '100%', 
        flexDirection: 'row', 
      },
      wrapperCategory:{
        flexDirection: 'row', 
        top: 170,
        right: -100
      },
      categoryName:{
        fontFamily: theme.fonts.regular, 
        fontSize: 18, 
        textAlign: 'right', 
        color: theme.colors.white,
        width: 110
      },
      buttonRound:{
        backgroundColor: theme.colors.white, 
        marginHorizontal: 10,
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 100, 
        width: 60, 
        height: 60,
        elevation: 2
      },
      date:{
        fontFamily: theme.fonts.light, 
        fontSize: 22, 
        color: theme.colors.white,
        top: 15 
      }
})