import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, View, Text, Alert, SnapshotViewIOS} from 'react-native';
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

class recordScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {data: '', visitNo: ''}
    // this.getRecordInfo(dbh)
  }

  // getRecordInfo = async () => {
  //   const { name } = this.props.route.params
  //   console.log(name)
  //   const recordInfo = dbh.collection('record').doc(name).collection('visit')
  //   const snapshot = await recordInfo.get()
  //   snapshot.forEach(doc => {
  //     console.log(doc.id, '=>', doc.data())
  //   })
  // }

  onViewPress = async () => {
    const{ visitNo  } = this.state
    this.props.navigation.navigate('Record Detail', {visitNo: visitNo})
  }

  render() {
    return (
      <Container>
        <Text style={styles.header}>Please select your medical record to view</Text>
        <Form>
          <Text style={styles.header2}>Please select visit record to view</Text>
          <Item style={styles.inputWidth}>
            <Picker
              selectedValue={this.state.visitNo}
              prompt='Visit No'
              style={{color: '#0000FF', width: "100%"}}
              onValueChange={(itemValue, itemIndex) => 
                this.setState({visitNo: itemValue})}
            >
              <Picker.Item label="" value=""/>
              <Picker.Item label="Visit 1" value="visit1"/>
              <Picker.Item label="Visit 2" value="visit2"/>
            </Picker>
          </Item>
          <View style={{paddingTop: 40}}>
            <Button rounded primary style={{alignSelf: 'center', width: '90%'}} onPress= {this.onViewPress}>
              <Text style={{textAlign: 'center', width: '100%', color: '#ffffff'}}>View</Text>
            </Button>
          </View>
        </Form>
      </Container>
    )
  }
}

export default recordScreen

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    color: '#616161',
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  inputWidth: {
    width: '93%',
  },

  header2: {
    fontSize: 20,
    color: '#616161',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
})