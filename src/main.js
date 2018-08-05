// Modules to control application life and create native browser window
// eslint-disable-next-line import/no-extraneous-dependencies
const { app, BrowserWindow, Menu } = require('electron');
const appMenu = require('./appMenu');
// const os = require('os');
// eslint-disable-next-line import/no-extraneous-dependencies
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

const LOG = require('debug')('mjournal:renderer:main');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    titleBarStyle: 'hidden',
  });
  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000');

  const template = appMenu(mainWindow);
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // Open the DevTools.
  // BrowserWindow.addDevToolsExtension(`${os.homedir()}/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.2.4_0`);
  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => LOG(`Added Extension:  ${name}`))
    .catch(err => LOG('An error occurred installing react developer tools: ', err));
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
