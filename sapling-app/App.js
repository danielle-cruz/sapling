import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/* Stack Navigator */
import { NavigationContainer } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import { Assets, createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

/* Login Pages */
import Login from './Login.js'

/* Pods Pages */
import PodsHome from './pods/PodsHome.js'

/* New Post Pages */
import Upload from './new-post/Upload.js'

/* Example Pages */
import Example from './Example.js'

/* Single Post Pages */
import SinglePost from './SinglePost.js'

export default class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true
          }}>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Upload' component={Upload} />
          <Stack.Screen name='PodsHome' component={PodsHome} options={({ headerShown: false, animationEnabled: false })}/>
          <Stack.Screen name='Example' component={Example} />
          <Stack.Screen name='SinglePost' component={SinglePost} />

        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
