import React, { Component } from 'react';
import AceEditor from 'react-ace';

import AppContext from './AppContext.jsx';
import { CodeWindow } from './StructuralComponents.jsx';

// const AppContext = React.createContext('mjournal');

/* eslint-disable react/require-optimization */

export default class MarkdownPanel extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <CodeWindow>
            {<AceEditor
              mode="markdown" name="markdown_editor"
              // eslint-disable-next-line  react/jsx-no-bind
              onChange={this.onEditorChange.bind(this, context)}
              theme="dracula"
              value={context.state.activeFileContent}
             />}
          </CodeWindow>
        )}
      </AppContext.Consumer>
    );
  }
}
