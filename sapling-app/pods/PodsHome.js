import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    Alert,
    Image,
    Linking,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    WebView,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import { Assets, createStackNavigator } from '@react-navigation/stack';

/* Styles */
import { styles } from '../Styles.js';

export default class PodsHome extends React.Component {
  constructor({navigation, route}) {
    super();
    this.state = {
      username: route.params.username,
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header1}>Yay this is the pods homepage!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Example')}>
            <Text>Press to go to Example</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export {PodsHome}
