import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
  constructor({navigation, route}) {
    super();
    this.state = {
      usernamee: '',
      post_title: '',
      post_text: '',
      post_media: null,
      post_type: '',
      post_video_thumbnail: null
    }
  }

  /*handlePostFields = (post_title, post_text, post_media) => {
    this.setState({
      post_title: post_title,
      post_text: post_text,
      post_media: post_media
    })
    console.log(this.state.post_title)
  }*/

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true
          }}>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Upload' component={Upload}
            initialParams={{
              handleTitle: ((post_title) => this.setState({post_title: post_title})),
              handleText: ((post_text) => {this.setState({post_text: post_text})}),
              handleMedia: ((post_media) => this.setState({post_media: post_media})),
              handleType: ((post_type) => this.setState({post_type: post_type})),
              handleUsername: ((username) => this.setState({username: username})),
              handleVideoThumbnail: ((videoThumbnail) => this.setState({post_video_thumbnail: videoThumbnail}))


            }}
            options={({route, navigation}) => ({
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
                  onPress={() => {
                    if (this.state.post_title === '') {
                      Alert.alert('Please include a title for your post.');
                    } else if (this.state.post_media === null) {
                      Alert.alert('Please attach a photo or video to your post.');
                    } else if (this.state.post_text === '') {
                      Alert.alert('Please write a reflection for your post.');
                    } else {
                      navigation.navigate('Details', {
                        username: this.state.username,
                        post_title: this.state.post_title,
                        post_text: this.state.post_text,
                        post_media: this.state.post_media,
                        post_type: this.state.post_type,
                        post_video_thumbnail: this.state.post_video_thumbnail
                      });
                    }
                  }}>
                  <Text style={styles.headerButtonText}>Next</Text>
                </TouchableOpacity>
                )
          })}/>
          <Stack.Screen name='Details' component={Details}
            options={({animationEnabled: false })}
            />
          <Stack.Screen name='PodsHome' component={PodsHome} options={({ headerShown: false, animationEnabled: false })}/>
          <Stack.Screen name='Example' component={Example} options={({ headerTitle: "Pod Activity",headerBackTitle: "Back"})} />
          <Stack.Screen name='SinglePost' component={SinglePost} options={({ headerTitle: ""})} />

        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
