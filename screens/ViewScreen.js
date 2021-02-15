import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, View, Image, TouchableOpacity, Text} from 'react-native';
import { Container, Header, Content, Card, CardItem, Icon, Right, Body } from 'native-base';
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

class viewScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: '', sensei: '' }
    this.getPplQueue(dbh)
  }

  getPplQueue = async () => {
    const { sensei } = this.props.route.params
    this.setState({ sensei:sensei })
    const queueInfo  = dbh.collection('queue').doc(sensei)
    const doc = await queueInfo.get()
    if (!doc.exists) {
      console.log('dochi dochi')
    } else {
      let data = doc.data()
      this.setState({ data:data })
      console.log(data.pplQueue)
    }
  }

  render() {
    const { sensei } = this.props.route.params
    return (
      <Container>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTop}>Amount of people queuing for</Text>
          <Text style={styles.headerBtm}>{sensei}</Text>
        </View>
        <View style={styles.number}>
          <Text style={styles.queueText}>{this.state.data.pplQueue}</Text>
        </View>
      </Container>
    )
  }
}

export default viewScreen

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',
    paddingTop: 50,
    alignItems: 'center',
  },

  headerTop: {
    fontSize: 25
  },

  number: {
    flexDirection: 'column',
    padding: 30,
    alignItems: 'center',
  },

  queueText: {
    fontSize: 140,
    color: '#000000',
  },

  headerBtm: {
    paddingTop: 20,
    fontSize: 25,
    color: '#0000FF',
    fontWeight: 'bold',
  },
});