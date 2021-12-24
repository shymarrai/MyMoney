import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Principal from './src/screens/Principal';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Inter_100Thin,
  Inter_600SemiBold,
  Inter_900Black,
  Inter_300Light,
  Inter_400Regular,
} from '@expo-google-fonts/inter';



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
      <Principal />
    );
  }
}

