/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import * as React from 'react';
const ProviderApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => ProviderApp);
