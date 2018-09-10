import React, { Component } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/markdown';
import 'brace/theme/github';

import AppContext from './AppContext.jsx';
import { CodeWindow } from './StructuralComponents.jsx';

const LOG = require('debug')('mjournal:renderer:EditorPanel');

/* eslint-disable react/require-optimization */
export default class EditorPanel extends Component {
  // eslint-disable-next-line no-unused-vars
  onEditorChange = (context, newContent, event) => {
    LOG('Editor Changed: %O', event);
    // yes, update the state, which will cause a re-render
    context.setActiveFileContent(newContent);
  }

  // this.onEditorChange.bind(this, context)
  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <CodeWindow>
            <AceEditor
              debounceChangePeriod={500} mode="markdown"
              name="markdown_editor"
              // eslint-disable-next-line  react/jsx-no-bind
              onChange={this.onEditorChange.bind(this, context)}
              theme="github"
              value={context.state.activeFileContent}
            />
          </CodeWindow>
        )}
      </AppContext.Consumer>
    );
  }
}
