import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import Loading from './pages/Loading'
import SignUp from './pages/signup'
import Login from './pages/login'
import Main from './pages/main'
// import from firebase
//import from login page

import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyATojKo1uCOj9n1B0cHIVb5zdV_t7yX8Vs",
  authDomain: "hack-the-north-116dc.firebaseapp.com",
  databaseURL: "https://hack-the-north-116dc.firebaseio.com",
  storageBucket: "hack-the-north-116dc.appspot.com"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

//var numPokenom = 1;

function insertData(num) {
  firebase.database().ref('UsersList/').push({email}).then((data) => {
    console.log('data', data);
  });
}

const Form  = t.form.Form;

const User = t.struct({
  user_name: t.String,
  user_age: t.String,
  user_budget: t.String,
  terms: t.Boolean
})

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

const options = {
  fields: {
    user_name: {
      error: 'You need to input a name!'
    },
    user_age: {
      error: 'Let us know how old you are!'
    },
    terms: {
      label: 'Agree to Terms',
    },
  },
  stylesheet: formStyles,
};

const AppNavigator = createSwitchNavigator(
  {
    Loading: Loading, 
    SignUp: SignUp, 
    Login: Login, 
    Main: Main
  }
);

const AppContainer = createAppContainer(AppNavigator);
 

export default class App extends Component {

  handleSubmit = () => {
    const value = this._form.getValue();
    console.log('value: ', value);
  }
  
  render() {
    return (
      //<View style={styles.container}>
        <AppContainer />
        /*
        <Form 
          ref={c => this._form = c}
          type={User} 
          options={options}
        />
        <Button
          title="Sign Up!"
          onPress={this.handleSubmit}
        />
      */
      //</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
