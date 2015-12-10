jest.dontMock('../lib/sum'); // or jest.autoMockOff();
jest.dontMock('../components/BudgetBlock');
jest.dontMock('../utils/objectMap');


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';


// cannot use es6 modules syntax because
// jest.dontMock & jest.autoMockOff()
// do not understand ES6 modules yet
const sum = require('../lib/sum').default;

const Nav = require('../components/BudgetBlock').BudgetBlock;

describe('sum', function () {

  it('adds 1 + 2 to equal 3', () =>  expect(sum(1, 2)).toBe(3))


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

  var navobj = TestUtils.renderIntoDocument(<Nav budgetBlock={block} />);
  var navNode = ReactDOM.findDOMNode(navobj);

  console.log(navobj)
  console.log(navNode.innerHTML)

});
