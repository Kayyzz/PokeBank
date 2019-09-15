import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, ActivityIndicator, StatusBar} from 'react-native';
import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from './config.json';
import * as Font from 'expo-font';
const Icon = createIconSetFromFontello(fontelloConfig);
import t from 'tcomb-form-native';

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

class SignInScreen extends Component {
  handleSubmit = () => {
    const value = this._form.getValue();
    console.log('value: ', value);
    this.props.navigation.navigate('App')
  }

  componentDidMount() {
    Font.loadAsync({
      'fontello': require('./resources/fonts/fontello.ttf'),
      'Raleway': require('./resources/fonts/Raleway-Bold.ttf')
    });
    this.setState({ fontLoaded: true });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Form 
          ref={c => this._form = c}
          type={User} 
          options={options}
        />
        <Button
          title="Sign Up!"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Text>HOME PAGE</Text>
      </View>
    );
  }
}

class ShopScreen extends Component{
  render() {
    return (
      <View>
        <Text>SHOP PAGE</Text>
      </View>
    );
  }
}

class SettingsScreen extends Component{
  render() {
    return (
      <View>
        <Text>Settings PAGE</Text>
      </View>
    );
  }
}

class GoalsScreen extends Component{
  render() {
    return (
      <View>
        <Text>Goals PAGE</Text>
      </View>
    );
  }
}

class ProfileScreen extends Component{
  render() {
    return (
      <View>
        <Text>Profile PAGE</Text>
      </View>
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
}
);


const AuthStack = createStackNavigator({ SignIn: SignInScreen});

export default createAppContainer(createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: 'Auth'
  }
));