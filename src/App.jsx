// import fs from 'fs';
// import path from 'path';

import React, { Component } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/markdown';
import 'brace/theme/dracula';

import { Header, Split, CodeWindow, LoadingMessage } from './StructuralComponents.jsx';
import AppContext from './AppContext.jsx';
import MarkdownDisplay from './MarkdownDisplay.jsx';
import './App.css';

let ipcRenderer = null;
let settings = null;
if (window && window.require) {
  ({ ipcRenderer } = window.require('electron'));
  settings = window.require('electron-settings');
} else {
  // eslint-disable-next-line global-require
  ({ ipcRenderer } = require('electron'));
  // eslint-disable-next-line global-require
  settings = require('electron-settings');
}
const fs = window.require('fs');
const path = window.require('path');
const LOG = require('debug')('mjournal:renderer:App');

const UPDATE_DELAY_MILLIS = 500;

/* eslint-disable react/require-optimization, react/no-multi-comp */

// class AppProvider extends Component {
//   constructor(initialState) {
//     super(initialState);
//     this.state = initialState;
//   }
//   // /* eslint-disable react/no-unused-state */
//   // state = {
//   //   loadedFile: '',
//   //   directory: settings.get('directory') || null,
//   //   filesData: [],
//   // }
//   // /* eslint-enable react/no-unused-state */
//   setState = (newState) => {
//     this.setState(newState);
//   }
//
//   render() {
//     return (
//       <AppContext.Provider value={this.state}>
//         {this.props.children}
//       </AppContext.Provider>
//     );
//   }
// }

class App extends Component {
  constructor() {
    super();

    ipcRenderer.on('new-file', (event, fileContent) => {
      LOG(fileContent);
      this.setState({
        loadedFile: fileContent,
      });
    });
    ipcRenderer.on('new-dir', (event, directory) => {
      LOG(`Received Directory: ${directory}`);
      this.setState({
        directory,
      });
      settings.set('directory', directory);
      this.loadAndReadFiles(directory);
    });
  }

  state = {
    loadedFile: '',
    directory: settings.get('directory') || null,
    filesData: [],
  };

  nextRenderTimeMillis = 0;
  finalRefreshHandle = null;

  onEditorChange = (newContent) => {
    // if we have an unfired callback scheduled already, clear it
    if (this.finalRefreshHandle) {
      window.clearTimeout(this.finalRefreshHandle);
      this.finalRefreshHandle = null;
    }
    // check if it's time to re-render
    const currMillis = new Date().getTime();
    if (currMillis >= this.nextRenderTimeMillis) {
      // yes, update the state, which will cause a re-render
      this.setState({
        loadedFile: newContent,
      });
      // set the min time for the next re-render
      this.nextRenderTimeMillis = currMillis + UPDATE_DELAY_MILLIS;
    } else {
      // not time yet? - schedule one for a half-second from now
      this.finalRefreshHandle =
        window.setTimeout(() => this.onEditorChange(newContent), UPDATE_DELAY_MILLIS);
    }
  }

  loadAndReadFiles = (directory) => {
    fs.readdir(directory, (err, files) => {
      const markdownFiles = files.filter(e => (e.endsWith('.md')));
      const filesData = markdownFiles.map(file => ({
        path: path.join(directory, file),
      }));
      LOG(filesData);
      this.setState({
        filesData,
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Header>Journal: {this.state.directory}</Header>
        <AppContext.Provider value={this.state}>
          {this.state.directory ? (
            <Split>
              <div>
                {this.state.filesData.map(file => <h3>{file.path}</h3>)}
              </div>
              <CodeWindow>
                <AceEditor
                  mode="markdown" name="markdown_editor"
                  onChange={this.onEditorChange}
                  theme="dracula"
                  value={this.state.loadedFile}
                />
              </CodeWindow>
              <MarkdownDisplay />
            </Split>) : (
              <LoadingMessage>Use Cmd-Shift-O to open directory.</LoadingMessage>
            )}
        </AppContext.Provider>
      </div>
    );
  }
}

export default App;
