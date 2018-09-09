import React, { Component } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/markdown';
import 'brace/theme/dracula';

import AppContext from './AppContext.jsx';
import { CodeWindow } from './StructuralComponents.jsx';

const LOG = require('debug')('mjournal:renderer:EditorPanel');

const UPDATE_DELAY_MILLIS = 500;

/* eslint-disable react/require-optimization */
export default class EditorPanel extends Component {
  nextRenderTimeMillis = 0;
  finalRefreshHandle = null;

  // eslint-disable-next-line no-unused-vars
  onEditorChange = (context, newContent, event) => {
    // if we have an unfired callback scheduled already, clear it
    if (this.finalRefreshHandle) {
      window.clearTimeout(this.finalRefreshHandle);
      this.finalRefreshHandle = null;
    }
    // check if it's time to re-render
    const currMillis = new Date().getTime();
    if (currMillis >= this.nextRenderTimeMillis) {
      LOG('Editor Changed: %O', event);
      // yes, update the state, which will cause a re-render
      context.setActiveFileContent(newContent);
      // set the min time for the next re-render
      this.nextRenderTimeMillis = currMillis + UPDATE_DELAY_MILLIS;
    } else {
      // not time yet? - schedule one for a half-second from now
      this.finalRefreshHandle =
        window.setTimeout(() =>
          this.onEditorChange(context, newContent, event), UPDATE_DELAY_MILLIS);
    }
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
              onChange={this.onEditorChange.bind(this, context)}
              theme="dracula"
              value={context.state.activeFileContent}
            />
          </CodeWindow>
        )}
      </AppContext.Consumer>
    );
  }
}
