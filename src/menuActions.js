// eslint-disable-next-line import/no-extraneous-dependencies
const { dialog } = require('electron');
const fs = require('fs');
const LOG = require('debug')('mjournal:main:menuActions');

let mainWindow = null;

function setMainWindow(mainWin) {
  mainWindow = mainWin;
}

function openFile() {
  const files = dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [{
      name: 'Markdown',
      extensions: ['md'],
    }],
  });
  if (!files) {
    return;
  }
  LOG(`Returned File List: ${JSON.stringify(files)}`);
  const file = files[0];
  const fileContent = fs.readFileSync(file, 'utf8');

  LOG(fileContent);
  mainWindow.webContents.send('new-file', fileContent);
}

module.exports = {
  setMainWindow,
  openFile,
};
