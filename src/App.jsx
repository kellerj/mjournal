import React, { Component } from 'react';
import Markdown from 'markdown-to-jsx';

// import logo from './logo.svg';
import './App.css';

const { ipcRenderer } = window.require('electron');
const LOG = require('debug')('mjournal:renderer:App');

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

  render() {
    return (
      <div className="App">
        <Markdown>{this.state.loadedFile}</Markdown>
      </div>
    );
  }
}

export default App;
