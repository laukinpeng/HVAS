import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, View, Text, Alert} from 'react-native';
import { Button, Form, Item, Label, Input, Container} from 'native-base';
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

class visitScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {sensei:'', reason:'', data: ''}
  }

  onSubmitPress = async () => {
    const { email } = this.props.route.params
    const { sensei, reason } = this.state
    const userInfo = dbh.collection('users').doc(email)
    const doc = await userInfo.get()
    if (!doc.exists) {
      console.log('bakana!?!?!??!?!?!?!?!')
    } else {
      let data = doc.data()
      this.setState({ data:data })
      const name = data.userName
      dbh.collection("visit").doc(data.userName).set(
        {
          userName: data.userName,
          visitDoctor: sensei,
          visitReason: reason,
          queueTime: new Date(),
        }
      )
      this.props.navigation.navigate('Queue', {name: name})
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        <Container>
          <Text style={styles.header}>Visit Details</Text>
          <Form style={{paddingTop: 10}}>
            <Text style={styles.header2}>Please select doctor</Text>
            <Item style={styles.inputWidth}>
              <Picker
                selectedValue={this.state.sensei}
                prompt='Doctor'
                style={{color: '#0000FF', width: "100%"}}
                onValueChange={(itemValue, itemIndex) => 
                  this.setState({sensei: itemValue})}
              >
                <Picker.Item label="" value=""/>
                <Picker.Item label="Dr Stone" value="Dr Stone"/>
                <Picker.Item label="Dr Who" value="Dr Who"/>
              </Picker>
            </Item>
            <Text style={styles.header2}>Please select vist reason</Text>
            <Item style={styles.inputWidth}>
              <Picker
                selectedValue={this.state.reason}
                prompt='Reason'
                style={{color: '#0000FF', width: "100%"}}
                onValueChange={(itemValue, itemIndex) => 
                  this.setState({reason: itemValue})}
              >
                <Picker.Item label="" value=""/>
                <Picker.Item label="Consultation" value="Consultation"/>
                <Picker.Item label="Follow up" value="Follow up"/>
              </Picker>
            </Item>
            <View style={{paddingTop: 40}}>
              <Button rounded primary style={{alignSelf: 'center', width: '90%'}} onPress = {this.onSubmitPress}>
                <Text style={{textAlign: 'center', width: '100%', color: '#ffffff'}}>Submit</Text>
              </Button>
            </View>
          </Form>
        </Container>
      </KeyboardAvoidingView>
    )
  }
}

export default visitScreen

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
    paddingTop: 20,
  },

  inputWidth: {
    width: '93%',
  }
})