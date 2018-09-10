import React, { Component } from 'react';
import { ListGroup, Button } from 'reactstrap';

import AppContext from './AppContext.jsx';
import FileLink from './components/FileLink.jsx';
import { FilesWindow } from './StructuralComponents.jsx';

/* eslint-disable react/require-optimization */
export default class MarkdownPanel extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {(context) => {
          const { filesData, activeFileInfo } = context.state;
          return (
            <FilesWindow>
              <ListGroup>
                {filesData.map(file => (
                  <FileLink
                    active={activeFileInfo && file.name === activeFileInfo.name}
                    fileInfo={file} key={file.name}
                    onClick={context.changeFile}
                  />
                ))}
              </ListGroup>
            </FilesWindow>);
        }}
      </AppContext.Consumer>
    );
  }
}
