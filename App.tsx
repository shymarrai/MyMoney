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
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';


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
          <AdMobBanner
            bannerSize="fullBanner"
            adUnitID="ca-app-pub-3940256099942544/6300978111"  //"ca-app-pub-1630449266026590/8873209626"
            servePersonalizedAds
            onDidFailToReceiveAdWithError={(err) => console.log(err)}
            style={{
              alignSelf: 'center',
            }}
          />
          
        </NavigationContainer>
    );
  }
}

