import React, { Component } from 'react';
import { ListGroup, Nav, NavItem, NavLink } from 'reactstrap';

import AppContext from './AppContext.jsx';
import FileLink from './components/FileLink.jsx';

/* eslint-disable react/require-optimization */
export default class MarkdownPanel extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {(context) => {
          const { fileList, activeFileInfo } = context.state;
          return (
            <React.Fragment>
              <Nav tabs>
                <NavItem><NavLink href="#">Work Log</NavLink></NavItem>
                <NavItem><NavLink href="#">Weekly Summary</NavLink></NavItem>
                <NavItem><NavLink href="#">Project Audits</NavLink></NavItem>
              </Nav>
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
