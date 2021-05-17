import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    Alert,
    Dimensions,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Linking,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    WebView,
} from "react-native";
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

/* Stack Navigator*/
import { NavigationContainer } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import { Assets, createStackNavigator } from '@react-navigation/stack';

/* Dimensions */
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



/* Styles */
import { styles } from '../../Styles.js';

let customFonts = {
  'RubikRegular': require('../../assets/fonts/Rubik/static/Rubik-Regular.ttf'),
  'RubikBold': require('../../assets/fonts/Rubik/static/Rubik-Bold.ttf'),
}

export default class PodTile extends React.Component {

  constructor({navigation, route}) {
    super();
  }



  handleTile() {
    this.props.navigation.navigate('Example', {username: this.props.username, pod_name: this.props.title})
  }

  getBorderColor = (tree_health) => {
    if(tree_health >= 5) return '#A3B92B'
    if(tree_health >= 3) return '#C2C55A'
    if(tree_health >= 1) return '#C5B45A'
    return '#A59251'
  }


  render() {
    return (
      <TouchableOpacity
        onPress={() => this.handleTile()}
        style={[styles.podTile, {width: windowWidth / 2.5, height: windowHeight / 3.5, 
          borderColor: this.getBorderColor(this.props.tree_health)}]}>
        <Text style ={{fontWeight: '600',alignSelf:'center', fontSize: 26, marginTop:20}}>{this.props.title}</Text>
        {this.props.tree_health >= 5 ?
           <View>
           <Image style={{alignSelf:'center',  marginTop: "15%", width: '90%', height:'70%'}} source = {require('../../assets/full_tree/full_tree_top.png')}></Image>
           </View>
           :
      this.props.tree_health >= 3 ?
            <View>
            <Image style={{alignSelf:'center',  marginTop: "15%", width: '90%', height:'70%'}} source = {require('../../assets/good_tree/good_tree_top.png')}></Image>
            </View>
           :
      this.props.tree_health >= 1 ?
            <View>
            <Image style={{alignSelf:'center',  marginTop: "15%", width: '90%', height:'70%'}} source = {require('../../assets/fair_tree/fair_tree_top.png')}></Image>
            </View>
           :
            <View>
            <Image style={{alignSelf:'center', marginTop: "15%", width: '90%', height:'70%'}} source = {require('../../assets/poor_tree/poor_tree_top.png')}></Image>
            </View>
  }
      </TouchableOpacity>
    );
  }
}

export {PodTile}
