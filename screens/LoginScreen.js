import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Keyboard, Text, TouchableWithoutFeedback} from 'react-native';
import { Button, Form, Item, Label, Input, View } from 'native-base';
import * as firebase from 'firebase';

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

class loginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {email: '', password: '', error: '', loading:false}
  }

  onLoginPress = () => {
    this.setState({error:'', loading:true});
    const{email,password} = this.state;
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(() => {
      this.setState({error:'',loading:false});
      this.props.navigation.navigate('Home');
    })
    .catch(() => {
      this.state({error:'Authentication failed',loading:false});
    } )
  }

  // login = async () => {
  //   console.log("email & pw")
  //   console.log(this.state.emailAddress)
  //   console.log(this.state.password)
  //   if (userInfo.emailAddress === this.state.emailAddress && userInfo.password === this.state.password) {
  //     this.props.navigation.navigate('Home')
  //   } else {
  //     alert ("something wrong u dumbfuck")
  //   }
  // }

  register = async () => {
    console.log("register mou")
    this.props.navigation.navigate('Register')
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView style={{ flex: 1}} behavior="padding">
          <Text style={styles.HVAS}>HVAS</Text>
          <Form style={{marginTop: 100}}>
            <Item floatingLabel style={styles.inputWidth}>
              <Label>Email Address</Label>
              <Input
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
            </Item>
            <Item floatingLabel style={styles.inputWidth}>
              <Label>Password</Label>
              <Input
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
              />
            </Item>
          </Form>
          <Button rounded primary style={{marginTop: 50, marginLeft: 20, alignItems: 'center', width: '90%'}} onPress = {this.onLoginPress}>
            <Text style={{textAlign: 'center', width: '100%', color: '#ffffff'}}>Login In</Text>
          </Button>
          <Button rounded light transparent style={{marginTop: 20, marginLeft: 20, alignItems: 'center', width: '90%'}} onPress = {this.register}>
            <Text style={{textAlign: 'center', width: '100%', color: '#000000'}}>Register</Text>
          </Button>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

export default loginScreen

const styles = StyleSheet.create({
  HVAS: {
    fontSize: 100,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 200,
  },

  view: {
    flex: 2,
    borderTopStartRadius: 130,
  },

  inputWidth: {
    width: '93%',
  }
});