import React, { Component } from 'react';
import PropTypes from 'prop-types';

const AppContext = React.createContext();

const settings = window.require('electron-settings');

export default AppContext;

/* eslint-disable react/require-optimization */

export class AppProvider extends Component {
  // constructor(initialState) {
  //   super(initialState);
  //   this.state = initialState;
  // }
  /* eslint-disable react/no-unused-state */
  propTypes = {
    children: PropTypes.node,
  }

  state = {
    loadedFile: '',
    directory: settings.get('directory') || null,
    // activeIndex: 0,
    activeFileInfo: null,
    filesData: [],
  };

  setActiveFileContent = (fileContent, cb) => {
    this.setState({ activeFileContent: fileContent }, cb);
  }

  setActiveFile = (fileInfo, fileContent, cb) => {
    this.setState({ activeFileInfo: fileInfo, activeFileContent: fileContent }, cb);
  }

  setDirectory = (newDir, cb) => {
    this.setState({
      directory: newDir,
    }, cb);
  }

  setFileList = (fileList, cb) => {
    this.setState({ fileList }, cb);
  }

  /* eslint-enable react/no-unused-state */
  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        setActiveFileContent: this.setActiveFileContent,
        setActiveFile: this.setActiveFile,
        setDirectory: this.setDirectory,
        setFileList: this.setFileList,
      }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
