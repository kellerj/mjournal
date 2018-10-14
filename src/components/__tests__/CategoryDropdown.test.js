/* eslint-env node, jest, browser */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { shallow, mount, render } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

import CategoryDropdown from '../CategoryDropdown.jsx';

// Enzyme.configure({ adapter: new Adapter() });

describe('CategoryDropdown', () => {
  const categoryList = [
    {
      name: 'Category 1',
      fullPath: '/tmp/Category_1',
      dirName: 'Category_1',
    },
    {
      name: 'Category 2',
      fullPath: '/tmp/Category_2',
      dirName: 'Category_2',
    },
  ];
  const onSelect = () => {};
  const wrapper = mount(<CategoryDropdown
    categoryList={categoryList}
    currentCategory={categoryList[0]}
    onSelect={onSelect}
                        />);

  it('renders', () => {
    expect(wrapper).toExist();
  });
  it('generates a dropdown element', () => {
    expect(wrapper).toContainExactlyOneMatchingElement('Dropdown');
  });

  it('renders the current category name in the toggle', () => {
    expect(wrapper.find('DropdownToggle')).toExist();
    expect(wrapper.find('DropdownToggle')).toIncludeText(categoryList[0].name);
  });


  it('generates a dropdown item for each category', () => {
    expect(wrapper).toContainMatchingElements(categoryList.length, 'DropdownItem');
    const items = wrapper.find('DropdownItem');
    expect(items.get(0).props.children).toEqual(categoryList[0].name);
    expect(items.get(1).props.children).toEqual(categoryList[1].name);
  });

  xit('toggles the dropdown state when clicked', () => {

  });

  xit('calls the onSelect handler when an item is clicked', () => {

  });
});
