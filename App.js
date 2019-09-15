import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, ActivityIndicator, StatusBar} from 'react-native';
import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import config from './config/config'
import Loading from './pages/Loading'
import SignUp from './pages/signup'
import Login from './pages/login'
import SignInScreen from './pages/home'
import * as Font from 'expo-font';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from './config.json';
const Icon = createIconSetFromFontello(fontelloConfig);

// import from firebase
//import from login page

import * as firebase from 'firebase';

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

// load fonts
function loadFont() {
  Font.loadAsync({
    'fontello': require('./resources/fonts/fontello.ttf'),
    'Raleway': require('./resources/fonts/Raleway-Bold.ttf')
  });
}

async function loadFont2() {
  await loadFont();
}

loadFont2();

//var numPokenom = 1;

function insertData(num) {
  firebase.database().ref('UsersList/').push({email}).then((data) => {
    console.log('data', data);
  });
}

class HomeScreen extends Component{
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

class ShopScreen extends React.Component{
  render() {
    return (
      <View>
        <Text>SHOP PAGE</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component{
  render() {
    return (
      <View>
        <Text>Settings PAGE</Text>
      </View>
    );
  }
}

class GoalsScreen extends React.Component{
  render() {
    return (
      <View>
        <Text>Goals PAGE</Text>
      </View>
    );
  }
}

class ProfileScreen extends React.Component{
  render() {
    return (
      <View>
        <Text>Profile PAGE</Text>
      </View>
    );
  }
}


const AppNavigator = createSwitchNavigator(
  {
    Loading: Loading, 
    SignUp: SignUp, 
    Login: Login, 
  }
);

const AppStack = createBottomTabNavigator({
  Profile: {screen: ProfileScreen},
  Goals: {screen: GoalsScreen},
  Home: {screen: HomeScreen},
  Shop: {screen: ShopScreen},
  Settings: {screen: SettingsScreen}
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) =>
      getTabBarIcon(navigation, focused, tintColor),
  }),
  tabBarOptions: {
    activeTintColor: '#b2b2b2',
    inactiveTintColor: '#8e8e93',
    labelStyle: {
      fontFamily: "Raleway",
      textAlign: "center",
      lineHeight: 22,
      fontSize: 10
    },
    style: {
      backgroundColor: '#F9F9F9',
      width: 360,
      height: 62.3
    },
  },
});

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    Auth: AppNavigator,
    Apps: AppStack
  },
  {
    initialRouteName: 'Auth'
  }
));


export default class App extends Component {
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


//const AuthStack = createStackNavigator({ SignIn: SignInScreen});

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Icon;
  let iconName;
  if (routeName === 'Shop') {
    iconName = `shopping-cart-black-shape`;
  } else if (routeName === 'Settings') {
    iconName = `settingsicon`;
  } else if (routeName === 'Goals') {
    iconName = `union-1`;
  } else if (routeName === 'Profile') {
    iconName = 'man-user';
  } 
 

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
