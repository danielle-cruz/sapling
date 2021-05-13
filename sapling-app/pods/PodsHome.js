import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    Alert,
    Dimensions,
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

/* Components */
import HeaderBar from '../src/components/HeaderBar'
import PodTile from '../src/components/PodTile'

/* Dimensions */
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PODS = ['Dance', 'Spanish', 'Example']


export default class PodsHome extends React.Component {
  constructor({navigation, route}) {
    super();
    this.state = {
      username: route.params.username,
    }
  }

  renderPodTiles() {
    let podTiles = [];
    for (const pod of PODS) {
      podTiles.push(
        <PodTile
          navigation = {this.props.navigation}
          title={pod}
          username= {this.state.username}
          />
      )
    }
    return podTiles;
  }


  render() {
    let podTiles = this.renderPodTiles();
    return (
      <View style={styles.container}>
        {/* Header Bar */}
        <HeaderBar navigation = {this.props.navigation} title={this.state.username}/>
        <View style={[styles.tileContainer, {padding: windowWidth / 20}]}>

          {/* Titles */}
          {podTiles}

        </View>
      </View>
    )
  }
}

export {PodsHome}
