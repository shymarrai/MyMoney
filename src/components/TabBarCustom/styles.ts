import {Platform, StyleSheet} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../global/styles/theme';

export const styles = StyleSheet.create({
  tabArea:{
    height: Platform.OS === 'ios' ? RFValue(80) : RFValue(60),
    width: '100%',
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    paddingBottom: getBottomSpace(),
    elevation: 15,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40

  },
  tabItem:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItemCenter:{
    width: RFValue(65),
    height: RFValue(65),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: RFValue(50),
    borderWidth: RFValue(8),
    borderStyle: 'solid',
    borderColor: theme.colors.white,
    marginTop:RFValue(-20),
  },
  legend:{
    fontFamily: theme.fonts.regular,
    fontSize: 12
  }
})

