import React, { Component } from 'react';
import Markdown from 'markdown-to-jsx';
import AceEditor from 'react-ace';

import 'brace/mode/markdown';
import 'brace/theme/dracula';

import { RenderedWindow } from './StructuralComponents.jsx';
import AppContext from './AppContext.jsx';

/* eslint-disable react/require-optimization */
export default class MarkdownPanel extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <RenderedWindow>
            <Markdown>{context.state.activeFileContent}</Markdown>
          </RenderedWindow>
        )}
      </AppContext.Consumer>
    );
  }
}
