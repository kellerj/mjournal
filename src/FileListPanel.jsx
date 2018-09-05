import React, { Component } from 'react';

import AppContext from './AppContext.jsx';
import FileLink from './components/FileLink.jsx';
import { FilesWindow } from './StructuralComponents.jsx';

// const AppContext = React.createContext('mjournal');

/* eslint-disable react/require-optimization */

export default class MarkdownPanel extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <FilesWindow>
            {context.state.filesData.map(file => (
              <FileLink
                fileInfo={file} key={file.name}
                onClick={context.changeFile}
              />
            ))}
          </FilesWindow>
        )}
      </AppContext.Consumer>
    );
  }
}
