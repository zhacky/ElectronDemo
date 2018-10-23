    const electron = require('electron');
    const { ipcRenderer } = electron;
    const form = document.querySelector('form');

    const path = require('path');
    const inc = path.join(__dirname, '../scripts/inc.dat');
    //Synchronous read

    // Database
    var Datastore = require('nedb');
    var dbpath = path.join(__dirname,'../scripts/user_db');
    var db = new Datastore({filename: dbpath, autoload:true });

    var item = ' loginWindow';
    // add submit function
    form.addEventListener('submit', submitForm );



    function submitForm(e){
        e.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
        console.log('Entered username & password: ' + username +''+password);
        // stored data
        // var admin;// =dataArray[0];
        // var encrypted_pw;// = dataArray[1];
        var admin = '';
        var pw = '';
        db.find({}, function(err, docs){
            admin = docs[0]['username'];
            console.log('admin: ' + admin);
            encrypted_pw = docs[0]['password'];
            var pwBytes = CryptoJS.AES.decrypt(encrypted_pw, 'DentalApp');
            console.log('encrypted_pw: ' + encrypted_pw);
            pw = pwBytes.toString(CryptoJS.enc.Utf8);
            console.log('pw: ' + pw);
            login(username,password,admin,pw);
        });
    } // end submit
function login(uname, pword ,dbadmin, dbpassword) {
    $('span.validation').html = '';
        // var encrypted = CryptoJS.AES.encrypt(password, 'DentalApp');
        if( uname == dbadmin && pword == dbpassword ) {

            ipcRenderer.send('login:submit', item);

        } else {
            $('span.validation').html('Username or Password is incorrect.');
        }
}


    $(document).ready(() => {
        $('#username').focus();
     });