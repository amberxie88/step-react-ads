// Link.react.test.js
import React from 'react';
import Title from './Title';
import renderer from 'react-test-renderer';

test('Title renders correct elements', () => {
  const component = renderer.create(<Title>Sample Text</Title>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
