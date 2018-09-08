import React, { Component } from 'react';
import AceEditor from 'react-ace';

import AppContext from './AppContext.jsx';
import { CodeWindow } from './StructuralComponents.jsx';

const LOG = require('debug')('mjournal:renderer:EditorPanel');

const UPDATE_DELAY_MILLIS = 500;

/* eslint-disable react/require-optimization */
export default class EditorPanel extends Component {
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

  testOnChange = (content) => {
    console.log(content);
  }
  // this.onEditorChange.bind(this, context)
  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <CodeWindow>
            <AceEditor
              mode="markdown" name="markdown_editor"
              // eslint-disable-next-line  react/jsx-no-bind
              onChange={this.testOnChange}
              theme="dracula"
              value={context.state.activeFileContent}
            />
          </CodeWindow>
        )}
      </AppContext.Consumer>
    );
  }
}
