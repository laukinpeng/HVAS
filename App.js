import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, View, ImageBackground, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Keyboard, Text, TouchableWithoutFeedback, NativeAppEventEmitter} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { Container, Button, Form, Item, Label, Input } from 'native-base';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

import loginScreen from './screens/LoginScreen';
import homeScreen from './screens/HomeScreen';
import registerScreen from './screens/RegisterScreen';
import queueScreen from './screens/QueueScreen';
import viewScreen from './screens/ViewScreen';
import visitScreen from './screens/VisitDetail';
import recordScreen from './screens/RecordScreen';
import recordDetailScreen from './screens/RecordDetailScreen'
import paymentScreen from './screens/PaymentScreen'
import paymentDetailScreen from './screens/PaymentDetailScreen'
import viewDetailScreen from './screens/ViewDetail'

const userInfo = {emailAddress: '1', password: '1'};

const Stack = createStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Login">
        <Stack.Screen name="Login" component={loginScreen}/>
        <Stack.Screen name="Home" component={homeScreen}/>
        <Stack.Screen name="Register" component={registerScreen}/>
        <Stack.Screen name="Queue" component={queueScreen}/>
        <Stack.Screen name="View" component={viewScreen}/>
        <Stack.Screen name="Visit" component={visitScreen}/>
        <Stack.Screen name="Record" component={recordScreen}/>
        <Stack.Screen name="Record Detail" component={recordDetailScreen}/>
        <Stack.Screen name="Payment" component={paymentScreen}/>
        <Stack.Screen name="Payment Detail" component={paymentDetailScreen}/>
        <Stack.Screen name="View Detail" component={viewDetailScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}