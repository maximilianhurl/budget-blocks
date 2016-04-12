/* global jest, describe, it, expect */
jest.dontMock('../../index.ios');
jest.setMock('alt-container/native', require('../__mocks__/native'));
jest.setMock('../actions/PersistenceActions', require('../__mocks__/PersistenceActions'));

import TestUtils from 'react-addons-test-utils';
import React from 'react-native'; // eslint-disable-line no-unused-vars

// cannot use es6 modules syntax because
// jest.dontMock & jest.autoMockOff()
// do not understand ES6 modules yet

var PersistenceActions = require('../actions/PersistenceActions');
const BudgetBlocks = require('../../index.ios').default;

describe('Index iOS', function () {

  it('should render data correctly with methods', function () {
    React.AppStateIOS.addEventListener = jest.genMockFunction();
    React.AppStateIOS.removeEventListener = jest.genMockFunction();

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetBlocks/>);
    var output = shallowRenderer.getRenderOutput();
    expect(output).toBeTruthy();
    const instance = shallowRenderer._instance._instance;

    instance.componentDidMount();
    expect(React.AppStateIOS.addEventListener).toBeCalled();
    instance.componentWillUnmount();
    expect(React.AppStateIOS.removeEventListener).toBeCalled();
  });

  it('should persist state on pause', function () {

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetBlocks/>);
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
