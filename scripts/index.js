const electron = require('electron');
const url = require('url');
const path = require('path');
const fs = require('fs');
const os = require('os');

const {app, BrowserWindow, ipcMain, shell, dialog } = electron;
// SET ENV
process.env.NODE_ENV = 'production';
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
let mainWindow;
let loginWindow;
let profileWindow;
let settingsWindow;
let previewWindow;
var fullscreen = false;

// Listen for app to be ready
app.on('ready', () => {
   createMainWindow();
   // createLoginWindow();
});
app.on('Window-all-closed',() => {
        app.quit();
 });
/*----------------------------------------*
 *              MAIN WINDOW               *
 *----------------------------------------*/
function createMainWindow(){
    mainWindow = new BrowserWindow({width: 1280, height: 1024, fullscreen: fullscreen, icon: path.join(__dirname,'../images/teeth-icon.png')});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../windows/mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.setMenuBarVisibility(false);
    mainWindow.on('close',() => {
        mainWindow = null;
        // let mainWindow;
        // let loginWindow;
        // let profileWindow;
        // let settingsWindow;
        // let previewWindow;
        if(mainWindow == null && loginWindow == null && profileWindow == null && settingsWindow == null && previewWindow == null ){
            app.quit();
        }
    });
}
/*----------------------------------------*
 *              LOGIN WINDOW              *
 *----------------------------------------*/
function createLoginWindow(){
    loginWindow = new BrowserWindow({fullscreen: fullscreen, icon: path.join(__dirname,'../images/teeth-icon.png')});
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
    profileWindow = new BrowserWindow({width: 1280, height: 1024, fullscreen: fullscreen, icon: path.join(__dirname,'../images/teeth-icon.png')});
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
    settingsWindow = new BrowserWindow({width:1280, height: 1024, icon: path.join(__dirname,'../images/teeth-icon.png') });
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
  *              PREVIEW WINDOW            *
  *----------------------------------------*/
   function createPreviewWindow(){
    previewWindow = new BrowserWindow({width:1280, height: 1024, icon: path.join(__dirname,'../images/teeth-icon.png') });
    previewWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../windows/previewWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    previewWindow.setMenuBarVisibility(false); //remove menu
    previewWindow.on('close', () => {
    previewWindow = null;  });
 }
/*----------------------------------------*
 *              IPC ACIVITIES             *
 *----------------------------------------*/
 /*----------  ON LOGIN --------------*/
ipcMain.on('login:submit', ( e, item ) => {
        createMainWindow();
     loginWindow.close();
});

/*----------  ON PROFILE --------------*/
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

ipcMain.on('profile:close',(e,item) => {
        profileWindow.close();
 });
// preview
ipcMain.on('profile:preview', (e,item) => {
    var profile = item;
    createPreviewWindow();
    previewWindow.webContents.on('did-finish-load',() => {
        previewWindow.webContents.send('profile-preview', profile);
     });
 });
// print
ipcMain.on('profile:print',(e,item) => {

    var timestamp = Date.now().toString();
    const pdfPath = path.join(os.tmpdir(), 'file-' + timestamp + '.pdf');
    const win = BrowserWindow.fromWebContents(e.sender);
    win.webContents.printToPDF({},(err, data) => {
        if(err) return console.log(err.message);

        fs.writeFile( pdfPath, data, function(error) {
            if(error) return console.log(error.message);
            shell.openExternal('file://' + pdfPath);
            e.sender.send('wrote-pdf', pdfPath );
        });
     });
    // profileWindow.print();
 });
/*----------  ON SETTINGS --------------*/
ipcMain.on('settings:open', (e,item) => {
        createSettingsWindow();
        mainWindow.close();
 });
ipcMain.on('settings:close',(e,item) => {
        settingsWindow.close();
 });
// console log
ipcMain.on('console:log', (e,item) => {
    console.log('Log: ' + e);
 });
/*----------  ON MAIN --------------*/

ipcMain.on('main:double-click',(e,item) => {
    fullscreen = !fullscreen;
    console.log('error:' + e + ' / fullscreen: ' + fullscreen);
    mainWindow.setFullScreen(fullscreen);
});
ipcMain.on('general:double-click',(e,item) => {
    fullscreen = !fullscreen;
    var win = BrowserWindow.fromWebContents(e.sender);
    console.log('win:' + win + ' / fullscreen: ' + fullscreen);
    win.setFullScreen(fullscreen);
 });
// confirm delete
ipcMain.on('main:confirm-delete', (e,item) => {
    var title = 'Confirm Profile Delete';
    var message = 'Are you sure you want to delete this profile?\r\nThis cannot be undone.';
    var result = dialog.showMessageBox({browserWindow: mainWindow, type: 'info', buttons: ['OK','Cancel'], title: title, message: message });
    const OK_BUTTON = 0;
    const CANCEL_BUTTON = 1;
        if(result === OK_BUTTON ) {
            e.sender.send('main:confirmed-delete', item);
        }
 });

ipcMain.on('settings:browse', (e,item) => {
var result = dialog.showOpenDialog({browserWindow: settingsWindow, filters: [{name: 'NE Database File',extensions: ['db'] }] });
    if(result) {
        var file = result[0];
        fs.access(file, fs.constants.R_OK, (err) => {  console.log(`${file} ${err ? 'is not readable' : 'is readable'}`); });
        e.sender.send('settings:selected-database', file);
    }
});








