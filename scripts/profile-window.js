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
        var occupation = $('#occupation').val();
        var dental_insurance = $('#dental-insurance').val();
        var effective_date = $('#effective-date').val();
        var guardian_name = $('#guardian-name').val();
        var guardian_occupation = $('#guardian-occupation').val();
        var referrer_name = $('#referrer-name').val();
        var consultation_reason = $('#consultation-reason').val();
        var dental_history = $('#dental-history').val();
        var previous_dentist = $('#previous-dentist').val();
        var last_dentist_visit = $('#last-dental-visit').val();
        // --- medical history data ---
        var  physician = $('#physician').val();
        var specialty = $('#specialty').val();
        var office_address = $('#office-address').val();
        var office_number = $('#office-number').val();
        var good_health = $('input[name=good-health]:checked').val();
        var medical_treatment = $('input[name=medical-treatment]:checked').val();
        var medical_condition = $('#medical-condition').val();
        var serious_illness = $('input[name=serious-illness]:checked').val();
        var illness_operation = $('#illness-operation').val();
        var hospitalized = $('input[name=hospitalized]:checked').val();
        var hospitalized_when = $('#hospitalized-when').val();
        var prescription = $('input[name=prescription]:checked').val();
        var prescription_what = $('#prescription-what').val();
        var tobacco = $('input[name=tobacco]:checked').val();
        var alcohol_drugs = $('input[name=alcohol-drugs]:checked').val();
        var other_allergies = $('.allergies-query input:checked').val();
        var other_allergy = $('#other-allergies').val();

        var pregnant = $('input[name=pregnant]:checked').val();
        var nursing = $('input[name=nursing]:checked').val();
        var birth_control = $('input[name=birth-control]:checked').val();
        var blood_pressure = $('#bloodpressure').val();
        var blood_type = $('#bloodtype').val();
        var other_diseases = $('.diseases-query input:checked label').val();
        // -- dental chart data --


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
ipcRenderer.on('profile-selected', (e,item) => {
    console.log('received data in profile from main: ' + item);
    getProfile(item);

});
/*----------  ON wrote-pdf --------------*/


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
// -- preview button --
$('.print-preview').on( 'click', () => {
        ipcRenderer.send('profile:preview', null);
});
// -- print button --


// on document ready, load selected profile if exists
$(document).ready(function(){

});
