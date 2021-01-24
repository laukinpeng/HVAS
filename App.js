import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, View, ImageBackground, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Keyboard, Text, TouchableWithoutFeedback, NativeAppEventEmitter} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { Container, Button, Form, Item, Label, Input } from 'native-base';

import loginScreen from './screens/LoginScreen';
import homeScreen from './screens/HomeScreen';
import registerScreen from './screens/RegisterScreen';

const userInfo = {emailAddress: '1', password: '1'};

const Stack = createStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Home">
        <Stack.Screen name="Login" component={loginScreen}/>
        <Stack.Screen name="Home" component={homeScreen}/>
        <Stack.Screen name="Register" component={registerScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}