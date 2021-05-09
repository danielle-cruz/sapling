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

export default class PodsHome extends React.Component {

  render() {
    return (
      <View>
        <Text>Start of the New Post Flow</Text>
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('PodsHome')}>
            <Text>Press to go to Pods</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export {PodsHome}
