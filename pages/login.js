import React from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import firebase from 'firebase';
import config from '../config/config';

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null };
  handleLogin = () => {
    const {email, password} = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Apps'))
      .catch(error => this.setState( {errorMessage: error.message }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {this.state.errorMessage && 
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput 
          placeholder='Email'
          autoCapitalize='none'
          style={styles.textInput}
          onChangeText={email => this.setState( {email})}
          value={this.state.email}
        />
        <TextInput 
          placeholder='Password'
          autoCapitalize='none'
          style={styles.textInput}
          onChangeText={password => this.setState( {password})}
          value={this.state.password}
        />

        <Button title='Login' onPress={this.handleLogin} />
        <Button title="Don't have an account? Sign Up" onPress={()=> this.props.navigation.navigate('SignUp')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: '90%', 
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})
