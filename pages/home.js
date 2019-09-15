import React, { Component } from 'react';
import { Button, StyleSheet, Platform, Image, Text, View } from 'react-native';
import firebase from 'firebase'
import config from '../config/config';
import t from 'tcomb-form-native';
import * as Font from 'expo-font';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config.json';
const Icon = createIconSetFromFontello(fontelloConfig);

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export default class SignInScreen extends Component {
  handleSubmit = () => {
    const value = this._form.getValue();
    console.log('value: ', value);
    this.props.navigation.navigate('Apps')
  }

  componentDidMount() {
    Font.loadAsync({
      'fontello': require('./resources/fonts/fontello.ttf'),
      'Raleway': require('./resources/fonts/Raleway-Bold.ttf')
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    <Text> form </Text>
  }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
