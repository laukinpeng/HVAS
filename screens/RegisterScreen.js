import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Keyboard, Text, TouchableWithoutFeedback} from 'react-native';
import { Button, Form, Item, Label, Input, Container } from 'native-base';
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

const userInfo = firebase.firestore();

class registerScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {email: '', password: '', error: '', name: '', loading:false}
  }

  onSignUpPress = () => {
    this.setState({error:'', loading:true});
    const{ email, password, name } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(() => {
      this.setState({error:'', loading:false});
      this.props.navigation.navigate('Login');
      })
    .catch(() => {
      this.setState({error:'Authentication failed',loading: false});
    })
    userInfo.collection("users").doc(email).set(
      {
        userEmail: email,
        userPassword: password,
        userName: name
      }
    )
  }

  render() {
    return (
      <Container>
        <TouchableWithoutFeedback onpress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView style={{ flex: 1}} behavior="padding">
            <Text style={styles.header}>Personal Datails</Text>
            <Text style={styles.header2}>Please enter your email address and name</Text>
            <Form>
              <Item floatingLabel style={styles.inputWidth}>
                <Label>Email Address</Label>
                <Input
                  onChangeText={email => this.setState({email})}
                  value={this.state.email}
                />
              </Item>
              <Item floatingLabel style={styles.inputWidth}>
                <Label>Password</Label>
                <Input
                  onChangeText={password => this.setState({password})}
                  value={this.state.password}
                />
              </Item>
              <Item floatingLabel style={styles.inputWidth}>
                <Label>Name</Label>
                <Input
                  onChangeText={name => this.setState({name})}
                  value={this.state.name}
                />
              </Item>
            </Form>
            <Button rounded primary style={{marginTop: 50, marginLeft: 20, alignItems: 'center', width: '90%'}} onPress = {this.onSignUpPress}>
              <Text style={{textAlign: 'center', width: '100%', color: '#ffffff'}}>Register</Text>
            </Button>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Container>
    )
  }
}

export default registerScreen

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    color: '#616161',
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header2: {
    fontSize: 20,
    color: '#616161',
    paddingHorizontal: 20,
    paddingBottom:100,
  },

  inputWidth: {
    width: '93%',
  }
})