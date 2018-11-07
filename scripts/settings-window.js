const isProduction = require('electron-is-running-in-asar');

const electron = require('electron');
const { ipcRenderer } = electron;
const fs = require('fs');
// load database
var Datastore = require('nedb');
var path = require('path');
var dbpath;

if(isProduction()) {
    /*----------          location on outside folder dentistapp-win32-ia32  --------------*/
        dbpath = path.join(__dirname,'../../../../db/user.db');
    } else {
        dbpath = path.join(__dirname,'../scripts/user_db');
    }
var db = new Datastore({filename: dbpath, autoload: true });
// add form listener
var form = document.querySelector('form');
form.addEventListener('submit', submitForm );
let adminuser;
let oldpw;
let userdata;


function loadSettings(){
    db.findOne({ _id: 'zOrqYsyunulq64Md' }, (err,doc) => {
        // console.log(doc);
        userdata = doc;
        adminuser = userdata['username'];
        // encrypted_pw = doc['password'];
        oldpw = userdata['password'];
        // pwBytes = CryptoJS.AES.decrypt(encrypted_pw, 'DentalApp');
        // oldpw = pwBytes.toString(CryptoJS.enc.Utf8);
        $('#username').val(adminuser);
    });
    // load profile db path
var profilepath = fs.readFileSync(path.join(__dirname,'../../inc.dat'),'utf8');
$("#database-path").val(profilepath);
}

$(document).ready(() => {
    loadSettings();
});
// submit callback
function submitForm(e){
    e.preventDefault();
    var newname = $('#username').val();
    var old = $('#old-password').val();
    var newpw = $('#new-password').val();
    var confirmpw = $('#confirm-password').val();
    // var encrypted = CryptoJS.AES.encrypt(newpw, 'DentalApp');
    if( adminuser == newname && old == '') {
        return;
    }
    if( old == '' ) {
        userdata['username'] = newname;
        db.update({ _id: 'zOrqYsyunulq64Md' }, userdata, {}, (err, numReplaced) => {
                 if(err == null) {
                    $('.notification').text('Saved.');
                }
         });
        return;
    } else if (old !== oldpw ) {
        console.log('old-password: ' + old);
        console.log('old-pw: ' + oldpw);
        $('.notification').text('Incorrect password.');
        return;
    } else if (newpw !== confirmpw) {
        console.log('new-pw: ' + newpw);
        console.log('confirm-pw: ' + confirmpw);
        $('.notification').text('New and Confirm Passwords are not the same.');
        return;
    } else if ( newpw == '' || confirmpw == '' ){
        $('.notification').text('Password cannot be empty.');
        return;
    } else {
        // console.log('encrypted: ' + encrypted.toString());
        userdata['username'] = newname;
        userdata['password'] = newpw;
        db.update({ _id: 'zOrqYsyunulq64Md' }, userdata, {}, (err, numReplaced) => {
        console.log(err);
                 if(err == null) {
                    $('.notification').text('Saved.');
                }
         });
            return;
    }
}// end submit form

/*----------------------------------------*
 *              ipc renderer              *
 *----------------------------------------*/

 $('.close-button').on( 'click', () => {
        ipcRenderer.send('settings:close', null);
});

 $('#browse-for-db').on('click',() => {
    var current_path = $("#database-path").val();

    ipcRenderer.send('settings:browse', current_path);
  });


/*----------------------------------------*
 *              ipc main                  *
 *----------------------------------------*/
ipcRenderer.on('settings:selected-database', (e,item) => {
var selected_db = item;
$("#database-path").val(selected_db);
 });
/*----------------------------------------*
 *             update database            *
 *----------------------------------------*/
$('#save-db-path').on('click',() => {
    var current_path = $("#database-path").val();
    var file = current_path;
    fs.access(file, fs.constants.R_OK, (err) => {
        console.log(`${file} ${err ? 'is not readable' : 'is readable'}`);
     if(err) {
        $('#db-error').css('visibility', 'visible');
        throw err;
    }
     fs.writeFile(path.join(__dirname,'../../inc.dat'),file,'utf8',(err) => {
        if(err) {
                console.log('error saving file: ' + err);
                $('#db-error').css('visibility', 'visible');
                throw err;
            }
        $('#db-error').css('visibility', 'hidden');
      });
    });
 });