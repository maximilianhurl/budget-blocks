/* global jest, describe, it, expect */
jest.dontMock('../Navigation');
jest.dontMock('../utils/styles');
jest.setMock('alt-container/native', require('../__mocks__/native'));
jest.setMock('react-native-vector-icons/Ionicons', require('../__mocks__/Ionicons'));
jest.setMock('../../assets/blocks.png', {});

import TestUtils from 'react-addons-test-utils';
import React from 'react'; // eslint-disable-line no-unused-vars

// cannot use es6 modules syntax because
// jest.dontMock & jest.autoMockOff()
// do not understand ES6 modules yet
const Navigation = require('../Navigation').Navigation;
const NavBar = require('../Navigation').NavBar;

describe('nav.js', function () {

  var uiactions = {
    toggleEditControls: jest.genMockFunction()
  };

  const uistore = {
    editControlsVisible: false,
  };

  var navigator = {
    getCurrentRoutes() {
      return [{
        name: 'SETTINGS'
      }];
    },
    pop: jest.genMockFunction(),
    push: jest.genMockFunction()
  };

  const ReactNotNative = require('react'); // eslint-disable-line no-unused-vars

  it('should render Navigation', function () {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<Navigation uiactions={uiactions} uistore={uistore}/>);
    var output = shallowRenderer.getRenderOutput();
    expect(output).toBeTruthy();
    const innerView = output.props.children;
    // call methods to make sure contain no errors
    innerView.props.configureScene();
    expect(innerView.props.configureScene()).toEqual('VerticalDownSwipeJump');
    innerView.props.renderScene({
      name: 'SETTINGS'
    });
    innerView.props.renderScene({
      name: 'LIST'
    });
  });

  it('should render NavBar and open settings on press', function () {

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<NavBar navigator={navigator} uiactions={uiactions} uistore={uistore}/>);
    var output = shallowRenderer.getRenderOutput();
    expect(output).toBeTruthy();

    var settings = output.props.children[2];
    settings.props.onPress();
    expect(navigator.pop).toBeCalled();
  });

  it('should render NavBar and hide settings on press', function () {

    var listNavigator = {
      getCurrentRoutes() {
        return [{
          name: 'LIST'
        }];
      },
      push: jest.genMockFunction()
    };

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<NavBar navigator={listNavigator} uiactions={uiactions} uistore={uistore}/>);
    var output = shallowRenderer.getRenderOutput();
    expect(output).toBeTruthy();

    var settings = output.props.children[2];
    settings.props.onPress();
    expect(listNavigator.push).toBeCalledWith({
      name: 'SETTINGS'
    });
  });

  it('should trigger edit action', function () {

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<NavBar navigator={navigator} uiactions={uiactions} uistore={uistore}/>);
    var output = shallowRenderer.getRenderOutput();

    expect(uiactions.toggleEditControls).not.toBeCalled();
    var edit = output.props.children[3];
    edit.props.onPress();
    expect(uiactions.toggleEditControls).toBeCalled();
  });

});
