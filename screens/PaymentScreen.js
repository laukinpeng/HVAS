import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, View, Image, TouchableOpacity, Text} from 'react-native';
import { Container, Header, Content, Card, CardItem, Icon, Right, Body, Form, Item, Button } from 'native-base';
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

class paymentScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {invoiceNo:"" }
  }

  onPaymentPress = async () => {
    const{ invoiceNo } = this.state
    this.props.navigation.navigate('Payment Detail', { invoiceNo: invoiceNo })
  }

  render() {
    return(
      <Container>
        <Text style={styles.header}>Please select invoice to make payment</Text>
        <Form>
          <Item style={styles.inputWidth}>
            <Picker
              selectedValue={this.state.invoiceNo}
              prompt='Invoice No'
              style={{color: '#0000FF', width: "100%"}}
              onValueChange={(itemValue, itemIndex) => 
                this.setState({invoiceNo: itemValue})}
            >
              <Picker.Item label="" value=""/>
              <Picker.Item label="Invoice 0001" value="inv1"/>
              <Picker.Item label="Invoice 0002" value="inv2"/>
            </Picker>
          </Item>
          <View style={{paddingTop: 40}}>
            <Button rounded primary style={{alignSelf: 'center', width: '90%'}} onPress= {this.onPaymentPress}>
              <Text style={{textAlign: 'center', width: '100%', color: '#ffffff'}}>Make Payment</Text>
            </Button>
          </View>
        </Form>
      </Container>
    )
  }
}

export default paymentScreen

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
  },
})

  