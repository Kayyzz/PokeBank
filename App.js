import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, ActivityIndicator, StatusBar} from 'react-native';
import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
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
  if (routeName === 'Home') {
    iconName = <Image source={require('./assets/pokeball_PNG30@3x.jpg')}/>;
  } else if (routeName === 'Settings') {
    iconName = <Image source={require('./assets/SettingsIcon.svg')}/>;
  }

  // You can return any component that you like here!
  // return <IconComponent name={iconName} size={25} color={tintColor} />;
};





const AppStack = createBottomTabNavigator({
  Home: {screen: HomeScreen},
  Shop: {screen: ShopScreen},
  Settings: {screen: SettingsScreen},
  Goals: {screen: GoalsScreen},
  Profile: {screen: ProfileScreen}
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) =>
      getTabBarIcon(navigation, focused, tintColor),
  }),
  tabBarOptions: {
    activeTintColor: 'b2b2b2',
    inactiveTintColor: 'steel',
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