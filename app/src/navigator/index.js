import {
    createAppContainer,
    createDrawerNavigator,
    createSwitchNavigator
  } from 'react-navigation';
  import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
  import { Transition } from 'react-native-reanimated';
  import React, { Component } from "react";


  import AuthScreen from '../containers/AuthScreen'
  import LoginScreen from '../containers/LoginScreen'
  import SignUpScreen from '../containers/SignUpScreen'
  import RecipeScreen from '../containers/RecipeScreen'
  import MainTab from './MainTab'
  import { createStackNavigator } from 'react-navigation-stack';

  
const RecipeStack = createStackNavigator({
    RecipeScreen: RecipeScreen,
  }, {
    initialRouteName: 'RecipeScreen',
    headerMode: 'none',
})

const AuthStack = createAnimatedSwitchNavigator({
    AuthenScreen: AuthScreen,
    LoginScreen: LoginScreen,
    SignUpScreen: SignUpScreen
  }, {
    transition: (
      <Transition.Together>
        <Transition.In type="slide-right" durationMs={500} />
      </Transition.Together>
    ),
})





  const RootNavigator = createSwitchNavigator({
      AuthStack,
      MainTab, 
      RecipeStack
  })

  export default createAppContainer(RootNavigator)
