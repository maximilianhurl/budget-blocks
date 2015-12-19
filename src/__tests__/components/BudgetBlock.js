/* global jest, describe, it, expect */
jest.dontMock('../../components/BudgetBlock');
jest.dontMock('../../utils/objectMap');

import TestUtils from 'react-addons-test-utils';
import React from 'react-native';
let { Text } = React;

// cannot use es6 modules syntax because
// jest.dontMock & jest.autoMockOff()
// do not understand ES6 modules yet
const BudgetBlock = require('../../components/BudgetBlock').BudgetBlock;

describe('BudgetBlock', function () {

  const ReactNotNative = require('react'); // eslint-disable-line no-unused-vars

  it('should render data correctly', function () {

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

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetBlock budgetBlock={block} />);

    var output = shallowRenderer.getRenderOutput();

    var title = output.props.children[0];
    expect(title.type).toEqual(Text);
    expect(title.props.children[0]).toEqual('Block Title: ');
    expect(title.props.children[1]).toEqual(block.title);

    var blocks = output.props.children[2];
    expect(blocks.length).toEqual(1);
    expect(blocks[0].props.blockItem).toEqual(block.items[0]);

    var subtotal = output.props.children[3];
    expect(subtotal.type).toEqual(Text);
    expect(subtotal.props.children[0]).toEqual('Subtotal: £');
    expect(subtotal.props.children[1]).toEqual(block.subtotal);

  });

});
