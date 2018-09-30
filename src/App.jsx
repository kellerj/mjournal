import React, { Component } from 'react';

import { Container, Row, Col } from 'reactstrap';

import { LoadingMessage } from './StructuralComponents.jsx';
import AppContext, { AppProvider } from './AppContext.jsx';
import MarkdownPanel from './MarkdownPanel.jsx';
import FileListPanel from './FileListPanel.jsx';
import EditorPanel from './EditorPanel.jsx';

import './App.css';

// const LOG = require('debug')('mjournal:renderer:App');

/* eslint-disable react/require-optimization */
export default class App extends Component {
  render() {
    return (
      <AppProvider>
        <AppContext.Consumer>
          {context => (
            context.state.mainDirectory ? (
              <Container fluid style={{ padding: 0 }}>
                <Row noGutters>
                  <Col xs="3">
                    <FileListPanel onCategoryChange={context.setCurrentCategory} />
                  </Col>
                  <Col xs="auto">
                    <EditorPanel />
                  </Col>
                  <Col xs="3">
                    <MarkdownPanel />
                  </Col>
                </Row>
              </Container>
            ) : (
              <LoadingMessage>Use Cmd-Shift-O to open directory.</LoadingMessage>
            )
          )}
        </AppContext.Consumer>
      </AppProvider>
    );
  }
}
