const electron = require('electron');
const isProduction = require('electron-is-running-in-asar');
const { ipcRenderer } = electron;
// load database
var Datastore = require('nedb');
var path = require('path');
var db;
// get dbpath from inc.dat file (should be configurable)
const fs = require('fs');
// const jet = require('fs-jetpack');
var dbpath;
// if (isProduction() || true) {
/*---------- location on outside folder dentistapp-win32-ia32  --------------*/
// dbpath = fs.readFileSync(path.join(__dirname,'../../../../db/inc.dat'),'utf8');
// } else {
const userDataPath = (electron.app || electron.remote.app).getPath('userData');
dbpath = path.join(userDataPath, 'profiles.db');
// }
const imagepath = path.dirname(dbpath);
// db
db = new Datastore({ filename: dbpath, autoload: true });
// profile is new or edit only
var isNew = false;
var profile;
const uuidv1 = require('uuid/v1');
    const form = document.querySelector('form');
    // save function
    form.addEventListener('submit', submitProfileForm );
    function submitProfileForm(e){
        e.preventDefault();
        var firstname = $('#firstname').val();
        var middlename = $('#middlename').val();
        var lastname = $('#lastname').val();
        // save photo based on first and last name --//
        var photo = $('#photo').attr('src');
        console.log('photo: ' + photo);
        console.log('ext: ' + path.extname(photo));
        if( path.extname(photo).length == 0 ) {
            // var imgBuffer = processBase64Image(photo);
            // console.log('imgBuffer: ' + imgBuffer);
            // fs.writeFile(dbphoto, imgBuffer.data, function(err){
            //     if(err){
            //                    console.log('Cannot save the image into file.\n' + err);
            //                }else{
            //                    console.log('Image saved succesfully');
            //                }
            // });
            // console.log('dbphoto: ' + dbphoto);
        }
        //-------end photo save---------//
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
        });

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
        //-- extras
        var periodontal_screening = [];
        $('input[name=periodontal-screening]:checked').each(
                function(){
                    periodontal_screening.push($(this).attr('id'));
                }
            );
        var occlusion = [];
        $('input[name=occlusion]:checked').each(
                function(){
                    occlusion.push($(this).attr('id'));
                }
            );
        var appliances = [];
        $('input[name=appliances]:checked').each(
                function(){
                    appliances.push($(this).attr('id'));
                }
            );
        var xray_taken = [];
        $('input[name=xray-taken]:checked').each(
                function(){
                    xray_taken.push($(this).attr('id'));
                }
            );
        var tmd = [];
        $('input[name=tmd]:checked').each(
                function(){
                    tmd.push($(this).attr('id'));
                }
            );
        // -- dental chart data --
            mkData = data || [];
        // -- visits --
        var visits = [];

        $('#visits-table tr.visits-row').each(
                function(){
                    var visit = {};
                    visit.id = $(this).attr('id');
                    visit.treatment_date = $(this).find('.treatment-date').text();
                    visit.tooth_nos = $(this).find('.tooth-nos').text();
                    visit.procedure = $(this).find('.procedure').text();
                    visit.dentists = $(this).find('.dentists').text();
                    visit.charged = $(this).find('.charged').text();
                    visit.paid = $(this).find('.paid').text();
                    visit.balance = $(this).find('.balance').text();
                    visit.next_appt = $(this).find('.next-appt').text();
                    visits.push(visit);
                }
            );

        // insert into database
        if (profile == null ) {
            console.log('profile is null');
            profile = {
                photo: photo,
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
                'periodontal-screening': periodontal_screening,
                occlusion: occlusion,
                appliances: appliances,
                'xray-taken': xray_taken,
                tmd: tmd,
                visits: visits
            };
            db.insert(profile, function(err, doc) {
                if(err) {
                    console.log('error from insert to profiles.db: ' + err);
                    return;
                }
                $('.notification').text('Saved.');
                ipcRenderer.send('profile:close', null);
            });
        } else {
            // update profile in database
            console.log('profile is not null');
            var key = profile['_id'];
            profile = {
                _id: key,
                photo: photo,
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
                'periodontal-screening': periodontal_screening,
                occlusion: occlusion,
                appliances: appliances,
                'xray-taken': xray_taken,
                tmd: tmd,
                visits: visits
            };
            db.update({_id: key}, profile, {upsert: true}, function(err, doc){
                if(err) {
                                console.log('error updating profile: ' + err + 'key: ' + key);
                }else {
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
    var img = profile['photo'];
    if(path.extname(img).length == 0){
        $('#photo').attr('src', profile['photo']);
    } else {
        $('#photo').attr('src', '../images/avatar_2x.png');
    }
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
    if(profile['other-allergies']){
        for (var i = profile['other-allergies'].length - 1; i >= 0; i--) {
            var oa = profile['other-allergies'][i];
            $('#' + oa).prop('checked', 'checked').trigger('change');
        }
    }

    $('#other-allergy').val(profile['other-allergy']);
    $('#pregnant-' + profile['pregnant']).prop('checked','checked').trigger('change'); // radios
    $('#nursing-' + profile['nursing']).prop('checked','checked').trigger('change'); // radios
    $('#birth-control-' + profile['birth-control']).prop('checked','checked').trigger('change'); // radios
    $('#bloodpressure').val(profile['blood-pressure']);
    $('#bloodtype').val(profile['blood-type']);
    if(profile['other-diseases']){
        for (var i = profile['other-diseases'].length - 1; i >= 0; i--) {
            var od = profile['other-diseases'][i];
            $('#' + od).prop('checked','checked').trigger('change');
        }
    }
    // extras
    if(profile['periodontal-screening']){
        for (var i = profile['periodontal-screening'].length - 1; i >= 0; i--) {
            var ps = profile['periodontal-screening'][i];
            $('#' + ps).prop('checked','checked').trigger('change');
        }
    }
    if(profile['occlusion']) {
        for (var i = profile['occlusion'].length - 1; i >= 0; i--) {
            var oc = profile['occlusion'][i];
            $('#' + oc).prop('checked','checked').trigger('change');
        }
    }
    if(profile['appliances']) {
        for (var i = profile['appliances'].length - 1; i >= 0; i--) {
            var ap = profile['appliances'][i];
            $('#' + ap).prop('checked','checked').trigger('change');
        }
    }
    if(profile['xray-taken']){
        for (var i = profile['xray-taken'].length - 1; i >= 0; i--) {
            var xr = profile['xray-taken'][i];
            $('#' + xr).prop('checked','checked').trigger('change');
        }
    }
    if(profile['tmd']){
        for (var i = profile['tmd'].length - 1; i >= 0; i--) {
            var tm = profile['tmd'][i];
            $('#' + tm).prop('checked','checked').trigger('change');
        }
    }
    $('#other-disease').val(profile['other-disease']);
     data = profile['chart'];
     loadDentalData();

     //load visits
     var visits = profile['visits'];

     if(visits && visits.length > 0) {
        var total_b = 0.00;
        var t_bstring = '';
        for (var i = visits.length - 1; i >= 0; i--) {
            var visit = visits[i];
            total_b = total_b + (parseFloat(visit.balance));
            visit = '<tr class="visits-row" id="' + visit.id + '">' +
                    '<td class="treatment-date">' + visit.treatment_date + '</td>' +
                    '<td class="tooth-nos">' + visit.tooth_nos +  '</td>' +
                    '<td class="procedure">' + visit.procedure +  '</td>' +
                    '<td class="dentists">' + visit.dentists +  '</td>' +
                    '<td class="charged">' + visit.charged +  '</td>' +
                    '<td class="paid">' + visit.paid +  '</td>' +
                    '<td class="balance">' + visit.balance +  '</td>' +
                    '<td class="next-appt">' + visit.next_appt +  '</td>' +
                    '<td><a href="javascript: removeVisit(`' + visit.id + '`);" class="remove-visit"><span class="oi oi-x"></span></a></td>' +
                    '</tr>';
        $('#visits-table').append(visit);
        }
        $('#total-balance').text('₱' + total_b.toFixed(2));
     }
} /*----------  end load profile --------------*/
/*----------  ON #paid keyup --------------*/
$('#paid').on('keyup', function() {
var charged = parseFloat($('#charged').val());
var paid = parseFloat($('#paid').val());
if(charged >= paid) {
    var balance = charged - paid;
    $('#balance').val(balance);
}
console.log('charged: ' + charged);
console.log('paid: ', paid);
});


/*----------  ON Add --------------*/
$('#add-treatment').on('click',function(){
    var new_id = uuidv1();
    var treatment_date = $('#treatment-date').val();
    var procedure = $('#procedure').val();
    var tooth_nos = $('#tooth-nos').val();
    var dentists = $('#dentists').val();
    var charged = $('#charged').val();
    var paid = $('#paid').val();
    var balance = $('#balance').val();
    var next_appt = $('#next-appt').val();
    var valid = treatment_date ? 'valid' : 'invalid';
    var valid2 = treatment_date ? 'invalid' : 'valid';
    $('#treatment-date').addClass('is-' + valid).removeClass('is-' + valid2);
    valid = procedure ? 'valid' : 'invalid';
    valid2 = procedure ? 'invalid' : 'valid';
    $('#procedure').addClass('is-' + valid).removeClass('is-' + valid2);
    valid = tooth_nos ? 'valid' : 'invalid';
    valid2 = tooth_nos ? 'invalid' : 'valid';
    $('#tooth-nos').addClass('is-' + valid).removeClass('is-' + valid2);
    valid = dentists ? 'valid' : 'invalid';
    valid2 = dentists ? 'invalid' : 'valid';
    $('#dentists').addClass('is-' + valid).removeClass('is-' + valid2);
    valid = charged ? 'valid' : 'invalid';
    valid2 = charged ? 'invalid' : 'valid';
    $('#charged').addClass('is-' + valid).removeClass('is-' + valid2);
    valid = paid ? 'valid' : 'invalid';
    valid2 = paid ? 'invalid' : 'valid';
    $('#paid').addClass('is-' + valid).removeClass('is-' + valid2);
    valid = balance ? 'valid' : 'invalid';
    valid2 = balance ? 'invalid' : 'valid';
    $('#balance').addClass('is-' + valid).removeClass('is-' + valid2);
    valid = next_appt ? 'valid' : 'invalid';
    valid2 = next_appt ? 'invalid' : 'valid';
    $('#next-appt').addClass('is-' + valid).removeClass('is-' + valid2);


    if(!treatment_date || !procedure || !tooth_nos || !dentists || !charged || !paid || !balance || !next_appt) return;
    var visit = '<tr class="visits-row" id="'+ new_id +'">' +
                    '<td class="treatment-date">' + treatment_date + '</td>' +
                    '<td class="tooth-nos">' + tooth_nos +  '</td>' +
                    '<td class="procedure">' + procedure +  '</td>' +
                    '<td class="dentists">' + dentists +  '</td>' +
                    '<td class="charged">' + charged +  '</td>' +
                    '<td class="paid">' + paid +  '</td>' +
                    '<td class="balance">' + balance +  '</td>' +
                    '<td class="next-appt">' + next_appt +  '</td>' +
                    '<td><a href="javascript: removeVisit(`' + new_id + '`);" class="remove-visit"><span class="oi oi-x"></span></a></td>' +
                    '</tr>';
    $('#visits-table').append(visit);
    // add to balance
    var bal = parseFloat(balance);
    var txt_total_balance = $('#total-balance').text().substring(1);
    var current_bal = parseFloat(txt_total_balance);
    current_bal += bal;
    $('#total-balance').text('₱' + current_bal.toFixed(2));
});
/*----------  ON delete --------------*/
function removeVisit( visit_id ){
    if(visit_id) {
        ipcRenderer.send('profile:remove-record', visit_id);
    }
}
ipcRenderer.on('profile:confirmed-remove',(e, item) => {
    var record = item;
    removeRecord(record);
});
function removeRecord( record_id ) {
    $('#'+ record_id).remove();
    var visits = profile['visits'];
    var total_b = 0;
    for (var i = visits.length - 1; i >= 0; i--) {
        var visit = visits[i];
        console.log('visit.id: ' + visit.id + '\nrecord id: ' + record_id);
        if(visit.id != record_id) {
            total_b = total_b + (parseFloat(visit.balance));
        }
    }
    $('#total-balance').text('₱' + total_b.toFixed(2));
}
// -- close button --
$('.close-button').on( 'click', () => {
        ipcRenderer.send('profile:close', null);
});
// -- preview button --
$('.print-preview').on( 'click', () => {
        ipcRenderer.send('profile:preview', profile);
});

// function for converting data uri to buffer date
function processBase64Image(dataString){
      var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),response = {};

      if (matches.length !== 3) {
          return new Error('Invalid input string');
      }

      response.type = matches[1];
      response.data = Buffer.from(matches[2], 'base64');

      return response;
}
/*----------------------------------------*
 *              date defaults             *
 *----------------------------------------*/
 $(document).on('ready',function(){
    $('#treatment-date').val(new Date());
 });
 $('#treatment-date').on('change',function(){
    $('#next-appt').val($(this).val());
 });
/*----------------------------------------*
 *              CAMERA                    *
 *----------------------------------------*/
 var enabled = false;
 var WebCamera = require("webcamjs");

document.getElementById("start").addEventListener('click',function(){
   if(!enabled){ // Start the camera !
     enabled = true;
     WebCamera.attach('#camdemo');
     console.log("The camera has been started");
   }else{ // Disable the camera !
     enabled = false;
     WebCamera.reset();
    console.log("The camera has been disabled");
   }
},false);

document.getElementById("savefile").addEventListener('click',function(){
     if(enabled){
            WebCamera.snap(function(data_uri) {
                // Save the image in a variable
                // var imageBuffer = processBase64Image(data_uri);
                // Start the save dialog to give a name to the file
                photo = data_uri;
                $('#photo').attr('src',photo);
             });
     }else{
            alert("Please enable the camera first to take the snapshot !");
     }
},false);