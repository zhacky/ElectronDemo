const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, ipcMain } = electron;
let mainWindow;
let loginWindow;
let profileWindow;
let settingsWindow;

// Listen for app to be ready
app.on('ready', () => {
   createMainWindow();
   // createLoginWindow();
});
/*----------------------------------------*
 *              MAIN WINDOW               *
 *----------------------------------------*/
function createMainWindow(){
    mainWindow = new BrowserWindow({width: 1280, height: 1024});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../windows/mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.setMenuBarVisibility(false);
    mainWindow.on('close',() => { mainWindow = null; });
}
/*----------------------------------------*
 *              LOGIN WINDOW              *
 *----------------------------------------*/
function createLoginWindow(){
    loginWindow = new BrowserWindow({});
    loginWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../windows/loginWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    loginWindow.setMenuBarVisibility(false);  //remove menu
    loginWindow.on('close', () => { loginWindow = null; });
}
/*----------------------------------------*
 *              PROFILE WINDOW            *
 *----------------------------------------*/
function createProfileWindow() {
    profileWindow = new BrowserWindow({width: 1280, height: 1024});
    profileWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../windows/profileWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    profileWindow.setMenuBarVisibility(false);   //remove menu
    profileWindow.on('close', () => { profileWindow = null; createMainWindow(); });
}
/*----------------------------------------*
 *              SETTINGS WINDOW           *
 *----------------------------------------*/
 function createSettingsWindow(){
    settingsWindow = new BrowserWindow({width:1280, height: 1024 });
    settingsWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../windows/settingsWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    settingsWindow.setMenuBarVisibility(false); //remove menu
    settingsWindow.on('close', () => {
    settingsWindow = null; createMainWindow(); });
 }
/*----------------------------------------*
 *              IPC ACIVITIES             *
 *----------------------------------------*/
ipcMain.on('login:submit', ( e, item ) => {
        createMainWindow();
     loginWindow.close();
});

ipcMain.on('profile:create', (e, item) => {
        createProfileWindow();
        mainWindow.close();
});
// click edit from each row
ipcMain.on('profile:edit', (e, item) => {
        createProfileWindow();
        console.log('send item data from main to profile: ' + item);
        profileWindow.webContents.on('did-finish-load',() => {
            profileWindow.webContents.send('profile-selected',item);
        });
        mainWindow.close();
});
// settings
ipcMain.on('settings:open', (e,item) => {
        createSettingsWindow();
        mainWindow.close();
 });
ipcMain.on('profile:close',(e,item) => {
        profileWindow.close();
 });
// console log
ipcMain.on('console:log', (e,item) => {
    console.log('Log: ' + e);
 });
