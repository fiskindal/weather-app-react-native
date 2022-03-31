/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import WeatherScreen from './src/weather/weather.screen';
import store from './store/store';

const App = () => {
  return (
   <Provider  store={store}>
     <WeatherScreen/>
   </Provider>
  );
};
export default App;
