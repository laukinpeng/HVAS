import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, View, Image, TouchableOpacity} from 'react-native';
import { Container, Header, Content, Card, CardItem, Icon, Right, Text, Body } from 'native-base';

class homeScreen extends React.Component {
  constructor(props){
    super(props);
  }

  onQueuePress = () => {
    console.log("queue to the line")
    this.props.navigation.navigate('Queue', {item: 86, otherParam: 'hello bitch'})
  }

  render() {
    return(
    <Container>
      <View style={styles.welcomeContainer}>
        <Image style={styles.profileIcon} source={require('../assets/user.png')}/>
        <Text style={styles.greeting}>Hello User</Text>
      </View>
      <View style={styles.serviceContainer}>
        <Text style={styles.serviceHeader}>Services</Text>
      </View>
      <View style={styles.serviceContent}>
        <TouchableOpacity onPress = {this.onQueuePress}>  
          <Image style={styles.profileIcon} source={require('../assets/queue.png')}/>
          <Text style={styles.greeting}>Queue</Text>
        </TouchableOpacity>
        <TouchableOpacity>  
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
  },

  serviceIcon: {
    width: 70,
    height: 70,
  },

  greeting: {
    color: 'white',
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
    padding: 10,
  },
})

export default homeScreen