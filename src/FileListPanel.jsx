import React, { Component } from 'react';
import { ListGroup } from 'reactstrap';

import AppContext from './AppContext.jsx';
import FileLink from './components/FileLink.jsx';

/* eslint-disable react/require-optimization */
export default class MarkdownPanel extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {(context) => {
          const { filesData, activeFileInfo } = context.state;
          return (
            <ListGroup flush>
              {filesData.map(file => (
                <FileLink
                  active={activeFileInfo ? file.name === activeFileInfo.name : false}
                  fileInfo={file} key={file.name}
                  onClick={context.changeFile}
                />
              ))}
            </ListGroup>
          );
        }}
      </AppContext.Consumer>
    );
  }
}
