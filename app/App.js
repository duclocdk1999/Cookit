/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { PureComponent } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import SplashScreen from './src/containers/SplashScreen'
import RootNavigator from './src/navigator/index'
import * as navigation from './src/utils/navigation'

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/store/configureStore';

export default class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
        splashFinished: false
    }
  }
  componentDidMount () {
    setTimeout(() => {
        this.setState({
            splashFinished: true
        })
    }, 3000)
  }

  render() {
    return (
      <Provider store={store}>
          <PersistGate persistor={persistor}>
            {(bootstrapped) => {                       
              if (bootstrapped && this.state.splashFinished) {                      
                  return (<RootNavigator ref={nav => navigation.setNavigator(nav)}/>)                            
              }
              else {
                  return <SplashScreen/>
              }
            }}
          </PersistGate>
        </Provider>
    );
  }
  
};
