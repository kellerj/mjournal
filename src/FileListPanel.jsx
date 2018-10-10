import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Nav } from 'reactstrap';

import AppContext from './AppContext.jsx';
import FileLink from './components/FileLink.jsx';
import CategoryDropdown from './components/CategoryDropdown.jsx';

const LOG = require('debug')('mjournal:renderer:FileListPanel');

/* eslint-disable react/require-optimization */
export default class FileListPanel extends Component {
  static propTypes = {
    onCategoryChange: PropTypes.func.isRequired,
  }

  categorySelected = category => () => {
    LOG('categorySelected(%o)', category);
    this.props.onCategoryChange(category);
  }

  render() {
    return (
      <AppContext.Consumer>
        {(context) => {
          const {
            fileList, activeFileInfo, categoryList, currentCategory,
          } = context.state;
          return (
            <React.Fragment>
              {categoryList.length && currentCategory ? (
                <Nav pills>
                  <CategoryDropdown
                    categoryList={categoryList} currentCategory={currentCategory}
                    onSelect={this.props.onCategoryChange}
                  />
                </Nav>) : ''}
              <ListGroup flush>
                {fileList.map(file => (
                  <FileLink
                    active={activeFileInfo ? file.name === activeFileInfo.name : false}
                    fileInfo={file} key={file.name}
                    onClick={context.changeFile}
                  />
                ))}
              </ListGroup>
            </React.Fragment>
          );
        }}
      </AppContext.Consumer>
    );
  }
}
