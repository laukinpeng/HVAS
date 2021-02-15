import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, View, Text, Alert} from 'react-native';
import { Button, Form, Item, Label, Input, Container, Card, CardItem} from 'native-base';
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

class recordDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: '', time: '' }
    this.getRecord(dbh)
  }

  getRecord = async () => {
    const {visitNo} = this.props.route.params
    const visitRef = dbh.collection('record').doc('laukinpeng').collection('visit').doc(visitNo)
    const doc = await visitRef.get()
    if (!doc.exists) {
      console.log('patient mimght be dead')
    } else {
      let data = doc.data()
      this.setState({ data:data })
      const time = data.visitTime.toDate().toTimeString().substr(0, 8)
      this.setState({ time:time })
      console.log(data)
    }
  }

  render() {
    return (
      <Container>
        <Text style={styles.header}>{this.state.data.visitNo}</Text>
        <Text style={styles.header2}>Doctor: {this.state.data.doctor}</Text>
        <Text style={styles.header3}>Visit Time: {this.state.time}</Text>
        {/* patient name */}
        <Text style={styles.diagnosisHeader}>Diagnosis  Note</Text>
        <View style={styles.card}>
          <Card>
            <CardItem>
              <Text style={styles.text}>
                {this.state.data.note}
              </Text>
            </CardItem>
          </Card>
        </View>
      </Container>
    )
  }
}

export default recordDetailScreen

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