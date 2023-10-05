import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import React, { useCallback, useEffect, useState } from 'react';


import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as SplashScreen from 'expo-splash-screen';

const Tab = createBottomTabNavigator();

import {
  useFonts,
  Inter_100Thin,
  Inter_600SemiBold,
  Inter_900Black,
  Inter_300Light,
} from '@expo-google-fonts/inter';

import Principal from './src/screens/Principal';
import TabBarCustom from './src/components/TabBarCustom';
import Dashboard from './src/screens/Dashboard';
import CardDetails from './src/screens/CardDetails';
import IntroMyMoney from './src/screens/IntroStack/IntroMyMoney';
import IntroPrincipal from './src/screens/IntroStack/IntroPrincipal';
import IntroDelete from './src/screens/IntroStack/IntroDelete';
// import { AppOpenAd, InterstitialAd, RewardedAd, BannerAd, TestIds } from 'react-native-google-mobile-ads';



// const adUnitId = __DEV__ ? TestIds.APP_OPEN : 'ca-app-pub-1630449266026590~2499372965'
export default function App() {

  const [intro, setIntro] = useState(false)
  const [appIsReady, setAppIsReady] = useState(false);

  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_300Light,
    Inter_600SemiBold,
    Inter_100Thin
  });

  useEffect(() => {
    setIntro(false)
  },[])

  

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        
        // // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font);

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

    return (
      <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <NavigationContainer>
            {
              !intro &&
                <>
                  {/* <AdMobBanner
                    bannerSize="fullBanner"
                    adUnitID="ca-app-pub-1630449266026590/8873209626"  // teste ca-app-pub-3940256099942544/6300978111
                    servePersonalizedAds
                    onDidFailToReceiveAdWithError={(err) => console.log(err)}
                    style={{
                    }}
                  /> */}
                  
                  {/* <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                    requestOptions={{
                      requestNonPersonalizedAdsOnly: true,
                    }}
                  /> */}
                </>
            }
            <Tab.Navigator
              tabBar={ props => {
                return <TabBarCustom {...props} />
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
        </GestureHandlerRootView>
    );
  }



