import React from 'react';
import {Alert, ActivityIndicator, View, StyleSheet} from 'react-native';
import {LogoutView} from 'ad-b2c-react-native';

export default class Logout extends React.PureComponent {
  constructor(props) {
    super();
    this.onSuccess = this.onSuccess.bind(this);
    this.onFail = this.onFail.bind(this);
    this.spinner = this.spinner.bind(this);
  }

  onSuccess() {
    const {setAuthenticated} = this.props;
    setAuthenticated(false);
  }

  onFail(reason) {
    Alert.alert(reason);
  }

  spinner() {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  render() {
    return (
      <LogoutView
        style={styles.body}
        onSuccess={this.onSuccess}
        onFail={this.onFail}
        renderLoading={this.spinner}
      />
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
  spinner: {
    backgroundColor: '#222222',
    height: '100%',
    justifyContent: 'center',
  },
});
