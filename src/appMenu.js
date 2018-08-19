// eslint-disable-next-line import/no-extraneous-dependencies
const { app } = require('electron');
// eslint-disable-next-line import/no-extraneous-dependencies
const electron = require('electron');
const menuActions = require('./menuActions');

function buildMenu(mainWindow) {
  menuActions.setMainWindow(mainWindow);
  const template = [];
  if (process.platform === 'darwin') {
    template.push({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    });
  }
  template.push({
    label: 'File',
    submenu: [
      {
        label: 'Open Folder...',
        accelerator: 'CmdOrCtrl+Shift+O',
        click: menuActions.openDir,
      },
      {
        label: 'Open File...',
        accelerator: 'CmdOrCtrl+O',
        click: menuActions.openFile,
      },
    ],
  });
  template.push({
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' },
    ],
  });
  if (process.platform === 'darwin') {
    // Edit menu
    template[template.length - 1].submenu.push(
      { type: 'separator' },
      {
        label: 'Speech',
        submenu: [
          { role: 'startspeaking' },
          { role: 'stopspeaking' },
        ],
      },
    );
  }
  template.push({
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' },
    ],
  });
  template.push({
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' },
    ],
  });
  // Window menu
  if (process.platform === 'darwin') {
    template.push({
      role: 'window',
      submenu: [
        { role: 'close' },
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' },
      ],
    });
  } else {
    template.push({
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' },
      ],
    });
  }
  template.push({
    role: 'help',
    submenu: [
      {
        label: 'Learn More About Electron',
        click() { electron.shell.openExternal('https://electronjs.org'); },
      },
    ],
  });
  template.push({
    label: 'Developer',
    submenu: [
      {
        label: 'Toggle Developer Tools',
        click() {
          mainWindow.webContents.toggleDevTools();
        },
        accelerator: 'Cmd+Option+I',
      },
    ],
  });

  return template;
}

module.exports = buildMenu;
