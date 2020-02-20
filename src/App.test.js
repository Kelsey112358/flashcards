import { shallow } from 'enzyme';
import React from 'react';
import App from './App';

jest.mock('./utils', () => ({
  ...jest.requireActual('./utils'),
  getUniqueSet: jest.fn(() => [0, 6, 7]),
}));

describe('App test suite', () => {
  it('render buttons correctly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('button')).toHaveLength(3);
  });
  it('disable button correctly', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ disableWords: [0] });
    expect(
      wrapper
        .find('button')
        .at(0)
        .prop('disabled')
    ).toBe(true);
  });
  it('click wrong button increase incorrectAnswerCount', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ correctAnswerIndex: 0 });
    wrapper
      .find('button')
      .at(1)
      .simulate('click');
    expect(wrapper.state('incorrectAnswerCount')).toEqual(1);
  });
  it('click right button increase correctAnswerCount', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ correctAnswerIndex: 0 });
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(wrapper.state('correctAnswerCount')).toEqual(1);
  });
  it('Count display right value', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ incorrectAnswerCount: 1, correctAnswerCount: 2 });
    expect(wrapper.find('.count').text()).toEqual('Count: 2');
  });
});
