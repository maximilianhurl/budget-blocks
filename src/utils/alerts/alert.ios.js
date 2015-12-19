import React from 'react-native';
const { AlertIOS } = React;

function alert(title, message, buttons) {
  AlertIOS.alert(title, message, buttons);
}

export default alert;
