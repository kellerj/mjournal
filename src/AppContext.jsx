import React, { Component } from 'react';
import PropTypes from 'prop-types';

if (window && window.require) {
  require = window.require;
}

const util = require('util');
const fs = require('fs');
const path = require('path');
const LOG = require('debug')('mjournal:renderer:AppContext');

const readDirAsync = util.promisify(fs.readdir);

const AppContext = React.createContext();

let ipcRenderer = null;
let settings = null;
if (window && window.require) {
  ({ ipcRenderer } = window.require('electron'));
  settings = window.require('electron-settings');
} else {
  // eslint-disable-next-line global-require
  ({ ipcRenderer } = require('electron'));
  // eslint-disable-next-line global-require
  settings = require('electron-settings');
}

export default AppContext;

/* eslint-disable react/require-optimization */

export class AppProvider extends Component {
  /* eslint-disable react/no-unused-state */
  propTypes = {
    children: PropTypes.node,
  }

  constructor() {
    super();

    const directory = settings.get('directory');
    if (directory && fs.existsSync(directory)) {
      this.loadAndReadFiles(directory);
    }

    ipcRenderer.on('new-file', (event, fileContent) => {
      LOG(fileContent);
      this.setState({
        activeFileContent: fileContent,
      });
    });

    ipcRenderer.on('save-file', () => {
      LOG('Save File');
      this.saveFile();
    });

    ipcRenderer.on('new-dir', (event, newDir) => {
      LOG('Received Directory: %s', newDir);
      this.setState({
        directory: newDir,
      });
      settings.set('directory', newDir);
      this.loadAndReadFiles(newDir);
    });
  }

  state = {
    activeFileContent: '',
    directory: settings.get('directory') || null,
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

  loadAndReadFiles = async (directory) => {
    // read directories in the given directory
    const mainDirFiles = await readDirAsync(directory);
    LOG('Files in base directory: %o', mainDirFiles);
    mainDirFiles.filter((file) => {
      const fileInfo = fs.statSync(path.join(directory, file));
      LOG('%s: %o', file, fileInfo);
      return fileInfo.isDirectory();
    });
    // if no current dir set or does not exist, then select the first one and make it the current one

    // read given directory and set file list
    fs.readdir(directory, (err, files) => {
      const markdownFiles = files.filter(e => (e.endsWith('.md'))).sort().reverse();
      const filesData = markdownFiles.map(file => ({
        path: path.join(directory, file),
        name: file.substr(0, file.length - 3),
      }));
      LOG('Read Directory File List: %n%O', filesData);

      this.setState({
        filesData,
      }, () => this.loadFile(filesData[0]));
    });
  }

  loadFile = (fileInfo) => {
    LOG('Loading File %o', fileInfo);
    const content = fs.readFileSync(fileInfo.path, 'utf8');

    this.setState({
      activeFileContent: content,
      activeFileInfo: fileInfo,
    });
  }

  saveFile = () => {
    const { activeFileContent, activeFileInfo } = this.state;
    LOG('Saving current editor content to %o', activeFileInfo);
    fs.writeFile(activeFileInfo.path, activeFileContent, 'utf8', (err) => {
      if (err) {
        LOG(err);
      } else {
        LOG('saved editor to %s', activeFileInfo.path);
      }
    });
  }

  changeFile = (fileInfo) => {
    const { activeFileInfo } = this.state;
    LOG('Changing file to %o', fileInfo);
    if (fileInfo.name !== activeFileInfo.name) {
      this.saveFile();
      this.loadFile(fileInfo);
    }
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
        loadFile: this.loadFile,
        changeFile: this.changeFile,
      }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
