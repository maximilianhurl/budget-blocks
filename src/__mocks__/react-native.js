/* eslint-disable react/no-multi-comp */
/**
 * @see http://www.schibsted.pl/2015/10/testing-react-native-components-with-jest/
 */
import React from 'react';
const ReactNative = React;

ReactNative.StyleSheet = {
  create: function create(styles) {
    return styles;
  }
};

class View extends React.Component {
    render() {
      return (<div> { this.props.children } </div>);
    }
}

class Text extends React.Component {
    render() {
      return (<p> { this.props.children } </p>);
    }
}

class PixelRatio extends React.Component {
    static get() { return 1; }
}

ReactNative.AsyncStorage = {
  setItem() {
    return false;
  },

  getItem() {
    return false;
  }
};

ReactNative.View = View;
ReactNative.ScrollView = View;
ReactNative.Text = Text;
ReactNative.TouchableOpacity = View;
ReactNative.TouchableWithoutFeedback = View;
ReactNative.ToolbarAndroid = View;
ReactNative.Image = View;
ReactNative.PixelRatio = PixelRatio;
ReactNative.NativeModules = {};
ReactNative.Platform = {};
ReactNative.Alert = {
  alert(title, message, buttons) {
    //mock to make sure tests dont blow up due to react native dynamic loading
    if (buttons && buttons.length) {
      buttons[0].onPress();
    }
  }
};
ReactNative.PanResponder = {
  create: function (panSettings) {
    this.panSettings = panSettings;

    return {
      panHandlers: []
    };
  }
};

ReactNative.Animated = {
  ValueXY: function (x, y) {
    this.x = x;
    this.y = y;
  },
  spring: function () {
    return {
      start: function () {}
    };
  },
  View: View
};

module.exports = ReactNative;
