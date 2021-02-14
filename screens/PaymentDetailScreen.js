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

class paymentDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: '', invoiceNo: '' }
    this.getPayment(dbh)
  }

  getPayment = async () => {
    const {invoiceNo} = this.props.route.params
    const paymentRef = dbh.collection('payment').doc('laukinpeng').collection('invoice').doc(invoiceNo)
    const doc = await paymentRef.get()
    if(!doc.exists) {
      console.log('patient dato son')
    } else {
      let data = doc.data()
      this.setState({ data:data })
    }
  }

  render() {
    return(
      <Container>
        <Text style={styles.header}>{this.state.data.invoiceNo}</Text>
        <Text style={styles.header2}>{this.state.data.inChargeDoctor}</Text>
      </Container>
    )
  }
}

export default paymentDetailScreen

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
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  header3: {
    fontSize: 20,
    color: '#616161',
    paddingHorizontal: 20,
    paddingBottom:20,
  },

  diagnosisHeader: {
    fontSize: 25,
    color: '#616161',
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },

  card:{
    paddingTop: 20,
    width: '93%',
    alignSelf: 'center',
  },

  text:{
    fontSize: 20,
  }
})