import React, { Component } from 'react';
import Markdown from 'markdown-to-jsx';
import AceEditor from 'react-ace';
// import brace from 'brace';
import 'brace/mode/markdown';
import 'brace/theme/dracula';

import { Split, CodeWindow, RenderedWindow } from './StructuralComponents.jsx';
// import logo from './logo.svg';
import './App.css';

let ipcRenderer = null;
if (window && window.require) {
  ({ ipcRenderer } = window.require('electron'));
} else {
  // eslint-disable-next-line global-require
  ({ ipcRenderer } = require('electron'));
}
const LOG = require('debug')('mjournal:renderer:App');

const UPDATE_DELAY_MILLIS = 500;

class App extends Component {
  constructor() {
    super();

    ipcRenderer.on('new-file', (event, fileContent) => {
      LOG(fileContent);
      this.setState({
        loadedFile: fileContent,
      });
    });
  }

  state = {
    loadedFile: '',
  }

  nextRenderTimeMillis = 0;
  finalRefreshHandle = null;

  onEditorChange = (newContent) => {
    if (this.finalRefreshHandle) {
      window.clearTimeout(this.finalRefreshHandle);
      this.finalRefreshHandle = null;
    }
    const currMillis = new Date().getTime();
    if (currMillis >= this.nextRenderTimeMillis) {
      this.setState({
        loadedFile: newContent,
      });
      this.nextRenderTimeMillis = currMillis + UPDATE_DELAY_MILLIS;
    } else {
      this.finalRefreshHandle =
        window.setTimeout(() => this.onEditorChange(newContent), UPDATE_DELAY_MILLIS);
    }
  }

  render() {
    return (
      <div className="App">
        <Split>
          <CodeWindow>
            <AceEditor
              mode="markdown" name="markdown_editor"
              onChange={this.onEditorChange}
              theme="dracula"
              value={this.state.loadedFile}
            />
          </CodeWindow>
          <RenderedWindow>
            <Markdown>{this.state.loadedFile}</Markdown>
          </RenderedWindow>
        </Split>
      </div>
    );
  }
}

export default App;
