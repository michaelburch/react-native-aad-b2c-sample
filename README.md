<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h3 align="center">react-native-aad-b2c-sample</h3>

  <p align="center">
    A sample implementation of <a href="https://github.com/GSingh01/ad-b2c-react-native">ad-b2c-react-native</a> that connects a React Native app to Azure AD B2C for social login
    <br />
  </p>
</p>



<!-- ABOUT THE PROJECT -->
## About The Project

![Product Screen Shot](/sample-demo.gif)

This project demonstrates using Azure Active Directory B2C (AADB2C) for identity and access management in a React Native App. Social login with GitHub and Google are enabled, as well as sign up and sign in with e-mail.

AADB2C is an alternative to providers like Okta, Auth0 and AWS Cognito that simplifies mobile app authentication and allows you to avoid storing API credentials in your app.


<!-- GETTING STARTED -->
## Getting Started


1. Clone the repo
```sh
git clone https://github.com/michaelburch/react-native-aad-b2c-sample.git
```
2. Install NPM packages
```sh
cd react-native-aad-b2c-sample
npm install
```
3. Update CocoaPods
```sh
 (cd ios && pod install)
```
4. Launch on simulator
```sh
npx react-native run-ios
```

The sample is configured to use a live AADB2C tenant and connected Identity Providers so you can test logging in right away.

<!-- Configuration Details -->
## Azure AD B2C Configuration

The sample tenant has two applications registered. A mobile app, and a protected API. This enables users logging in to the mobile app to be automatically issued an access token which is used to access the protected API.

![App Registrations](/app-registrations.png)

## Mobile App Registration 

The mobile app (react-native-aad-b2c-sample) is configured with a single authentication platform and a single redirect URI.

![Authentication Platform](/authentication-platform.png)

For demonstrating access token usage, the mobile app has also been granted permission to the protected API (react-native-aad-b2c-sample-**api**)

![Mobile App Permissions](/api-permissions.png)

## Protected API Registration 

The protected API app (react-native-aad-b2c-sample-**api**) is registered with a web authentication platform and redirect URI. What's important for this sample is the API exposes a single scope ('read'):

![API App Scope](/api-expose.png)

This scope is referenced by the mobile app when an access token is requested at login. 


