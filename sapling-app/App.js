import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/* Stack Navigator */
import { NavigationContainer } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import { Assets, createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

/* Pods Pages */
import PodsHome from './pods/PodsHome.js'

/* New Post Pages */
import Upload from './new-post/Upload.js'

/* Example Pages */
import Example from './Example.js'

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
          <Stack.Screen name='Upload' component={Upload} />
          <Stack.Screen name='PodsHome' component={PodsHome} />
          <Stack.Screen name='Example' component={Example} />

        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
