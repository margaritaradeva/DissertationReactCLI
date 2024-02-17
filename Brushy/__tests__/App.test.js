import React from 'react';
import renderer from 'react-test-renderer';
import { HomeScreen, ParentScreen, RewardsScreen } from '../src/screens';

// Make sure the screens render correctly
test('renders HomeScreen correctly', () => {
  const tree = renderer.create(<HomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders ParentScreen correctly', () => {
  const tree = renderer.create(<ParentScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders RewardsScreen correctly', () => {
  const tree = renderer.create(<RewardsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
