import React, { Component } from 'react';
import { AppRegistry, TouchableHighlight, Platform, StyleSheet, Text, View, Button, AsyncStorage, ActivityIndicator, StatusBar, Image} from 'react-native';
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
import * as firebase from 'firebase';


const Icon = createIconSetFromFontello(fontelloConfig);

// import from firebase
//import from login page


// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const initialCustomerId = "d7b518ac-b11d-4e18-9ace-6c24342a7c6b";

var savings = 0;

var myInit = {
  method: 'GET',
  headers: {
    'Authorization': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDQlAiLCJ0ZWFtX2lkIjoiMzY4MTI0ODItZDgxNy0zNDQ1LThkYzYtNDhlYWRiYjJmOGYxIiwiZXhwIjo5MjIzMzcyMDM2ODU0Nzc1LCJhcHBfaWQiOiJmMDYwN2I0NC1jYWY5LTRlNGEtOTU3NS03ODc3MjllOWRkMjUifQ.z15cdCC5QVj7JvaJKGPAaAjAmviLUjv7fKUVjlYy6OI"
  }
};

var myRequest = new Request('https://api.td-davinci.com/api/customers/d7b518ac-b11d-4e18-9ace-6c24342a7c6b/accounts', myInit);

var fetchNow = function(){
  fetch(myRequest)
  .then(response => response.json())
  .then(json => {
    // the json variable contains the response from the API
    savings = json.result.bankAccounts[1].balance;
  });
  return savings;
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

  constructor(){
    super()
    this.state = {
      myText: 'Savings $' + savings
    }
  }
  updateText = () => {
    savings = fetchNow();
    this.setState({myText: 'Savings $' + savings});
  }

  render() {
    
    return (
      <View>
        <Image
          style={styles.grass}
          source={require('./assets/Asset-1.png')}
        />
       <Image
          style={styles.logo}
          source={require('./assets/PokeBank-Logo2.jpg')}
        />
        <Text onPress = {this.updateText} style= {styles.SavingsDisplay}>{this.state.myText}</Text>
        <Image style={{width:100, height:100, alignSelf: 'center', position: 'absolute', top: 300}}
         source={{uri: cheap_dict[cheap_dict_keys[5]][0]}}/>  
        <Image style={{width:100, height:100, position: 'absolute', top: 460,right: 200}}
         source={{uri: cheap_dict[cheap_dict_keys[0]][0]}}/>     
      </View>
    )
  }
}




class SettingsScreen extends React.Component{
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
        <Image
          style={styles.logo}
          source={require('./assets/PokeBank-Logo2.jpg')}/>
        <Text style = {styles.LogoutButton}> Hi {currentUser && currentUser.email}! </Text>
        <Button title='Log out' onPress={this.handleLogout} />
      </View>
    );
  }
}
var cheap_dict = {
  "Bulbasaur": ["https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif", false],
  "Charmander": ["https://img.pokemondb.net/sprites/black-white/anim/normal/charmander.gif", false],
  "Squirtle": ["https://img.pokemondb.net/sprites/black-white/anim/normal/squirtle.gif", false],
  "Pikachu": ["https://img.pokemondb.net/sprites/black-white/anim/normal/pikachu-f.gif", false],
  "Dratini": ["https://img.pokemondb.net/sprites/black-white/anim/normal/dratini.gif", false],
  "Eevee": ["https://img.pokemondb.net/sprites/black-white/anim/normal/eevee.gif", false],
  "Electabuzz": ["http://www.pokestadium.com/sprites/xy/electabuzz.gif", false],
  "Magmar": ["http://www.pokestadium.com/sprites/xy/magmar.gif", false],
  "Scyther": ["http://www.pokestadium.com/sprites/xy/scyther.gif", false],
  "Pinsir": ["http://www.pokestadium.com/sprites/xy/pinsir.gif", false],
  "Lapras": ["https://img.pokemondb.net/sprites/black-white/anim/normal/lapras.gif", false],
  "Venusaur": ["http://www.pokestadium.com/sprites/xy/venusaur-female.gif", false],
  "Charizard": ["http://www.pokestadium.com/sprites/xy/charizard.gif", false],
  "Blastoise": ["http://www.pokestadium.com/sprites/xy/blastoise.gif", false],
  "Dragonite": ["http://www.pokestadium.com/sprites/xy/dragonite.gif", false],
  "Snorlax": ["http://www.pokestadium.com/sprites/xy/snorlax.gif", false]
}
var cheap_dict_keys = Object.keys(cheap_dict);


