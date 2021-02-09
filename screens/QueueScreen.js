import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, View, Text, Alert} from 'react-native';
import { Button, Form, Item, Label, Input, Container } from 'native-base';
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

class queueScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: '' }
    this.getPplQueue(dbh)
  }

  //add on snapshot
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

  onLeavePress = async () => {
    const userRef = dbh.collection('queue').doc('counter')
    const increment = firebase.firestore.FieldValue.increment(-1)
    await userRef.update({ pplQueue: increment })
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <Container>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTop}>Thank you for waiting</Text>
          <Text style={styles.headerText}>Here's your postion in the queue</Text>
        </View>
        <View style={styles.number}>
          <Text style={styles.queueText}>{this.state.data.pplQueue}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>We'll inform you when it is your turn</Text>
        </View>
        <View style={styles.leaveContainer}>
          <Button rounded danger style={{ alignSelf: 'center', width: '30%' }} onPress = {this.onLeavePress}>
            <Text style={{ textAlign: 'center', width: '100%', color: '#ffffff' }}>Leave Queue</Text>
          </Button>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    // flex: 1,
    flexDirection: 'column',
    paddingTop: 30,
    alignItems: 'center',
  },

  headerTop: {
    fontSize: 25,
  },

  headerText: {
    fontSize: 20,
    color: '#000000',
    paddingTop: 10,
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

  bottomContainer: {
    flexDirection: 'column',
    paddingTop: 30,
    alignItems: 'center',
  },

  bottomText: {
    fontSize: 20,
    color: '#000000',
  },

  leaveContainer: {
    // justifyContent: "center",
    // flexDirection: 'column',
    paddingTop: 30,
  }, 

})

export default queueScreen