import React from 'react';
import { Text } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Rubik_400Regular, Rubik_700Bold } from '@expo-google-fonts/rubik';

export default function Fonts() {
  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <Text style={{ fontFamily: 'Inter_900Black' }}>Inter Black</Text>;
}
export {Fonts}
