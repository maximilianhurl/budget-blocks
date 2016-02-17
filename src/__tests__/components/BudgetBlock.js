  /* global jest, describe, it, expect */
jest.dontMock('../../components/BudgetBlock');
jest.dontMock('../../utils/objectMap');
jest.dontMock('../../__mocks__/alert');
jest.setMock('../../utils/alerts/alert', require('../../__mocks__/alert'));

jest.setMock('../../utils/alerts/alert', require('../../__mocks__/alert'));

import TestUtils from 'react-addons-test-utils';
import React from 'react-native';
const { Text } = React;

// cannot use es6 modules syntax because
// jest.dontMock & jest.autoMockOff()
// do not understand ES6 modules yet
const BudgetBlock = require('../../components/BudgetBlock').BudgetBlock;

describe('BudgetBlock', function () {

  const ReactNotNative = require('react'); // eslint-disable-line no-unused-vars

  var block = {
    items: [
      {
        obj: 'cat',
        key: 'cat1'
      }
    ],
    title: 'cats',
    subtotal: '1.00'
  };

  var blockId = 'cats1234';

  it('should render data correctly', function () {

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetBlock budgetBlock={block} blockId={blockId}/>);

    var output = shallowRenderer.getRenderOutput();

    var innerView = output.props.children;

    var title = innerView.props.children[1];
    expect(title.type).toEqual(Text);
    expect(title.props.children[0]).toEqual('Block Title: ');
    expect(title.props.children[1]).toEqual(block.title);

    var blocks = innerView.props.children[4];
    expect(blocks.length).toEqual(1);
    expect(blocks[0].props.blockItem).toEqual(block.items[0]);

    var subtotal = innerView.props.children[6];
    expect(subtotal.type).toEqual(Text);
    expect(subtotal.props.children[0]).toEqual('Subtotal: £');
    expect(subtotal.props.children[1]).toEqual(block.subtotal);
  });

  it('should remove block', function () {
    var actions = {
      removeBudgetBlock: jest.genMockFunction()
    };

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetBlock
      blockId={blockId}
      budgetBlock={block}
      budgetactions={actions}/>);
    const output = shallowRenderer.getRenderOutput();
    const innerView = output.props.children;
    innerView.props.children[3].props.onPress();
    expect(actions.removeBudgetBlock).toBeCalledWith(blockId);
  });

  it('should add block', function () {
    var actions = {
      addBudgetBlockItem: jest.genMockFunction()
    };

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetBlock
      blockId={blockId}
      budgetBlock={block}
      budgetactions={actions}/>);
    const output = shallowRenderer.getRenderOutput();
    const innerView = output.props.children;
    innerView.props.children[5].props.onPress();
    expect(actions.addBudgetBlockItem).toBeCalledWith(blockId, 'New outgoing', 0);
  });

  it('should update block title', function () {
    var actions = {
      updateBudgetBlockTitle: jest.genMockFunction()
    };

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetBlock
      blockId={blockId}
      budgetBlock={block}
      budgetactions={actions}/>);
    const output = shallowRenderer.getRenderOutput();
    const innerView = output.props.children;
    innerView.props.children[2].props.onChangeText('cat title');
    expect(actions.updateBudgetBlockTitle).toBeCalledWith(blockId, 'cat title');
  });

});
