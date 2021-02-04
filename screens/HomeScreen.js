import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, View, Image, TouchableOpacity} from 'react-native';
import { Container, Header, Content, Card, CardItem, Icon, Right, Text, Body } from 'native-base';
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

class homeScreen extends React.Component {
  constructor(props){
    super(props);
    this.getInfo(dbh)
    this.state = { data: '', result: [] }
  }

  onQueuePress = () => {
    const { email } = this.props.route.params;
    console.log(email)
    console.log("queue to the line")
    this.props.navigation.navigate('Queue', {email:email})
  }

  getInfo = async () => {
    const { email } = this.props.route.params;
    const userInfo = dbh.collection('users').doc(email);
    const doc = await userInfo.get();
    if (!doc.exists) {
      console.log('No such shit');
    } else {
      let data = doc.data();
      this.setState({ data:data });
      console.log(data);
      console.log(data.userName)
      const result = Object.values(data);
      console.log('result:', result)

    }
  }

  render() {    
    return(
    <Container>
      <View style={styles.welcomeContainer}>
        <Image style={styles.profileIcon} source={require('../assets/user.png')}/>
        <Text style={styles.greeting}>Hello {this.state.data.userName}</Text>
      </View>
      <View style={styles.serviceContainer}>
        <Text style={styles.serviceHeader}>Services</Text>
      </View>
      <View style={styles.serviceContent}>
        <TouchableOpacity onPress = {this.onQueuePress} style={{padding: 20}}>  
          <Image style={styles.profileIcon} source={require('../assets/queue.png')}/>
          <Text style={styles.greeting}>Queue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 20}}>  
          <Image style={styles.profileIcon} source={require('../assets/queue.png')}/>
          <Text style={styles.greeting}>View Queue</Text>
        </TouchableOpacity>
      </View>
    </Container>
    )
  }
}

const styles = StyleSheet.create({
  welcomeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5, 
  },
  
  profileIcon: {
    width: 70,
    height: 70,
    alignSelf: 'center',
  },

  serviceIcon: {
    width: 70,
    height: 70,
  },

  greeting: {
    fontSize: 25,
    paddingLeft: 10,
    color: '#616161',
    paddingTop: 10,
    justifyContent: 'center',
  },

  serviceContainer: {
    paddingTop: 20,
    paddingHorizontal: 10, 
  },

  serviceHeader: {
    color: '#616161',
    fontSize: 25,
    fontWeight: 'bold',
  },

  serviceContent: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default homeScreen