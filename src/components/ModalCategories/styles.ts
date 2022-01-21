import { StyleSheet } from 'react-native';
import theme from '../../global/styles/theme';

export const styles = StyleSheet.create({
    textCategory:{
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.default,
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
        backgroundColor: theme.colors.white, 
        width: '100%',
        alignItems: 'center',
        elevation: 10,
        paddingTop: 10,
      },
      line:{
        marginBottom: 20,
        backgroundColor: theme.colors.shape_soft,
        height: 8,
        width: 60,
        borderRadius: 4,
        alignSelf: 'center'
    
      },
      option:{
        width: 280,
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginVertical: 2,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.background
        
      },

})