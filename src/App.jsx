import React, { Component } from 'react';

import 'brace/mode/markdown';
import 'brace/theme/dracula';

import { AppWrap, Header, Split, LoadingMessage } from './StructuralComponents.jsx';
import AppContext, { AppProvider } from './AppContext.jsx';
import MarkdownPanel from './MarkdownPanel.jsx';
import FileListPanel from './FileListPanel.jsx';
import EditorPanel from './EditorPanel.jsx';

import './App.css';

const LOG = require('debug')('mjournal:renderer:App');

const UPDATE_DELAY_MILLIS = 500;

/* eslint-disable react/require-optimization */
export default class App extends Component {
  nextRenderTimeMillis = 0;
  finalRefreshHandle = null;

  onEditorChange = (context, newContent) => {
    LOG('Editor Changed');
    // if we have an unfired callback scheduled already, clear it
    if (this.finalRefreshHandle) {
      window.clearTimeout(this.finalRefreshHandle);
      this.finalRefreshHandle = null;
    }
    // check if it's time to re-render
    const currMillis = new Date().getTime();
    if (currMillis >= this.nextRenderTimeMillis) {
    // yes, update the state, which will cause a re-render
      context.setActiveFileContent(newContent);
      // set the min time for the next re-render
      this.nextRenderTimeMillis = currMillis + UPDATE_DELAY_MILLIS;
    } else {
    //   // not time yet? - schedule one for a half-second from now
      this.finalRefreshHandle =
        window.setTimeout(() => this.onEditorChange(context, newContent), UPDATE_DELAY_MILLIS);
    }
  }

  render() {
    return (
      <AppWrap className="App">
        <AppProvider>
          <AppContext.Consumer>
            {context => (
              <React.Fragment>
                <Header>Journal: {context.state.directory}</Header>
                <Split>
                  {context.state.directory ? (
                    <Split>
                      <FileListPanel />
                      <EditorPanel />
                      <MarkdownPanel />
                    </Split>) : (
                      <LoadingMessage>Use Cmd-Shift-O to open directory.</LoadingMessage>
                    )}
                </Split>
              </React.Fragment>
            )}
          </AppContext.Consumer>
        </AppProvider>
      </AppWrap>
    );
  }
}
