import { StatusBar } from 'expo-status-bar';

import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import React, { useState } from 'react';

import AppLoading from 'expo-app-loading';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

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
import IntroMyMoney from './src/screens/IntroStack/IntroMyMoney';
import IntroPrincipal from './src/screens/IntroStack/IntroPrincipal';

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
import IntroDelete from './src/screens/IntroStack/IntroDelete';



export default function App() {
  const [intro, setIntro] = useState(false)


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
          {
            !intro &&
              <>
                <AdMobBanner
                  bannerSize="fullBanner"
                  adUnitID="ca-app-pub-1630449266026590/8873209626"  // teste ca-app-pub-3940256099942544/6300978111
                  servePersonalizedAds
                  onDidFailToReceiveAdWithError={(err) => console.log(err)}
                  style={{
                    alignSelf: 'center',
                    top: 60,
                    height: 110,
                  }}
                />
              </>
          }
          <Tab.Navigator
            tabBar={ props => {
              if(props.navigation.getState().index < 3){
                setIntro(false)
                return (
                  <TabBarCustom {...props} />
                )
              }else{
                setIntro(true)
              }
          }}
            screenOptions={{
              headerShown: false,
              tabBarHideOnKeyboard:true,
              
            }}
            
            >
            <Tab.Screen component={Principal} name="Principal" />
            <Tab.Screen component={CardDetails} name="CardDetails" />
            <Tab.Screen component={Dashboard} name="Dashboard" />
            <Tab.Screen component={IntroMyMoney} name="IntroMyMoney" />
            <Tab.Screen component={IntroPrincipal} name="IntroPrincipal" />
            <Tab.Screen component={IntroDelete} name="IntroDelete" />

          </Tab.Navigator>
          
        </NavigationContainer>
    );
  }


}
