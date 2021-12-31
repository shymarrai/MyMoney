import { StatusBar } from 'expo-status-bar';
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
import NewEntrance from './src/screens/NewEntrance';
import NewExpanse from './src/screens/New Expanse';



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
          <Stack.Screen component={Principal} name="Principal" />
          <Stack.Screen component={NewEntrance} name="NewEntrance" />
          <Stack.Screen component={NewExpanse} name="NewExpanse" />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

