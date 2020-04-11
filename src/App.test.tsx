import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

describe('App', () => {
  it('App should render', () => {
    const component = renderer.create(<App />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
