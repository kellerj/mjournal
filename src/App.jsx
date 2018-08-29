// import fs from 'fs';
// import path from 'path';

import React, { Component } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/markdown';
import 'brace/theme/dracula';

import { AppWrap, Header, FilesWindow, Split, CodeWindow, LoadingMessage } from './StructuralComponents.jsx';
import AppContext from './AppContext.jsx';
import MarkdownDisplay from './MarkdownDisplay.jsx';
import FileLink from './components/FileLink.jsx';

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

    const directory = settings.get('directory');
    if (directory && fs.existsSync(directory)) {
      this.loadAndReadFiles(directory);
    }

    ipcRenderer.on('new-file', (event, fileContent) => {
      LOG(fileContent);
      this.setState({
        loadedFile: fileContent,
      });
    });

    ipcRenderer.on('new-dir', (event, newDir) => {
      LOG(`Received Directory: ${newDir}`);
      this.setState({
        directory: newDir,
      });
      settings.set('directory', newDir);
      this.loadAndReadFiles(newDir);
    });
  }

  state = {
    loadedFile: '',
    directory: settings.get('directory') || null,
    // activeIndex: 0,
    activeFileInfo: null,
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
      const markdownFiles = files.filter(e => (e.endsWith('.md'))).sort().reverse();
      const filesData = markdownFiles.map(file => ({
        path: path.join(directory, file),
        name: file.substr(0, file.length - 3),
      }));
      LOG(filesData);
      this.setState({
        filesData,
      }, () => this.loadFileByIndex(0));
    });
  }

  loadFileByIndex = (index) => {
    const { filesData } = this.state;
    const content = fs.readFileSync(filesData[index].path, 'utf8');

    this.setState({
      loadedFile: content,
      // activeIndex: index,
      activeFileInfo: filesData[index],
    });
  }

  loadFile = (fileInfo) => {
    // const { filesData } = this.state;
    const content = fs.readFileSync(fileInfo.path, 'utf8');

    this.setState({
      loadedFile: content,
      activeFileInfo: fileInfo,
      // activeIndex: filesData.indexOf(fileInfo),
    });
  }

  saveFile = () => {
    const { loadedFile, activeFileInfo } = this.state;
    fs.writeFile(activeFileInfo.path, loadedFile, 'utf8', (err) => {
      if (err) {
        console.log(err);
      } else {
        LOG('saved');
      }
    });
  }

  changeFile = (fileInfo) => {
    const { activeFileInfo } = this.state;
    if (fileInfo.name !== activeFileInfo.name) {
      this.saveFile();
      this.loadFile(fileInfo);
    }
  }

  render() {
    return (
      <AppWrap className="App">
        <Header>Journal: {this.state.directory}</Header>
        <AppContext.Provider value={this.state}>
          {this.state.directory ? (
            <Split>
              <FilesWindow>
                {this.state.filesData.map(file => (
                  <FileLink
                    fileInfo={file} key={file.name}
                    onClick={this.changeFile}
                  />
                ))}
              </FilesWindow>
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
      </AppWrap>
    );
  }
}

export default App;
