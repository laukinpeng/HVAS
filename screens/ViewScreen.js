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
    this.state = { data: '' }
    this.getPplQueue(dbh)
  }

  getPplQueue = async () => {
    const QueueInfo = dbh.collection('queue').doc('counter')
    const doc = await QueueInfo.get()
    if (!doc.exists) {
      console.log('bakana!?!?!!?!?!??!?')
    } else {
      let data = doc.data()
      this.setState({ data:data })
      console.log(data.pplQueue)
      
    }
  }

  render() {
    return (
      <Container>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTop}>Amount of people queuing</Text>
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
});