import React from 'react-native';
const { Alert } = React;

function alert(title, message, buttons) {
  Alert.alert(title, message, buttons);
}

export default alert;
