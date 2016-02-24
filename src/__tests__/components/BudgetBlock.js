  /* global jest, describe, it, expect */
jest.dontMock('../../components/BudgetBlock');
jest.dontMock('../../utils/objectMap');

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

  it('should save layout block', function () {
    const onLayout = jest.genMockFunction();
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetBlock
      blockId={blockId}
      budgetBlock={block}
      budgetactions={{}}
      onLayout={onLayout}/>);
    var output = shallowRenderer.getRenderOutput();
    const instance = shallowRenderer._instance._instance;
    const layoutEvent = {
      nativeEvent: {
        layout: {
          y: 133
        }
      }
    };
    output.props.onLayout(layoutEvent);
    expect(onLayout).toBeCalledWith(layoutEvent);
    expect(instance.layoutYPos).toEqual(133);
  });

  it('should save end drag', function () {
    const dragEndedCallback = jest.genMockFunction();
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetBlock
      blockId={blockId}
      budgetBlock={block}
      budgetactions={{}}
      dragEndedCallback={dragEndedCallback}/>);
    shallowRenderer.getRenderOutput();
    const instance = shallowRenderer._instance._instance;
    instance.dragEnded();
    expect(dragEndedCallback).toBeCalledWith();

    instance.animatePositionChange();
  });

  it('should do stuff when panning', function () {
    const dragStartCallback = jest.genMockFunction();
    const dragMoveCallback = jest.genMockFunction();
    const dragEndedCallback = jest.genMockFunction();
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetBlock
      blockId={blockId}
      budgetBlock={block}
      budgetactions={{}}
      scrollOffset={10}
      yOffset={10}
      dragStartCallback={dragStartCallback}
      dragMoveCallback={dragMoveCallback}
      dragEndedCallback={dragEndedCallback}/>);
    shallowRenderer.getRenderOutput();
    const instance = shallowRenderer._instance._instance;

    expect(instance.panResponder.panHandlers.onStartShouldSetPanResponder()).toBe(true);
    expect(instance.panResponder.panHandlers.onMoveShouldSetResponderCapture()).toBe(true);
    expect(instance.panResponder.panHandlers.onMoveShouldSetPanResponderCapture()).toBe(true);
    instance.panResponder.panHandlers.onPanResponderTerminate();
    instance.panResponder.panHandlers.onPanResponderRelease();

    instance.panResponder.panHandlers.onPanResponderGrant();
    expect(dragStartCallback).toBeCalledWith();

    instance.panResponder.panHandlers.onPanResponderMove({
      nativeEvent:{
        pageY: 100
      },
      touchHistory:{
        touchBank: [{

        }, {
          previousPageY: 5,
          currentPageY: 10
        }]
      }
    });
    expect(dragMoveCallback).toBeCalledWith(blockId, 100, true);
    expect(instance.state.reordering).toBe(true);
  });

});
