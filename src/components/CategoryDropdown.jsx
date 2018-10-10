import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const LOG = require('debug')('mjournal:renderer:CategoryDropdown');

class CategoryDropdown extends Component {
  static propTypes = {
    categoryList: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      dirName: PropTypes.string.isRequired,
    })).isRequired,
    currentCategory: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    onSelect: PropTypes.func.isRequired,
  }

  state = {
    dropdownOpen: false,
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  categorySelected = category => () => {
    LOG('categorySelected(%o)', category);
    this.props.onSelect(category);
  }

  render() {
    const { categoryList, currentCategory } = this.props;
    return (
      <Dropdown
        isOpen={this.state.dropdownOpen}
        nav
        toggle={this.toggle}
      >
        <DropdownToggle caret nav>
          Category: {currentCategory.name}
        </DropdownToggle>
        <DropdownMenu>
          {categoryList.map(cat => (
            <DropdownItem
              key={cat.dirName}
              onClick={this.categorySelected(cat.dirName)}
            >{cat.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default CategoryDropdown;
