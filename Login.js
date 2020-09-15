import React from 'react';
import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {LoginView} from 'ad-b2c-react-native';
import * as SecureStore from './SecureStore';

export default class Login extends React.PureComponent {
  constructor(props) {
    super();
    this.webView = React.createRef();
  }

  // Update authenticated state in parent
  onLogin = () => {
    const {setAuthenticated} = this.props;
    setAuthenticated(true);
  };

  // Display errors
  onFail = (err) => {
    Alert.alert(err);
  };

  // Allow for navigating back (for changing providers, reviewing terms of service, etc)
  onBack = () => {
    this.webView.current._backHandler();
  };

  spinner = () => {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator animating={true} />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.body}>
        <View style={styles.frame} />
        <LoginView
          style={styles.webView}
          // appId must match "Application (client) ID" from AAD B2C
          // This is a working sample, be kind
          appId="5e439469-93d6-4e6d-b963-ffb8458b6019"
          // redirectURI should match the Mobile/Desktop Platform RedirectURI from AAD B2C
          redirectURI="https://rnb2csample.b2clogin.com/oauth2/nativeclient"
          tenant="rnb2csample"
          // User Flow / policy name
          loginPolicy="B2C_1_SignUp_SignIn"
          secureStore={SecureStore}
          renderLoading={this.spinner}
          onSuccess={this.onLogin}
          onFail={this.onFail}
          // Use ref forwarding to handle back navigation
          ref={this.webView}
          // Append scope for target API application. Access token for this will be returned
          scope="openid offline_access https://rnb2csample.onmicrosoft.com/f70e4ebd-a0da-487e-8d95-f9f026ebb7bc/read"
        />
        <View style={styles.frame}>
          <TouchableOpacity style={styles.button} onPress={this.onBack}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
// Define styles
const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
    opacity: 0.92,
  },
  frame: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webView: {backgroundColor: '#222222', flex: 1},
  button: {
    margin: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#222',
    width: 90,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  spinner: {
    backgroundColor: '#222222',
    height: '100%',
    justifyContent: 'center',
  },
});
