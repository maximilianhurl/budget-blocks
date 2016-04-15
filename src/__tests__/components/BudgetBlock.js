  /* global jest, describe, it, expect */
jest.dontMock('../../components/BudgetBlock');
jest.dontMock('../../utils/objectMap');

jest.setMock('react-native-vector-icons/Ionicons', require('../../__mocks__/Ionicons'));

import TestUtils from 'react-addons-test-utils';
import React from 'react-native';
const { TextInput } = React;

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

  var uistore = {
    editControlsVisible: true,
    currencySymbol: '£'
  };

  var blockId = 'cats1234';

  it('should render data correctly', function () {

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetBlock
      budgetBlock={block}
      uistore={uistore}
      blockId={blockId}/>);

    var output = shallowRenderer.getRenderOutput();

    var innerView = output.props.children;
    var titleView = innerView.props.children[0];

    var title = titleView.props.children[0];
    expect(title.type).toEqual(TextInput);
    expect(title.props.value).toEqual(block.title);

    var blocks = innerView.props.children[1];
    expect(blocks.length).toEqual(1);
    expect(blocks[0].props.blockItem).toEqual(block.items[0]);

    var subtotal = innerView.props.children[3];
    expect(subtotal.props.children[0].props.children).toEqual('£');
    expect(subtotal.props.children[1].props.children).toEqual(block.subtotal);
  });

  it('should remove block', function () {
    var actions = {
      removeBudgetBlock: jest.genMockFunction()
    };

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetBlock
      blockId={blockId}
      budgetBlock={block}
      uistore={uistore}
      budgetactions={actions}/>);
    const output = shallowRenderer.getRenderOutput();
    const innerView = output.props.children;
    const titleView = innerView.props.children[0];
    titleView.props.children[2].props.onPress();
    expect(actions.removeBudgetBlock).toBeCalledWith(blockId);
  });

  it('should not display remove', function () {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetBlock
      blockId={blockId}
      budgetBlock={block}
      uistore={{ editControlsVisible: false}}
      budgetactions={{}}/>);
    const output = shallowRenderer.getRenderOutput();
    const innerView = output.props.children;
    const titleView = innerView.props.children[0];
    expect(titleView.props.children[2]).toBe(null);
  });

  it('should add block', function () {
    var actions = {
      addBudgetBlockItem: jest.genMockFunction()
    };

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetBlock
      blockId={blockId}
      budgetBlock={block}
      uistore={uistore}
      budgetactions={actions}/>);
    const output = shallowRenderer.getRenderOutput();
    const innerView = output.props.children;
    innerView.props.children[2].props.onPress();
    expect(actions.addBudgetBlockItem).toBeCalledWith(blockId, 'Outgoing...', '0');
  });

  it('should update block title', function () {
    var actions = {
      updateBudgetBlockTitle: jest.genMockFunction()
    };

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetBlock
      blockId={blockId}
      budgetBlock={block}
      uistore={uistore}
      budgetactions={actions}/>);
    const output = shallowRenderer.getRenderOutput();
    const innerView = output.props.children;
    const titleView = innerView.props.children[0];
    titleView.props.children[0].props.onChangeText('cat title');
    expect(actions.updateBudgetBlockTitle).toBeCalledWith(blockId, 'cat title');
  });

  it('should save layout block', function () {
    const onLayout = jest.genMockFunction();
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetBlock
      blockId={blockId}
      budgetBlock={block}
      budgetactions={{}}
      uistore={uistore}
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
      uistore={uistore}
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
      uistore={uistore}
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
