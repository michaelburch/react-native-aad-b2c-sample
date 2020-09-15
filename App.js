/**
 * react-native-aad-b2c-sample
 * https://github.com/michaelburch/react-native-aad-b2c-sample
 *
 * This is a sample implementation of ad-b2c-react-native that connects
 * a React Native app to Azure AD B2C for social login
 * https://github.com/GSingh01/ad-b2c-react-native
 */

import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import Login from './Login';
import Logout from './Logout';
import Home from './Home';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
    };
  }

  setAuthenticated = (authenticated) => {
    this.setState({
      authenticated: authenticated,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.scrollView}>
        <Text style={styles.bodyText}>react-native-aad-b2c-sample</Text>
        <NavigationContainer theme={DarkTheme}>
          <Stack.Navigator>
            {
              // Render different stacks based on authentication status
              !this.state.authenticated ? (
                <>
                  <Stack.Screen
                    name="Login"
                    options={{
                      headerShown: true,
                      animationEnabled: false,
                    }}
                    children={(props) => (
                      <Login
                        setAuthenticated={this.setAuthenticated}
                        {...props}
                      />
                    )}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                      headerShown: true,
                      animationEnabled: false,
                      cardStyle: {
                        backgroundColor: 'black',
                      },
                    }}
                  />
                  <Stack.Screen
                    name="Logout"
                    options={{
                      headerShown: true,
                      animationEnabled: false,
                      cardStyle: {
                        backgroundColor: 'black',
                      },
                    }}
                    children={(props) => (
                      <Logout
                        setAuthenticated={this.setAuthenticated}
                        {...props}
                      />
                    )}
                  />
                </>
              )
            }
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'black',
  },
  bodyText: {
    color: 'white',
    alignSelf: 'center',
    padding: 5,
    fontSize: 18,
  },
});

export default App;
