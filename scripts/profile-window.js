const environment = 'production';
var profile;
var isNew = false;
const electron = require('electron');
const { ipcRenderer } = electron;
const Datastore = require('nedb');
const path = require('path');
var dbpath;
if(environment == 'production') {
        dbpath = path.join(__dirname,'../../../db/profiles.db');
    } else {
        dbpath = path.join(__dirname,'../scripts/profiles_db');
    }
    var db = new Datastore({ filename: dbpath, autoload: true });

    const form = document.querySelector('form');
    // save function
    form.addEventListener('submit', submitProfileForm );
    function submitProfileForm(e){
        e.preventDefault();

        var firstname = $('#firstname').val();
        var middlename = $('#middlename').val();
        var lastname = $('#lastname').val();
        var nickname = $('#nickname').val();
        var sex = $('input[name=sex]:checked').val();
        var age = $('#age').val();
        var birthdate = $('#birthdate').val();
        var telephone = $('#telephone').val();
        var religion = $('#religion').val();
        var nationality = $('#nationality').val();
        var email = $('#email-address').val();
        var address = $('#home-address').val();
        var occupation = $('#occupation').val();
        var dental_insurance = $('#dental-insurance').val();
        var effective_date = $('#effective-date').val();
        var guardian_name = $('#guardian-name').val();
        var guardian_occupation = $('#guardian-occupation').val();
        var referrer_name = $('#referrer-name').val();
        var consultation_reason = $('#consultation-reason').val();
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
        var other_allergies = [];
        $('.allergies-query input:checked').each(function(){
            other_allergies.push($(this).attr('id'));
        })

        var other_allergy = $('#other-allergies').val();

        var pregnant = $('input[name=pregnant]:checked').val();
        var nursing = $('input[name=nursing]:checked').val();
        var birth_control = $('input[name=birth-control]:checked').val();
        var blood_pressure = $('#bloodpressure').val();
        var blood_type = $('#bloodtype').val();
        var other_diseases = [];
        $('.diseases-query input:checked').each(
            function(){
                other_diseases.push($(this).attr('id'));
            });
        var other_disease = $('#other-disease').val();
        // -- dental chart data --
            mkData = data || [];


        // insert into database
        if (profile == null ) {
            console.log('profile is null');
            profile = {
                firstname: firstname,
                middlename: middlename,
                lastname: lastname,
                nickname: nickname,
                sex: sex,
                age: age,
                birthdate: birthdate,
                telephone: telephone,
                religion: religion,
                nationality: nationality,
                email: email,
                address: address,
                occupation: occupation,
                'dental-insurance': dental_insurance,
                'effective-date': effective_date,
                'guardian-name': guardian_name,
                'guardian-occupation': guardian_occupation,
                'referrer-name': referrer_name,
                'consultation-reason': consultation_reason,
                'previous-dentist': previous_dentist,
                'last-dentist-visit': last_dentist_visit,
                physician: physician,
                specialty: specialty,
                'office-address': office_address,
                'office-number': office_number,
                'good-health': good_health,
                'medical-treatment': medical_treatment,
                'medical-condition': medical_condition,
                'serious-illness': serious_illness,
                'illness-operation': illness_operation,
                hospitalized: hospitalized,
                'hospitalized-when': hospitalized_when,
                prescription: prescription,
                'prescription-what': prescription_what,
                tobacco: tobacco,
                'alcohol-drugs': alcohol_drugs,
                'other-allergies': other_allergies,
                'other-allergy': other_allergy,
                pregnant: pregnant,
                nursing: nursing,
                'birth-control': birth_control,
                'blood-pressure': blood_pressure,
                'blood-type': blood_type,
                'other-diseases': other_diseases,
                'other-disease': other_disease,
                chart: data,
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
                nickname: nickname,
                sex: sex,
                age: age,
                birthdate: birthdate,
                telephone: telephone,
                religion: religion,
                nationality: nationality,
                email: email,
                address: address,
                occupation: occupation,
                'dental-insurance': dental_insurance,
                'effective-date': effective_date,
                'guardian-name': guardian_name,
                'guardian-occupation': guardian_occupation,
                'referrer-name': referrer_name,
                'consultation-reason': consultation_reason,
                'previous-dentist': previous_dentist,
                'last-dentist-visit': last_dentist_visit,
                physician: physician,
                specialty: specialty,
                'office-address': office_address,
                'office-number': office_number,
                'good-health': good_health,
                'medical-treatment': medical_treatment,
                'medical-condition': medical_condition,
                'serious-illness': serious_illness,
                'illness-operation': illness_operation,
                hospitalized: hospitalized,
                'hospitalized-when': hospitalized_when,
                prescription: prescription,
                'prescription-what': prescription_what,
                tobacco: tobacco,
                'alcohol-drugs': alcohol_drugs,
                'other-allergies': other_allergies,
                'other-allergy': other_allergy,
                pregnant: pregnant,
                nursing: nursing,
                'birth-control': birth_control,
                'blood-pressure': blood_pressure,
                'blood-type': blood_type,
                'other-diseases': other_diseases,
                'other-disease': other_disease,
                chart: data,
            };
            db.update({_id: key}, profile, {upsert: true}, function(err, doc){
                console.log('error updating profile: ' + err + 'key: ' + key);
                if(err == null) {
                    $('.notification').text('Saved.');
                }
            });
        } //endif
        if(isNew) {
            ipcRenderer.send('profile:close', null);
        }
    }// end submit
    // -- get profile key from item --
