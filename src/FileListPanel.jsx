import React, { Component } from 'react';
import { ListGroup, Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import AppContext from './AppContext.jsx';
import FileLink from './components/FileLink.jsx';

// constructor(props) {
//   super(props);
//
//   this.toggle = this.toggle.bind(this);
//   this.state = {
//     dropdownOpen: false
//   };
// }
//
// toggle() {
//   this.setState({
//     dropdownOpen: !this.state.dropdownOpen
//   });
// }
// <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
//

/* eslint-disable react/require-optimization */
export default class FileListPanel extends Component {
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
                    isOpen={false} nav
                    toggle={() => {}}
                  >
                    <DropdownToggle caret nav>
                      Category: {currentCategory.name}
                    </DropdownToggle>
                    <DropdownMenu>
                      {categoryList.map(cat => (
                        <DropdownItem key={cat.dirName}>{cat.name}</DropdownItem>
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