var cheap_dict = {
  "Bulbasaur": ["https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif", false],
  "Charmander": ["https://img.pokemondb.net/sprites/black-white/anim/normal/charmander.gif", false],
  "Squirtle": ["https://img.pokemondb.net/sprites/black-white/anim/normal/squirtle.gif", false],
  "Pikachu": ["https://img.pokemondb.net/sprites/black-white/anim/normal/pikachu-f.gif", false],
  "Dratini": ["https://img.pokemondb.net/sprites/black-white/anim/normal/dratini.gif", false],
  "Eevee": ["https://img.pokemondb.net/sprites/black-white/anim/normal/eevee.gif", false],
  "Electabuzz": ["http://www.pokestadium.com/sprites/xy/electabuzz.gif", false],
  "Magmar": ["http://www.pokestadium.com/sprites/xy/magmar.gif", false],
  "Scyther": ["http://www.pokestadium.com/sprites/xy/scyther.gif", false],
  "Pinsir": ["http://www.pokestadium.com/sprites/xy/pinsir.gif", false],
  "Lapras": ["https://img.pokemondb.net/sprites/black-white/anim/normal/lapras.gif", false],
  "Venusaur": ["http://www.pokestadium.com/sprites/xy/venusaur-female.gif", false],
  "Charizard": ["http://www.pokestadium.com/sprites/xy/charizard.gif", false],
  "Blastoise": ["http://www.pokestadium.com/sprites/xy/blastoise.gif", false],
  "Dragonite": ["http://www.pokestadium.com/sprites/xy/dragonite.gif", false],
  "Snorlax": ["http://www.pokestadium.com/sprites/xy/snorlax.gif", false]
}
  
var cheap_dict_keys = Object.keys(cheap_dict);

class ShopScreen extends React.Component{
  render() {
    savings -= 1005;
  
    return (
      <View style={{top: 170, flex: 0.5, justifyContent: 'center', flexDirection: 'column'}}>
        <Text style={{alignSelf: 'center'}}> You obtained </Text>
        <Image
          style={styles.logo}
          source={require('./assets/PokeBank-Logo2.jpg')}
        />    
        <Image style={{width:100, height:100, alignSelf: 'center'}}
         source={{uri: cheap_dict[cheap_dict_keys[14]][0]}}/>
        <Text style={{alignSelf: 'center'}}> $1005 </Text>
      </View>
    );
  }
}


class GoalsScreen extends React.Component{
  
  render() {
    return (
      <View style={styles.SavingsDisplay}>
        <Image
           style={styles.logo}
           source={require('./assets/PokeBank-Logo2.jpg')}/>
        <Text>How much money are you aiming to save this week?</Text>
      </View>
    );
  }

  componentDidMount() {
    Font.loadAsync({
      'fontello': require('./resources/fonts/fontello.ttf'),
      'Raleway': require('./resources/fonts/Raleway-Bold.ttf')
    });
  }
}

class ProfileScreen extends Component{
  render() {
    return (
      <View style={{justifyContent: 'center', top: 200, flexDirection: 'column'}}>
      <Image
          style={styles.logo}
          source={require('./assets/PokeBank-Logo2.jpg')}
        />
        <Text style={{alignSelf: 'center'}}> Your current Inventory </Text>
        <Image 
          style = {{width: 70, height: 70, alignSelf: 'center'}}
          source={{uri: cheap_dict["Bulbasaur"][0]}}/>
        <Image
          style = {{width: 95, height: 95, alignSelf: 'center'}}
          source={{uri: cheap_dict["Scyther"][0]}}/>
        <Image
          style = {{width: 100, height: 110, alignSelf: 'center'}}
          source={{uri: cheap_dict["Dragonite"][0]}}/>
        <Image
          style = {{width: 80, height: 80, alignSelf: 'center'}}
          source={{uri: cheap_dict["Eevee"][0]}}/>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  grass: {
    width: 360,
    height: 299.6,
    position: 'relative', 
    top: 330
  },

  logo: {
    width: 122,
    height: 47,
    position: 'absolute',
    top: 20

  },

  SavingsDisplay: {
    width: 122,
    height: 100,
    position: 'absolute',
    top: 50,
    left: 215,
    fontFamily: "Raleway",
    fontSize: 18
  },

  // LogoutButton: {
  //   width: 100,
  //   height: 100,
  //   position: 'absolute',
  //   top: 300
  // },
});

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
  } else if (routeName === 'Home'){
    iconName = 'pokeball';
  }
 

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};


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
        <AppContainer />
    );
  }
}
