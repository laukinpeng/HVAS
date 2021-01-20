import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Keyboard, Text, TouchableWithoutFeedback} from 'react-native';
import { Button, Form, Item, Label, Input } from 'native-base';

class registerScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {emailAddress: '', name: '', password: ''}
  }

  render() {
    return (
      <TouchableWithoutFeedback onpress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView style={{ flex: 1}} behavior="padding">
          <Text style={styles.header}>Personal Datails</Text>
          <Text style={styles.header2}>Please enter your email address and name</Text>
          <Form>
            <Item floatingLabel style={styles.inputWidth}>
              <Label>Email Address</Label>
              <Input
                onChangeText={(emailAddress) => this.setState({emailAddress})}
                value={this.state.emailAddress}
              />
            </Item>
            <Item floatingLabel style={styles.inputWidth}>
              <Label>Name</Label>
              <Input
                onChangeText={(name) => this.setState({name})}
                value={this.state.name}
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
          <Button rounded primary style={{marginTop: 50, marginLeft: 20, alignItems: 'center', width: '90%'}} onPress = {this.register}>
            <Text style={{textAlign: 'center', width: '100%', color: '#ffffff'}}>Register</Text>
          </Button>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )
  }

  register = async => {
    console.log("checking")
    console.log(this.state.emailAddress)
    console.log(this.state.name)
    console.log(this.state.password)
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