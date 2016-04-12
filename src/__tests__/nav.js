/* global jest, describe, it, expect */
jest.dontMock('../nav');
jest.setMock('alt-container/native', require('../__mocks__/native'));

import TestUtils from 'react-addons-test-utils';
import React from 'react-native'; // eslint-disable-line no-unused-vars
import UIActions from '../actions/UIActions';

// cannot use es6 modules syntax because
// jest.dontMock & jest.autoMockOff()
// do not understand ES6 modules yet
const Navigation = require('../nav').Navigation;
const NavBar = require('../nav').NavBar;

describe('nav.js', function () {

  const ReactNotNative = require('react'); // eslint-disable-line no-unused-vars

  it('should render Navigation', function () {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<Navigation/>);
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

    var navigator = {
      getCurrentRoutes() {
        return [{
          name: 'SETTINGS'
        }];
      },
      pop: jest.genMockFunction()
    };

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<NavBar navigator={navigator}/>);
    var output = shallowRenderer.getRenderOutput();
    expect(output).toBeTruthy();

    var settings = output.props.children[1];
    settings.props.onPress();
    expect(navigator.pop).toBeCalled();
  });

  it('should render NavBar and hide settings on press', function () {

    var navigator = {
      getCurrentRoutes() {
        return [{
          name: 'cats'
        }];
      },
      push: jest.genMockFunction()
    };

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<NavBar navigator={navigator}/>);
    var output = shallowRenderer.getRenderOutput();
    expect(output).toBeTruthy();

    var settings = output.props.children[1];
    settings.props.onPress();
    expect(navigator.push).toBeCalled({
      name: 'SETTINGS'
    });
  });

  it('should trigger edit action', function () {

    UIActions.toggleEditControls = jest.genMockFunction();

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<NavBar/>);
    var output = shallowRenderer.getRenderOutput();

    expect(UIActions.toggleEditControls).not.toBeCalled();
    var edit = output.props.children[2];
    edit.props.onPress();
    expect(UIActions.toggleEditControls).toBeCalled();
  });

});