ipcRenderer.on('profile-selected', (e,item) => {
    console.log('received data in profile from main: ' + item);
    getProfile(item);

});
/*----------  ON double click --------------*/
// double click toggle fullscreen
$(document).on('dblclick','body',(e) => {
    console.log('double clicked!');
    ipcRenderer.send('general:double-click',null);
 });

// -- get profile using key --
function getProfile( key ) {
    db.find({_id: key }, (err, doc) => {
        profile = doc[0];
        console.log(profile);
        //
            if(profile != null || profile != undefined) {
                 loadProfile();
            } else {
                isNew = true;
            }
     });
}
// load profile into html
function loadProfile(){
    $('#firstname').val(profile['firstname']);
    $('#middlename').val(profile['middlename']);
    $('#lastname').val(profile['lastname']);
    $('#nickname').val(profile['nickname']);
    $('#' + profile['sex']).prop('checked', 'checked').trigger('change'); // radios
    $('#age').val(profile['age']);
    $('#birthdate').val(profile['birthdate']);
    $('#telephone').val(profile['telephone']);
    $('#religion').val(profile['religion']);
    $('#nationality').val(profile['nationality']);
    $('#email-address').val(profile['email']);
    $('#home-address').val(profile['address']);
    $('#occupation').val(profile['occupation']);
    $('#dental-insurance').val(profile['dental-insurance']);
    $('#effective-date').val(profile['effective-date']); // date
    $('#guardian-name').val(profile['guardian-name']);
    $('#guardian-occupation').val(profile['guardian-occupation']);
    $('#referrer-name').val(profile['referrer-name']);
    $('#consultation-reason').val(profile['consultation-reason']);
    $('#dental-history').val(profile['dental-history']);
    $('#previous-dentist').val(profile['previous-dentist']);
    $('#last-dental-visit').val(profile['last-dentist-visit']); // date
    $('#physician').val(profile['physician']);
    $('#specialty').val(profile['specialty']);
    $('#office-address').val(profile['office-address']);
    $('#office-number').val(profile['office-number']);
    $('#good-health-' + profile['good-health']).prop('checked','checked').trigger('change'); // radios
    $('#medical-treatment-' + profile['medical-treatment']).prop('checked','checked').trigger('change'); // radios
    $('#medical-condition').val(profile['medical-condition']);
    $('#serious-illness-' + profile['serious-illness']).prop('checked','checked').trigger('change'); // radios
    $('#illness-operation').val(profile['illness-operation']);
    $('#hospitalized-' + profile['hospitalized']).prop('checked','checked').trigger('change'); // radios
    $('#hospitalized-when').val(profile['hospitalized-when']); // date
    $('#prescription-' + profile['prescription']).prop('checked','checked').trigger('change'); // radios
    $('#prescription-what').val(profile['prescription-what']);
    $('#tobacco-' + profile['tobacco']).prop('checked','checked').trigger('change'); // radios
    $('#alcohol-drugs-' + profile['alcohol-drugs']).prop('checked','checked').trigger('change'); // radios
    for (var i = profile['other-allergies'].length - 1; i >= 0; i--) {
        var oa = profile['other-allergies'][i];
        $('#' + oa).prop('checked', 'checked').trigger('change');
    }

    $('#other-allergy').val(profile['other-allergy']);
    $('#pregnant-' + profile['pregnant']).prop('checked','checked').trigger('change'); // radios
    $('#nursing-' + profile['nursing']).prop('checked','checked').trigger('change'); // radios
    $('#birth-control-' + profile['birth-control']).prop('checked','checked').trigger('change'); // radios
    $('#bloodpressure').val(profile['blood-pressure']);
    $('#bloodtype').val(profile['blood-type']);
    for (var i = profile['other-diseases'].length - 1; i >= 0; i--) {
        var od = profile['other-diseases'][i];
        $('#' + od).prop('checked','checked').trigger('change');
    }
    $('#other-disease').val(profile['other-disease']);
     data = profile['chart'];
     loadDentalData();

} /*----------  end load profile --------------*/
// -- close button --
$('.close-button').on( 'click', () => {
        ipcRenderer.send('profile:close', null);
});
// -- preview button --
$('.print-preview').on( 'click', () => {
        ipcRenderer.send('profile:preview', profile);
});
// -- print button --


// on document ready, load selected profile if exists
$(document).ready(function(){

});
