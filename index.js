import 'expo-dev-client';

import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
