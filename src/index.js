var fetch = require('node-fetch');
const { app, BrowserWindow, Menu, Tray, ipcMain, MenuItem, dialog } = require('electron')
const sgMail = require('@sendgrid/mail');
const fs = require("fs")
var path = require('path');
const os = require('os')
var settings = require('electron-settings')
var editJsonFile = require("edit-json-file");
const { FILE } = require('dns');
var https = require('https');
const AutoLaunchLinux = require('auto-launch/dist/AutoLaunchLinux');

let tray = null
var filePath = path.join(__dirname, './settings.json');
notificationsEnabled = true

var settings = {}
const createWindow = () => {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        preload: path.join(__dirname, 'preload.js'),
        icon: path.join(__dirname, '\\assets\\appicon.ico')
        },
        
    })
        var file = editJsonFile(filePath)
        win.webContents.send('settingsInfo', file.toObject())
        console.log(file.toObject())
    
    // and load the index.html of the app.
    win.loadFile('src/index.html')
    }
app.setLoginItemSettings({
    openAtLogin: true,
    path: app.getPath('exe'),
    openAsHidden: true,
})
app.whenReady().then(() => {
    createWindow()
    firstLaunch()
    sendSignInAlert()
    ipcMain.on('setEmail', (event, arg) => {
        console.log(arg);
    })
    
    
    tray = new Tray(path.join(__dirname, '\\assets\\trayicon.jpg'))
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Show App', click: () => {
            createWindow()
        }},
        { label: 'Quit', click: () => {
            app.quit()
        }},
        { label: 'Notifications Enabled', type: "checkbox", click: (menuItem) => {
            console.log('pause notifications')
            var file = editJsonFile(filePath)
            console.log(file)
            file.set("notifications", menuItem.checked)
            console.log("notifications set to " + menuItem.checked)
            file.save()
            }},
        { label: 'Test Notification', click: () => {
            console.log('test notification')
            sendSignInAlert()
        }}
    ])
    tray.setToolTip('Get notified when someone signs into your PC.')
    tray.setContextMenu(contextMenu)
})

async function sendSignInAlert() {

    
    
    file = editJsonFile(filePath)
    var notificationsEnabled = file.get("notifications")
    var email = file.get("email")
    var deviceName = file.get("deviceName")
    var emailHTML = "dfdadsf"
    const id = 'd02d933a-4232-4812-a857-3b1d20a8aba5'
    const requestOptions = {
        headers: {
            'Authorization': `Bearer ${file.get("key")}`,
        }
    }
    const response = await fetch(`https://api.sendgrid.com/v3/designs/d02d933a-4232-4812-a857-3b1d20a8aba5`, requestOptions)
    const data = await response.json()
    sgMail.setApiKey(file.get("key"));
    if (notificationsEnabled) {

        setTimeout(() => {
            const msg = {
                to: email,
                from: 'SafeSign@paytondev.me',
                subject: 'We detected a sign in on your device',
                html: data.html_content.toString().replace("{{ insert device_name 'default=(device unknown)' }}", deviceName).replace("{{ insert signin-date 'default=(date unknown)' }}", new Date().toLocaleString()),
            }
            console.log(msg);
            sgMail
          .send(msg)
          .then(() => {}, error => {
            console.error(error);
        
            if (error.response) {
              console.error(error.response.body)
            }
          });
        }, 5000)
        
    }
    
}

function firstLaunch() {
    
        //set path variable to settings.json file located in documents folder
        
        

        try {
            if (fs.existsSync(filePath)) {
                //file exists! do nothing
                console.log("settings.json file exists");

            } else {
                //create file
                console.log("settings.json file does not exist");
                const defaultSettings = {
                    "email": "",
                    "deviceName": "",
                    "notifications": true,
                    "key": "",
                }

                const data = JSON.stringify(defaultSettings);
                fs.writeFileSync(filePath, data, (err) => {
                    if (err) throw err;
                })
                console.log("created file settings.json");

            }
        } catch(err) {

        }
        
    }
ipcMain.on("setEmail", (event, arg) => {
    var file = editJsonFile(filePath)
    console.log(file)
    file.set("email", arg.email)
    file.save()
})
ipcMain.on("setName", (event, arg) => {
    var file = editJsonFile(filePath)
    console.log(file)
    file.set("deviceName", arg.name)
    file.save()
})
ipcMain.on("validateSGKey", (event, arg) => {
    console.log("validate key")
    var file = editJsonFile(filePath)
    console.log(arg)
    file.set("key", arg.key)
    file.save()
})
