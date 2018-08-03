import React, { Component } from 'react';
import Markdown from 'markdown-to-jsx';
import AceEditor from 'react-ace';
import styled from 'styled-components';

// import brace from 'brace';
import 'brace/mode/markdown';
import 'brace/theme/dracula';

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

const Split = styled.div`
  display: flex;
  height: 100vh;
`;

const RenderedWindow = styled.div`
  background-color: #191324;
  width: 35%;
  padding: 20px;
  color: white;
  border-left: 1px solid #302b3a;
  h1, h2, h3, h4, h5, h6 {
    color: #82d8d8;
  }
  h1 {
    border-bottom: solid 3px red;
    padding-bottom: 10px;
  }
  a {
    color: red;
  }
`;

const CodeWindow = styled.div`
  flex: 1;
  padding-top: 2rem;
  background-color: #191324;
`;

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
      this.finalRefreshHandle = window.setTimeout(() => this.onEditorChange(newContent), UPDATE_DELAY_MILLIS);
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
