const electron = require('electron');
const url = require('url');
const path = require('path');


const {app, BrowserWindow, ipcMain } = electron;
let mainWindow;
let loginWindow;
let profileWindow;

// Listen for app to be ready
app.on('ready', () => {
//    createMainWindow();
    createLoginWindow();
});
/*----------------------------------------
*              MAIN WINDOW
---------------------------------------*/
function createMainWindow(){
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../windows/mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    // mainWindow.setAutoHideMenuBar(true); //autohide
    mainWindow.setMenuBarVisibility(false);
}
/*----------------------------------------
*              LOGIN WINDOW
---------------------------------------*/
function createLoginWindow(){
    loginWindow = new BrowserWindow({});
    loginWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../windows/loginWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    loginWindow.setMenu(null);   //remove menu
    loginWindow.on('close', () => { loginWindow = null; });
}
/*----------------------------------------
*              PROFILE WINDOW
---------------------------------------*/
function createProfileWindow( data ) {
    if(data==undefined || data==null) {
    profileWindow = new BrowserWindow({});
    profileWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../windows/profileWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    profileWindow.setMenuBarVisibility(false);   //remove menu
    profileWindow.on('close', () => { profileWindow = null; });
    }
}
// Listen for ipc activity
ipcMain.on('login:submit', ( e, item ) => {
    console.log('sent from login:submit - ' + item );
    if ( mainWindow == null ) {
        createMainWindow();
    }
     loginWindow.close();

});

ipcMain.on('profile:create', (e, item) => {
    console.log( 'sent from profile:create - ' + item);
    if(profileWindow==null) {
        createProfileWindow();
    }
});





