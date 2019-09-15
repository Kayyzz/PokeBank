import React from 'react';
import { Button, StyleSheet, Platform, Image, Text, View } from 'react-native';
import firebase from 'firebase'
import config from '../config/config';

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export default class Main extends React.Component {
  state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState( {currentUser} );
  }

  handleLogout = () => {
    firebase.auth()
            .signOut()
            .then(() => {
                  this.setState = { currentUser: null };
                  this.props.navigation.navigate('Login')})
            .catch(error => this.setState({ errorMessage: error.message })) }

  render() {
    const { currentUser } = this.state;
    return (
      <View style={styles.container}>
        <Text>Hi {currentUser && currentUser.email}! </Text>
        <Button title='Log out' onPress={this.handleLogout} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})


