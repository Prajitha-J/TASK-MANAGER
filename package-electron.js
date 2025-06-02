
const packager = require('electron-packager');
const path = require('path');

const options = {
  dir: './',
  name: 'TaskManager',
  platform: process.platform === 'win32' ? 'win32' : process.platform === 'darwin' ? 'darwin' : 'linux',
  arch: 'x64',
  electronVersion: '27.1.0',
  out: './desktop-build',
  overwrite: true,
  asar: true,
  icon: path.join(__dirname, 'public', 'favicon.ico'),
  ignore: [
    /node_modules/,
    /src\/(?!electron)/,
    /\.git/,
  ],
  prune: true,
  appVersion: '1.0.0',
  appCopyright: '© 2025 Task Manager',
  win32metadata: {
    CompanyName: 'Task Manager',
    FileDescription: 'Task Management Application',
    OriginalFilename: 'TaskManager.exe',
    ProductName: 'Task Manager',
  },
  // Add main file path specifically
  electronMain: './electron-launcher.js'
};

packager(options)
  .then(appPaths => {
    console.log('App packaged successfully!');
    console.log('Output path(s):', appPaths);
  })
  .catch(err => {
    console.error('Error packaging the app:', err);
  });
