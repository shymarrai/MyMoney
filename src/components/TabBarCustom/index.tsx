import React, {useEffect, useState} from 'react';
import { View, Keyboard, TouchableOpacity, BackHandler, Text } from 'react-native'
import { styles } from './styles';

import { Entypo, Feather, Foundation } from '@expo/vector-icons'
import { CommonActions } from '@react-navigation/native';
import theme from '../../global/styles/theme';


export default function TabBarCustom({ state, descriptors, navigation }: any) {

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);


  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      
        setKeyboardVisible(true); // or some other action
      
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      
        setKeyboardVisible(false); // or some other action
      
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  

  if(isKeyboardVisible == true){
    return (
      <>
      </>
    )
  }else{
    return (
      <>
        <View style={styles.tabArea}>
          <TouchableOpacity style={styles.tabItem} 
            onPress={() => navigation.dispatch(
              CommonActions.navigate({
                name: 'CardDetails',
                params:{
                  data: ""
                }
              })
            )}
          >
            <Foundation name="list" size={24} color={navigation.getState().index == 1 ? theme.colors.primary : theme.colors.default } />
            <Text style={[styles.legend,{
              color:navigation.getState().index == 1 ? theme.colors.primary : theme.colors.default 
            }]}>
              Cadastro
            </Text>
          </TouchableOpacity>
  
          <View>
            <TouchableOpacity
              onPress={() => navigation.dispatch(
                CommonActions.navigate({
                  name: 'Principal',
                })
              )}
              activeOpacity={1}
              style={[
                styles.tabItemCenter,
                {
                  backgroundColor: navigation.getState().index == 0 ? theme.colors.primary : theme.colors.default
                }
              ]}
            >
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 60,
                height: 60,
                borderRadius: 40,
                
              }}>
                <Feather name="grid" size={20} color={theme.colors.white} style={{zIndex: 1}}/>
              </View>
            </TouchableOpacity>
              <Text 
                style={[styles.legend,{
                  top: -10,
                  alignSelf: 'center',
                  color:navigation.getState().index == 0 ? theme.colors.primary : theme.colors.default 
                }]}
              >
                Principal
              </Text>
          </View>

          
  
          <TouchableOpacity style={styles.tabItem}
            onPress={() => navigation.dispatch(
              CommonActions.navigate({
                name: 'Dashboard',
              })
            )}
          >
            <Entypo name="bar-graph" size={24} color={navigation.getState().index == 2 ? theme.colors.primary : theme.colors.default } />
            <Text style={[styles.legend,{
              color:navigation.getState().index == 2 ? theme.colors.primary : theme.colors.default 
            }]}>
              Resumo
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );

  }

}
