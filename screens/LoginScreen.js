import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Keyboard, Text, TouchableWithoutFeedback} from 'react-native';
import { Button, Form, Item, Label, Input } from 'native-base';

const userInfo = {emailAddress: '1', password: '1'};

class loginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {emailAddress: '', password: ''}
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