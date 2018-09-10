import React, { Component } from 'react';

import { Container, Row, Col } from 'reactstrap';

import { AppWrap, Header, LoadingMessage } from './StructuralComponents.jsx';
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
      <AppWrap className="App">
        <AppProvider>
          <AppContext.Consumer>
            {context => (
              <React.Fragment>
                <Header>Journal: {context.state.directory}</Header>
                {context.state.directory ? (
                  <Container fluid style={{ padding: 0 }}>
                    <Row noGutters>
                      <Col xs="2">
                        <FileListPanel />
                      </Col>
                      <Col xs="5">
                        <EditorPanel />
                      </Col>
                      <Col xs="5">
                        <MarkdownPanel />
                      </Col>
                    </Row>
                  </Container>
                ) : (
                  <LoadingMessage>Use Cmd-Shift-O to open directory.</LoadingMessage>
                  )}
              </React.Fragment>
            )}
          </AppContext.Consumer>
        </AppProvider>
      </AppWrap>
    );
  }
}
