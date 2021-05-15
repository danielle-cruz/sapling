import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/* Stack Navigator */
import { getPathFromState, NavigationContainer, TabRouter, useRoute } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import { Assets, createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

/* Styles */
import { styles } from './Styles.js';

/* Login Pages */
import Login from './Login.js'

/* Pods Pages */
import PodsHome from './pods/PodsHome.js'

/* New Post Pages */
import Upload from './new-post/Upload.js'
import Details from './new-post/Details.js'


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
          <Stack.Screen name='Upload' component={Upload} options={({route, navigation}) => ({
            animationEnabled: false,
            title: 'New Post',
            headerTitleStyle: { fontSize: 20 },
            headerStyle: { height: 100 },
            headerLeft: () => (
              <HeaderBackButton
                labelVisible={false}
                style={styles.headerButton}
                onPress={() => navigation.goBack()}>
                </HeaderBackButton>
              ),
            headerRight: () => (
              <TouchableOpacity style={styles.headerButton}
                onPress={() => {navigation.navigate('Details');
                }}>
                <Text style={styles.headerButtonText}>Next</Text>
              </TouchableOpacity>
              )
          })}/>
          <Stack.Screen name='Details' component={Details} options={({ headerShown: false, animationEnabled: false })}/>
          <Stack.Screen name='PodsHome' component={PodsHome} options={({ headerShown: false, animationEnabled: false })}/>
          <Stack.Screen name='Example' component={Example} options={({ headerTitle: "Pod Activity",headerBackTitle: "Back"})} />
          <Stack.Screen name='SinglePost' component={SinglePost} options={({ headerTitle: ""})} />

        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
