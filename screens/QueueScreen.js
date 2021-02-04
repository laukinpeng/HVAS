import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, View, Text} from 'react-native';
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

const sample = firebase.firestore();

// //call function for tis sht bellow to work maybe??
// async function exampleData(sample) {
//   // [START example_data]
//   // [START firestore_query_filter_dataset]
//   const citiesRef = sample.collection('cities');

//   await citiesRef.doc('SF').set({
//     name: 'San Francisco', state: 'CA', country: 'USA',
//     capital: false, population: 860000,
//     regions: ['west_coast', 'norcal']
//   });
//   await citiesRef.doc('LA').set({
//     name: 'Los Angeles', state: 'CA', country: 'USA',
//     capital: false, population: 3900000,
//     regions: ['west_coast', 'socal']
//   });
//   await citiesRef.doc('DC').set({
//     name: 'Washington, D.C.', state: null, country: 'USA',
//     capital: true, population: 680000,
//     regions: ['east_coast']
//   });
//   await citiesRef.doc('TOK').set({
//     name: 'Tokyo', state: null, country: 'Japan',
//     capital: true, population: 9000000,
//     regions: ['kanto', 'honshu']
//   });
//   await citiesRef.doc('BJ').set({
//     name: 'Beijing', state: null, country: 'China',
//     capital: true, population: 21500000,
//     regions: ['jingjinji', 'hebei']
//   });
//   // [END firestore_query_filter_dataset]
//   // [END example_data]
// }
// //call function for tis sht above to work maybe??

// // write to firestore
// sample.collection("cities").doc("SF").set({
//   name: 'San Francisco', state: 'CA', country: 'USA',
//   capital: false, population: 860000,
//   regions: ['west_coast', 'norcal']
// })

// sample.collection("characters").doc("mario").set({
//   employmentball: "test3",
//   outfitColor: "red",
//   specialAttack: "elonmusk"
// })

// async function getDocument(sample) {
//   // [START get_document]
//   // [START firestore_data_get_as_map]
//   const cityRef = sample.collection('cities').doc('SF');
//   const doc = await cityRef.get();
//   if (!doc.exists) {
//     console.log('No such document!');
//   } else {
//     console.log('Document data:', doc.data());
//   }
//   // [END firestore_data_get_as_map]
//   // [END get_document]
// }

class queueScreen extends React.Component {
  constructor(props) {
    super(props);
    this.getDocument(sample)
    // this.getUser();
  }

  //read from firestore 
  getDocument = async () => {
    const cityRef = sample.collection('cities').doc('SF');
    const doc = await cityRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }
  }

  // getUser = async () => {
  //   console.log("trying to get info")
  //   const userDocument = await firestore().collection("users").
  //   doc('0M1j9jC3AS0o8w2JoTx0').get()
  //   console.log(userDocument)
  // }

  render() {
    const { email, userName } = this.props.route.params;
    console.log(email)
    console.log(userName)
    return (
      <Container>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTop}>Thank you for waiting</Text>
          <Text style={styles.headerText}>Here's your postion in the queue</Text>
        </View>
        <View style={styles.number}>
          <Text style={styles.queueText}>1</Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>We'll inform you when it is your turn</Text>
        </View>
        <View style={styles.leaveContainer}>
          <Button rounded danger style={{ alignSelf: 'center', width: '30%' }}>
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