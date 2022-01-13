import { StatusBar } from 'expo-status-bar';

import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import React from 'react';
import AppLoading from 'expo-app-loading';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import {
  useFonts,
  Inter_100Thin,
  Inter_600SemiBold,
  Inter_900Black,
  Inter_300Light,
  Inter_400Regular,
} from '@expo-google-fonts/inter';

import Principal from './src/screens/Principal';
import NewTransaction from './src/screens/NewTransaction';
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
          <Stack.Navigator
            screenOptions={{headerShown: false}}
          >
            <Stack.Screen component={CardDetails} name="CardDetails" />
            <Stack.Screen component={Principal} name="Principal" />
            <Stack.Screen component={NewTransaction} name="NewTransaction" />
            <Stack.Screen component={Dashboard} name="Dashboard" />

          </Stack.Navigator>
          <TabBarCustom />
        </NavigationContainer>
    );
  }
}

