import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import { Assets, createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


import Example from './Example.js'
import Example2 from './Example2.js'


export default class App extends React.Component {

  state = {
    image_id: null,
    userNeedsOnboard: true
  };

  handleOnboarding = (userNeedsOnboardAnswer) => {
    this.setState({
      userNeedsOnboard: userNeedsOnboardAnswer
    })
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true
          }}>
          <Stack.Screen name='Example' component={Example} />
          <Stack.Screen name='Example2' component={Example2} />

        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
