/**
 * react-native-aad-b2c-sample
 * https://github.com/michaelburch/react-native-aad-b2c-sample
 *
 * This component retrieves an access token from adService
 * and displays it.
 */
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {adService} from 'ad-b2c-react-native';
import jwt_decode from 'jwt-decode';

export default class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      token: '',
      expires: '',
      iss: '',
      aud: '',
      idp: '',
      emails: [''],
      name: '',
      subject: '',
    };
  }
  // Navigate to the Logout screen when Logout button is pressed
  onLogout = () => {
    const {navigation} = this.props;
    navigation.navigate('Logout');
  };

  // Retrieve the access token
  getToken = async () => {
    let token = await adService.getAccessTokenAsync();
    let date = '';
    this.setState({token: token.data.split(' ')[1]});
    // Attempt to decode the token
    try {
      let decoded_token = jwt_decode(token.data.split(' ')[1]);
      try {
        date = new Date(decoded_token.exp * 1000);
        date = date.toString();
      } catch {}
      // Update state with decoded token values
      this.setState({
        token: decoded_token,
        expires: date,
        idp: decoded_token.idp,
        iss: decoded_token.iss,
        aud: decoded_token.aud,
        sub: decoded_token.sub,
        name: decoded_token.name,
        emails: decoded_token.emails,
      });
    } catch {}
  };

  componentDidMount = () => {
    this.getToken();
  };
  render() {
    return (
      // Define the view
      <View style={styles.body}>
        <View style={styles.frame} />
        <Text style={styles.headerText}>Access Token Details</Text>
        <View style={styles.body}>
          {/* Identity Provider */}
          <View style={styles.row}>
            <View style={styles.label}>
              <Text style={[styles.labelText]}>Identity provider:</Text>
            </View>
            <View style={styles.value}>
              <Text style={styles.valueText}>{this.state.idp}</Text>
            </View>
          </View>
          {/* Token Expiration */}
          <View style={styles.row}>
            <View style={styles.label}>
              <Text style={[styles.labelText]}>Expiration:</Text>
            </View>
            <View style={styles.value}>
              <Text style={styles.valueText}>{this.state.expires}</Text>
            </View>
          </View>
          {/* Token Issuer */}
          <View style={styles.row}>
            <View style={styles.label}>
              <Text style={[styles.labelText]}>Issuer:</Text>
            </View>
            <View style={styles.value}>
              <Text selectable style={styles.valueText}>
                {this.state.iss}
              </Text>
            </View>
          </View>
          {/* Token Subject */}
          <View style={styles.row}>
            <View style={styles.label}>
              <Text style={[styles.labelText]}>Subject:</Text>
            </View>
            <View style={styles.value}>
              <Text selectable style={styles.valueText}>
                {this.state.sub}
              </Text>
            </View>
          </View>
          {/* User Name */}
          <View style={styles.row}>
            <View style={styles.label}>
              <Text style={[styles.labelText]}>Name:</Text>
            </View>
            <View style={styles.value}>
              <Text selectable style={styles.valueText}>
                {this.state.name}
              </Text>
            </View>
          </View>
          {/* E-mails */}
          <View style={styles.row}>
            <View style={styles.label}>
              <Text style={[styles.labelText]}>E-mails:</Text>
            </View>
            <View style={styles.value}>
              <Text selectable style={styles.valueText}>
                {this.state.emails}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.frame}>
          <TouchableOpacity style={styles.button} onPress={this.onLogout}>
            <Text style={styles.bodyText}>Logout</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.92,
  },
  row: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#222',
  },
  label: {flex: 1, borderLeftWidth: 1, borderColor: '#222'},
  value: {
    flex: 2,
    alignContent: 'flex-start',
    borderLeftWidth: 1,
    borderColor: '#222',
  },
  frame: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#222',
  },
  bodyText: {
    color: 'white',
    alignSelf: 'center',
  },
  valueText: {
    color: 'white',
    marginLeft: 2,
    fontSize: 12,
  },
  labelText: {
    color: 'white',
    alignSelf: 'flex-start',
  },
  headerText: {
    color: 'white',
    paddingTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
