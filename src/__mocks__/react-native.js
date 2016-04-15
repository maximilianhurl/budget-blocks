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

class Image extends React.Component {
    render() {
      return null;
    }
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
ReactNative.Image = Image;
ReactNative.PixelRatio = PixelRatio;
ReactNative.NativeModules = {};
ReactNative.Platform = {};
ReactNative.Navigator = {
  SceneConfigs: {
    VerticalDownSwipeJump: 'VerticalDownSwipeJump'
  }
};
ReactNative.AppRegistry = {
  registerComponent: () => {}
};
ReactNative.AppStateIOS = {
  addEventListener: () => {},
  removeEventListener: () => {}
};
ReactNative.StatusBar = {
  setBarStyle: () => {}
};
ReactNative.Alert = {
  alert(title, message, buttons) {
    //mock to make sure tests dont blow up due to react native dynamic loading
    if (buttons && buttons.length) {
      buttons[0].onPress();
    }
  }
};
ReactNative.PanResponder = {
  create: function (panHandlers) {
    return {
      panHandlers: panHandlers
    };
  }
};

ReactNative.Animated = {
  ValueXY: function (x, y) {
    this.x = x;
    this.y = y;
    this.setValue = function () {};
  },
  spring: function () {
    return {
      start: function () {}
    };
  },
  View: View
};

ReactNative.LayoutAnimation = {
  configureNext () {
    return;
  },
  Presets: {
    easeInEaseOut: 'cats'
  },
  Types: {
    curveEaseInEaseOut: 'curved cats'
  },
  Properties: {
    opacity: 'Visible cats'
  }
};

module.exports = ReactNative;
