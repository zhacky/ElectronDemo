    var profile;
    const electron = require('electron');
    const { ipcRenderer } = electron;
    const Datastore = require('nedb');
    const path = require('path');
    const dbpath = path.join(__dirname,'../scripts/profiles_db');
    var db = new Datastore({ filename: dbpath, autoload: true });

    const form = document.querySelector('form');
    // save function
    form.addEventListener('submit', submitProfileForm );
    function submitProfileForm(e){
        e.preventDefault();

        var firstname = $('#firstname').val();
        var middlename = $('#middlename').val();
        var lastname = $('#lastname').val();
        var sex = $('input[name=sex]:checked').val();
        var age = $('#age').val();
        var address = $('#home-address').val();
        // insert into database
        if (profile == null ) {
            console.log('profile is null');
            profile = {
                firstname: firstname,
                middlename: middlename,
                lastname: lastname,
                sex: sex,
                age: age,
                address: address
            };
            db.insert(profile, function(err, doc) {
                console.log('error from insert to profiles.db: ' + err);
            });
        } else {
            // update profile in database
            console.log('profile is not null');
            var key = profile['_id'];
            profile = {
                _id: key,
                firstname: firstname,
                middlename: middlename,
                lastname: lastname,
                sex: sex,
                age: age,
                address: address
            };
            db.update({_id: key}, profile, {upsert: true}, function(err, doc){
                console.log('error updating profile: ' + err + 'key: ' + key);
                if(err == null) {
                    $('.notification').text('Saved.');
                }
            });
        } //endif
    }
    // -- get profile key from item --
ipcRenderer.on('profile-selected', (err,item) => {
    console.log('received data in profile from main: ' + item);
    getProfile(item);

});
// -- get profile using key --
function getProfile( key ) {
    db.find({_id: key }, (err, doc) => {
        profile = doc[0];
        console.log(profile);
        //
            if(profile != null || profile != undefined) {
                loadProfile();
            }
     });
}
// load profile into html
function loadProfile(){
    $('#firstname').val(profile['firstname']);
    $('#middlename').val(profile['middlename']);
    $('#lastname').val(profile['lastname']);
    $('#' + profile['sex']).attr('checked', true);
    $('#age').val(profile['age']);
    $('#home-address').val(profile['address']);
}
// -- close button --
$('.close-button').on( 'click', () => {
        ipcRenderer.send('profile:close', null);
});

// on document ready, load selected profile if exists
$(document).ready(function(){

});
