var { MSICreator } = require('electron-wix-msi');
var path = require('path');
const APP_DIR = path.resolve(__dirname, './SafeSign-win32-x64');
const OUT_DIR = path.resolve(__dirname, './installer');
const msiCreator = new MSICreator({
  appDirectory: APP_DIR,
  outputDirectory: OUT_DIR,
  exe: 'SafeSign.exe',
  description: 'Know when someone signs into your computer',
  name: 'SafeSign',
  manufacturer: 'paytondev',
  version: '1.0.0',
  ui: {
    chooseDirectory: true,
    installerLanguage: 'en-US',
    welcomeTitle: 'Welcome to SafeSign',

  }
})

msiCreator.create().then(function() {
  console.log('Installer created');
  console.log('Compiling installer... This may take a few moments :D')
  msiCreator.compile()
})