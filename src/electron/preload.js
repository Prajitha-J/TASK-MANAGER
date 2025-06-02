
const { contextBridge } = require('electron');

// Expose protected methods that allow the renderer process to use
// specific electron APIs without exposing the entire electron API
contextBridge.exposeInMainWorld(
  'electron', {
    // Add any required electron APIs here
    appVersion: process.env.npm_package_version,
    platform: process.platform,
    // Add more APIs as needed for your Task Manager app
    isElectron: true
  }
);
