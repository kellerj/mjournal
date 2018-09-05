import React, { Component } from 'react';
import Markdown from 'markdown-to-jsx';

import { RenderedWindow } from './StructuralComponents.jsx';
import AppContext from './AppContext.jsx';

// const AppContext = React.createContext('mjournal');

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
