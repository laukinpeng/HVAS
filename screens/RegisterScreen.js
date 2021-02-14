import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Keyboard, Text, TouchableWithoutFeedback, View, Alert} from 'react-native';
import { Button, Form, Item, Label, Input, Container } from 'native-base';
import { Picker } from 'react-native'
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

class registerScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {email: '', password: '', error: '', name: '', loading:false, gender: ''}
  }

  onSignUpPress = () => {
    this.setState({error:'', loading:true})
    const{ email, password, name, gender } = this.state
    if (this.state.password.length < 7) {
      Alert.alert('Alert', 'Please type more then 8');
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(() => {
      this.setState({error:'', loading:false})
      this.props.navigation.navigate('Login')
      })
    .catch(() => {
      this.setState({error:'Authentication failed please check input',loading: false});
    })
    dbh.collection("users").doc(email).set(
      {
        userEmail: email,
        userPassword: password,
        userName: name,
        userGender: gender,
      }
    )
  }
  
  render() {
    return (
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container style={{flex: 1}}>
            <Text style={styles.header}>Personal Datails</Text>
            <Text style={styles.header2}>Please enter your detail</Text>
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
                  secureTextEntry={true}
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
              <Item style={styles.inputWidth}>
                <Label>Gender</Label>
                <Picker
                  selectedValue={this.state.gender}
                  prompt='Gender'
                  style={{color:'	#808080', width: "100%", }}
                  onValueChange={(itemValue, itemIndex) => 
                    this.setState({gender: itemValue})}
                >
                  <Picker.Item label="" value=""/>
                  <Picker.Item label="Male" value="Male"/>
                  <Picker.Item label="Female" value="Female"/>
                </Picker>
              </Item>
              <Text style={{paddingLeft: 10, paddingTop: 10, color: '#FF0000', fontWeight: 'bold' }}>{this.state.error}</Text>
            </Form>
            <View style={{paddingTop: 10}}>
              <Button rounded primary style={{alignSelf: 'center', width: '90%'}} onPress = {this.onSignUpPress}>
                <Text style={{textAlign: 'center', width: '100%', color: '#ffffff'}}>Register</Text>
              </Button>
            </View>
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    paddingTop: 40,
  },

  header2: {
    fontSize: 20,
    color: '#616161',
    paddingHorizontal: 20,
    paddingBottom:20,
  },

  inputWidth: {
    width: '93%',
  }
})