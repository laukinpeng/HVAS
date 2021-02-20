import * as React from 'react';
import { StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import { Container, Text } from 'native-base';
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
    this.state = { data: '', result: [], queueNo: '', name: '' }
    this.getInfo(dbh)
  }

  onQueuePress = async () => {
    const { email } = this.props.route.params 
    // const userRef = dbh.collection('queue').doc('counter')
    // const increment = firebase.firestore.FieldValue.increment(1)
    // await userRef.update({ pplQueue: increment })
    this.props.navigation.navigate('Visit', { email:email })
  }

  onRecordPress = async () => {
    const { email } = this.props.route.params
    const userInfo = dbh.collection('users').doc(email)
    const doc = await userInfo.get()
    if (!doc.exists) {
      console.log('bakana!?!?!??!?!?!?!?!')
    } else {
      let data = doc.data()
      this.setState({ data:data })
      const name = data.userName
      this.props.navigation.navigate('Record', {name: name})
    }
  }

  onPaymentPress = async () => {
    const name = this.state.data.userName
    this.props.navigation.navigate('Payment', { name:name })
  }

  onViewPress = async () => {
    this.props.navigation.navigate('View Detail')
  }

  getInfo = async () => {
    const { email } = this.props.route.params
    const userInfo = dbh.collection('users').doc(email)
    const doc = await userInfo.get()
    if (!doc.exists) {
      console.log('No such shit')
    } else {
      let data = doc.data()
      this.setState({ data:data })
      console.log(data)
      console.log(data.userName)
      const result = Object.values(data)
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
          <Image style={styles.profileIcon} source={require('../assets/icons8-joining-queue-80.png')}/>
          <Text style={styles.greeting}>Queue</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {this.onViewPress} style={{padding: 20}}>  
          <Image style={styles.profileIcon} source={require('../assets/eye.png')}/>
          <Text style={styles.greeting}>View Queue</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.serviceContent}>
        <TouchableOpacity onPress = {this.onRecordPress} style={{padding: 20}}>  
          <Image style={styles.profileIcon} source={require('../assets/medical-file.png')}/>
          <Text style={styles.greeting}>Records</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {this.onPaymentPress} style={{padding: 20}}>  
          <Image style={styles.profileIcon} source={require('../assets/tap.png')}/>
          <Text style={styles.greeting}>Payment</Text>
        </TouchableOpacity>
      </View>
    </Container>
    )
  }
}

export default homeScreen

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

