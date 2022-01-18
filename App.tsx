import { StatusBar } from 'expo-status-bar';

import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import React from 'react';

import AppLoading from 'expo-app-loading';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import {
  useFonts,
  Inter_100Thin,
  Inter_600SemiBold,
  Inter_900Black,
  Inter_300Light,
  Inter_400Regular,
} from '@expo-google-fonts/inter';

import Principal from './src/screens/Principal';
import TabBarCustom from './src/components/TabBarCustom';
import Dashboard from './src/screens/Dashboard';
import CardDetails from './src/screens/CardDetails';



export default function App() {
  
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_300Light,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_100Thin
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
        <NavigationContainer>
          <Tab.Navigator
            tabBar={ props => <TabBarCustom {...props} />}
            screenOptions={{
              headerShown: false,
              tabBarHideOnKeyboard:true,
              
            }}
            
          >
            <Tab.Screen component={Principal} name="Principal" />
            <Tab.Screen component={CardDetails} name="CardDetails" />
            <Tab.Screen component={Dashboard} name="Dashboard" />

          </Tab.Navigator>
          
        </NavigationContainer>
    );
  }
}

