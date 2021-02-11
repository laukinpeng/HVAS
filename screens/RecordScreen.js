import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, View, Text, Alert} from 'react-native';
import { Button, Form, Item, Label, Input, Container, Card, CardItem } from 'native-base';
import * as firebase from 'firebase';
import 'firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyCjiFpYS_3ZMIngJnBFCe2pAyxDm9_h6_c",
      authDomain: "hvas-a1caf.firebaseapp.com",
      projectId: "hvas-a1caf",
      storageBucket: "hvas-a1caf.appspot.com",
      messagingSenderId: "1032774821538",
      appId: "1:1032774821538:web:1b97b85d43307737d219fb",
      measurementId: "G-22GCX94RRS"
    }
  )
}

const dbh = firebase.firestore();

class recordScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container>
        
      </Container>
    )
  }
}

export default recordScreen

const styles = StyleSheet.create({

})