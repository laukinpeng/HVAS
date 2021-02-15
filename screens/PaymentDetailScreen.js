import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, View, Image, TouchableOpacity, Text, Alert} from 'react-native';
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
    this.state = { data: '', time: '', AdministrativeCharge: '', Consultation:'', Medication:'', total:''}
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

      const time = data.dateTime.toDate().toString().substr(0, 21)
      this.setState({ time:time })

      const AdministrativeCharge = data.AdministrativeCharge.toFixed(2)
      this.setState({AdministrativeCharge:AdministrativeCharge})

      const Consultation = data.Consultation.toFixed(2)
      this.setState({Consultation:Consultation})

      const Medication = data.Medication.toFixed(2)
      this.setState({Medication:Medication})

      const total = data.total.toFixed(2)
      this.setState({total:total})
    }
  }

  onPayPress = () => {
    Alert.alert(
      "Confirm Payment",
      "Press ok to be redireected to payment site",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Payment"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    )
  }

  render() {
    return(
      <Container>
        <Text style={styles.header}>{this.state.data.invoiceNo}</Text>
        <Text style={styles.header2}>Doctor: {this.state.data.inChargeDoctor}</Text>
        <Text style={styles.header3}>Date/Time: {this.state.time}</Text>
        {/* patient name */}
        <Text style={styles.billHeader}>Description</Text>
        <View style={styles.card}>
          <Card>
            <CardItem>
              <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row'}}>
                <View>
                  <Text style={styles.text}>Administrative Charge:</Text>
                </View>
                <View>
                  <Text style={styles.text}>{this.state.AdministrativeCharge}</Text>
                </View>
              </View>
            </CardItem>
            <CardItem>
              <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row'}}>
                <View>
                  <Text style={styles.text}>Consultation:</Text>
                </View>
                <View>
                  <Text style={styles.text}>{this.state.Consultation}</Text>
                </View>
              </View>
            </CardItem>
            <CardItem>
              <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row'}}>
                <View>
                  <Text style={styles.text}>Medication:</Text>
                </View>
                <View>
                  <Text style={styles.text}>{this.state.Medication}</Text>
                </View>
              </View>
            </CardItem>
            <View style={{borderBottomColor: 'black', borderBottomWidth: 1, width: "93%", alignSelf: 'center'}}/>
            <CardItem>
              <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row'}}>
                <View>
                  <Text style={styles.text}>Total:</Text>
                </View>
                <View>
                  <Text style={styles.text}>{this.state.total}</Text>
                </View>
              </View>
            </CardItem>
          </Card>
        </View>
        <View style={{paddingTop: 40}}>
          <Button rounded primary style={{alignSelf: 'center', width: '90%'}} onPress = {this.onPayPress}>
            <Text style={{textAlign: 'center', width: '100%', color: '#ffffff'}}>Pay</Text>
          </Button>
        </View>
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

  billHeader: {
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

