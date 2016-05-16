/* global jest, describe, it, expect */
jest.dontMock('../NavContainer');
jest.setMock('alt-container/native', require('../__mocks__/native'));
jest.setMock('../actions/PersistenceActions', require('../__mocks__/PersistenceActions'));
jest.setMock('react-native-vector-icons/Ionicons', require('../__mocks__/Ionicons'));

import TestUtils from 'react-addons-test-utils';
import React from 'react-native'; // eslint-disable-line no-unused-vars

var PersistenceActions = require('../actions/PersistenceActions');
const NavContainer = require('../NavContainer').NavContainer;

describe('NavContainer', function () {

  it('should try to load the app status', function () {
    React.AppState.addEventListener = jest.genMockFunction();
    React.AppState.removeEventListener = jest.genMockFunction();

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<NavContainer/>);
    var output = shallowRenderer.getRenderOutput();
    expect(output).toBeTruthy();
    const instance = shallowRenderer._instance._instance;

    instance.componentDidMount();
    expect(React.AppState.addEventListener).toBeCalled();
    instance.componentWillUnmount();
    expect(React.AppState.removeEventListener).toBeCalled();
  });

  it('should persist state on pause', function () {

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<NavContainer/>);
    var output = shallowRenderer.getRenderOutput();
    expect(output).toBeTruthy();
    const instance = shallowRenderer._instance._instance;

    instance.handleAppStateChange('active');
    expect(PersistenceActions.loadPersistentState).toBeCalled();
    expect(PersistenceActions.persistState).not.toBeCalled();
    instance.handleAppStateChange('started');
    expect(PersistenceActions.persistState).not.toBeCalled();
    instance.handleAppStateChange('background');
    expect(PersistenceActions.persistState).toBeCalled();
  });

});
