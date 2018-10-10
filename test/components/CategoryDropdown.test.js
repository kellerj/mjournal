/* eslint-env node, jest, browser */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import CategoryDropdown from '../../src/components/CategoryDropdown.jsx';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('CategoryDropdown', () => {
  it('renders', () => {
    const wrapper = shallow(<CategoryDropdown />);

    expect(wrapper.exists()).toBe(true);
  });
});
