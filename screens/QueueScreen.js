import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import { Button, Form, Item, Label, Input, Container, Text } from 'native-base';
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

//call function for tis sht bellow to work maybe??
async function exampleData(dbh) {
  // [START example_data]
  // [START firestore_query_filter_dataset]
  const citiesRef = dbh.collection('cities');

  await citiesRef.doc('SF').set({
    name: 'San Francisco', state: 'CA', country: 'USA',
    capital: false, population: 860000,
    regions: ['west_coast', 'norcal']
  });
  await citiesRef.doc('LA').set({
    name: 'Los Angeles', state: 'CA', country: 'USA',
    capital: false, population: 3900000,
    regions: ['west_coast', 'socal']
  });
  await citiesRef.doc('DC').set({
    name: 'Washington, D.C.', state: null, country: 'USA',
    capital: true, population: 680000,
    regions: ['east_coast']
  });
  await citiesRef.doc('TOK').set({
    name: 'Tokyo', state: null, country: 'Japan',
    capital: true, population: 9000000,
    regions: ['kanto', 'honshu']
  });
  await citiesRef.doc('BJ').set({
    name: 'Beijing', state: null, country: 'China',
    capital: true, population: 21500000,
    regions: ['jingjinji', 'hebei']
  });
  // [END firestore_query_filter_dataset]
  // [END example_data]
}
//call function for tis sht above to work maybe??

dbh.collection("cities").doc("SF").set({
  name: 'San Francisco', state: 'CA', country: 'USA',
  capital: false, population: 860000,
  regions: ['west_coast', 'norcal']
})

dbh.collection("characters").doc("mario").set({
  employmentball: "test3",
  outfitColor: "red",
  specialAttack: "elonmusk"
})

async function getDocument(dbh) {
  // [START get_document]
  // [START firestore_data_get_as_map]
  const cityRef = dbh.collection('cities').doc('SF');
  const doc = await cityRef.get();
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    console.log('Document data:', doc.data());
  }
  // [END firestore_data_get_as_map]
  // [END get_document]
}

class queueScreen extends React.Component {
  constructor(props) {
    super(props);
    this.getDocument(dbh)
    // this.getUser();
  }

  getDocument = async () => {
    const cityRef = dbh.collection('cities').doc('SF');
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
    const { item, otherParam } = this.props.route.params;
    return (
      <Container>
        <View>
          <Text>Queue here son</Text>
          <Text>Queue id is: {item}</Text>
          <Text>{otherParam}</Text>
        </View>
      </Container>
    )
  }
}

export default queueScreen