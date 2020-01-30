import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './constants/colors';
import HomeScreen from './src/screens/home/HomeScreen';

EStyleSheet.build(colors);

export default class App extends Component {
  
  render() {
    return <HomeScreen />
  }
}


