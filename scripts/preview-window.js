const electron = require('electron');
const { ipcRenderer } = electron;


function loadProfile(profile){
    $('#firstname').text(profile['firstname']);
    $('#middlename').text(profile['middlename']);
    $('#lastname').text(profile['lastname']);
    $('#nickname').text(profile['nickname']);
    $('#sex').text(profile['sex']);
    $('#age').text(profile['age']);
    $('#birthdate').text(profile['birthdate']);
    $('#telephone').text(profile['telephone']);
    $('#religion').text(profile['religion']);
    $('#nationality').text(profile['nationality']);
    $('#email').text(profile['email']);
    $('#home-address').text(profile['address']);
    $('#occupation').text(profile['occupation']);
    $('#dental-insurance').text(profile['dental-insurance']);
    $('#effective-date').text(profile['effective-date']); // date
    $('#guardian-name').text(profile['guardian-name']);
    $('#guardian-occupation').text(profile['guardian-occupation']);
    $('#referrer-name').text(profile['referrer-name']);
    $('#consultation-reason').text(profile['consultation-reason']);
    $('#dental-history').text(profile['dental-history']);
    $('#previous-dentist').text(profile['previous-dentist']);
    $('#last-dentist-visit').text(profile['last-dentist-visit']); // date
    $('#physician').text(profile['physician']);
    $('#specialty').text(profile['specialty']);
    $('#office-address').text(profile['office-address']);
    $('#office-number').text(profile['office-number']);
    $('#good-health').text(profile['good-health']);
    $('#medical-treatment').text(profile['medical-treatment']);
    $('#medical-condition').text(profile['medical-condition']);
    $('#serious-illness').text(profile['serious-illness']);
    $('#illness-operation').text(profile['illness-operation']);
    $('#hospitalized').text(profile['hospitalized']);
    $('#hospitalized-when').text(profile['hospitalized-when']); // date
    $('#prescription').text(profile['prescription']);
    $('#prescription-what').text(profile['prescription-what']);
    $('#tobacco').text(profile['tobacco']);
    $('#alcohol-drugs').text(profile['alcohol-drugs']);
    for (var i = profile['other-allergies'].length - 1; i >= 0; i--) {
        var oa = profile['other-allergies'][i];
        var txt = $('#other-allergies').text() + ', ' + oa;
        $('#other-allergies').text(txt);
    }
    var oa = $('#other-allergies').text() + ', ' + profile['other-allergy'];
    $('#other-allergies').text(oa);
    $('#pregnant').text(profile['pregnant']);
    $('#nursing').text(profile['nursing']);
    $('#birth-control').text(profile['birth-control']);
    $('#blood-pressure').text(profile['blood-pressure']);
    $('#blood-type').text(profile['blood-type']);
    for (var i = profile['other-diseases'].length - 1; i >= 0; i--) {
        var od = profile['other-diseases'][i];
        var txt = $('#other-diseases').text() + ', ' + od;
        $('#other-diseases').text(txt);
    }
    var od = $('#other-diseases').text() + ', ' + profile['other-disease'];
    $('#other-diseases').text(od);
     //var data = profile['chart'];

}

$('.to-pdf').on( 'click', () => {
    $('.to-pdf').hide();
        ipcRenderer.send('profile:print', null);
});


 ipcRenderer.on('wrote-pdf', (e, pdfPath) => {
    console.log('pdf file: ' + pdfPath);
    $('.to-pdf').show();
 });

ipcRenderer.on('profile-preview', (e, item) => {
    var profile = item;
    loadProfile(profile);
 });