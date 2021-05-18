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


let databaseFunctions = require('../database-endpoints.js');

const PODS = ['Dance', 'Spanish',]


export default class PodsHome extends React.Component {
  constructor({navigation, route}) {
    super();
    this.state = {
      username: route.params.username,
    }
    this.calcTreeHealthForAllPods();
  }

  calcTreeHealthForAllPods = () => {
    for (const pod of PODS) {
    let health = databaseFunctions.calculateTreeHealth(pod);
    health.then((result) => {
     this.setState({[pod]: result})
     console.log("health recalculated",pod,  result);
     //console.log("calculate tree health = ", typeof(result.toString()));
   }).catch((error) => {
     console.log("Error", error);
    })
  }
}

componentDidUpdate= (prevProps) =>{
  if(prevProps !== this.props){
   console.log("health recalculated");
   this.calcTreeHealthForAllPods();
  }
}

  renderPodTiles() {
    let podTiles = [];
    for (const pod of PODS) {
      podTiles.push(
        <PodTile
          key={pod}
          navigation ={this.props.navigation}
          title={pod}
          username={this.state.username}
          tree_health= {this.state[pod]}
          />
      )
    }
    return podTiles;
  }


  render() {
    console.log("render podsHome");
    let podTiles = this.renderPodTiles();
    return (
      <View style={styles.container}>
        {/* Header Bar */}
        <HeaderBar navigation = {this.props.navigation} username={this.state.username}/>
        <Text style = {{fontSize:26, fontWeight:'700', marginLeft:30, marginTop:30}}>Select Your Pod:</Text>
        <View style={[styles.tileContainer, {padding: windowWidth / 20}]}>
          {/* Titles */}
          <View style={{flexDirection:"row"}}>
          {podTiles}
          </View>

        </View>
      </View>
    )
  }
}

export {PodsHome}
