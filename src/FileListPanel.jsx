import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Nav, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import AppContext from './AppContext.jsx';
import FileLink from './components/FileLink.jsx';

const LOG = require('debug')('mjournal:renderer:FileListPanel');

/* eslint-disable react/require-optimization */
export default class FileListPanel extends Component {
  static propTypes = {
    onCategoryChange: PropTypes.func.isRequired,
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
    this.props.onCategoryChange(category);
  }

  render() {
    return (
      <AppContext.Consumer>
        {(context) => {
          const {
            fileList, activeFileInfo, categoryList, currentCategory,
          } = context.state;
          return (
            <React.Fragment>
              {categoryList.length && currentCategory ? (
                <Nav pills>
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
                </Nav>) : ''}
              <ListGroup flush>
                {fileList.map(file => (
                  <FileLink
                    active={activeFileInfo ? file.name === activeFileInfo.name : false}
                    fileInfo={file} key={file.name}
                    onClick={context.changeFile}
                  />
                ))}
              </ListGroup>
            </React.Fragment>
          );
        }}
      </AppContext.Consumer>
    );
  }
}
