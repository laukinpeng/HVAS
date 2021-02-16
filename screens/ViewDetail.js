import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Container, Button, Form, Item } from 'native-base';
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


class viewDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { sensei: '' }
  }

  onViewPress = async () => {
    const { sensei } = this.state
    this.props.navigation.navigate('View', {sensei: sensei})
  }

  render() {
    return(
      <Container>
        <Text style={styles.header}>Please select doctor to view people in queue</Text>
        <Form>
          <Item>
            <Picker
              selectedValue={this.state.sensei}
              prompt='Doctor'
              style={{color: '#0000FF', width: "100%"}}
              onValueChange={(itemValue) => 
                this.setState({sensei: itemValue})}            
            >
              <Picker.Item label="" value=""/>
              <Picker.Item label="Dr Stone" value="Dr Stone"/>
              <Picker.Item label="Dr Who" value="Dr Who"/>              
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

export default viewDetailScreen

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