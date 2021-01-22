import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Keyboard, Text, TouchableWithoutFeedback} from 'react-native';
import { Button, Form, Item, Label, Input, View } from 'native-base';
const userInfo = {emailAddress: '1', password: '1'};

class loginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {emailAddress: '', password: ''}
  }

  //big brain fire base
  // constructor(props){
  //   super(props);
  //   this.state = {email:'', password:'', error:'', loading:false};
  // }

  onLoginPress(){
    this.setState({error:'', loading:true});
    const{email,password} = this.state;
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(() => {
      this.state({error:'',loading:false});
      this.props.navigation.navigate('Home');
    })
    .catch(() => {
      this.state({error:'Authentication failed',loading:false});
    } )
  }

  onSignUpPress(){
    this.setState({error:'', loading:true});
    const{email,password} = this.state;
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(() => {
      this.state({error:'',loading:false});
      this.props.navigation.navigate('Home');
    })
    .catch(() => {
      this.state({error:'Authentication failed',loading:false});
    })
  }

  renderButtonOrLoading(){
    if(this.state.loading){
      return <Text> laoding </Text>
    }
    return <View>
      <Button onPress={this.onLoginPress.bind(this)}>login</Button>
      <Button onPress={this.onSignUpPress.bind(this)}>Sign Up</Button>
    </View>
  }
  //big pp end

  login = async () => {
    console.log("email & pw")
    console.log(this.state.emailAddress)
    console.log(this.state.password)
    if (userInfo.emailAddress === this.state.emailAddress && userInfo.password === this.state.password) {
      this.props.navigation.navigate('Home')
    } else {
      alert ("something wrong u dumbfuck")
    }
  }

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
                onChangeText={(emailAddress) => this.setState({emailAddress})}
                value={this.state.emailAddress}
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
          <Button rounded primary style={{marginTop: 50, marginLeft: 20, alignItems: 'center', width: '90%'}} onPress = {this.login}>
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