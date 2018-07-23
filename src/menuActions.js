// eslint-disable-next-line import/no-extraneous-dependencies
const { dialog } = require('electron');
const fs = require('fs');

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
  console.log(`Returned File List: ${JSON.stringify(files)}`);
  const file = files[0];
  const fileContent = fs.readFileSync(file, 'utf8');

  console.log(fileContent);
}

module.exports = {
  setMainWindow,
  openFile,
};
