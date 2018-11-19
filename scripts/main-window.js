const electron = require('electron');
const isProduction = require('electron-is-running-in-asar');
const { ipcRenderer } = electron;
// load database
var Datastore = require('nedb');
var path = require('path');
var db;
// get dbpath from inc.dat file (should be configurable)
const fs = require('fs');
var dbpath;
// if (isProduction() || true) {
/*---------- location on outside folder dentistapp-win32-ia32  --------------*/
// dbpath = fs.readFileSync(path.join(__dirname,'../../../../db/inc.dat'),'utf8');
// } else {
const userDataPath = (electron.app || electron.remote.app).getPath('userData');
dbpath = path.join(userDataPath, 'profiles.db');
// }
// db
db = new Datastore({ filename: dbpath, autoload: true });
var dbcount;
db.count({},function(err,count){
dbcount = count;
});
// profiles array
var profiles = [];
var events = [];
var selected;
// load list to table
var pageSize = 20;
var currentPage = 1;
var sorting = {lastname: 1};
var sorting_order = false;
function loadProfiles( search ){
    if(search === undefined || search === '' ) {
        db.find({}).sort(sorting).skip((currentPage-1) * pageSize).limit(pageSize).exec((err,docs) => {
        profiles = docs;
        loadRows();
        }); //end find
    } else {
        var arg = new RegExp(search);
        var query = getQuery(selected,arg);
        console.log(selected);
        db.find({query}).sort(sorting).skip(currentPage * pageSize).limit(pageSize).exec((err,docs) => {
        profiles = docs;
        loadRows();
        }); //end find search
    }

} // end loadProfiles
function editRow(id){
    var item = id;
    ipcRenderer.send('profile:edit', item);
}
function deleteRow(id){
    db.remove({_id: id }, (err, numRemoved) => {  });
    loadProfiles('');
}

function loadRows(){
        $('.profile-list table tbody').empty();
    for (var i = 0; i <= profiles.length - 1; i++) {
        var lname = profiles[i]['lastname'];
        var fname = profiles[i]['firstname'];
        var mname = profiles[i]['middlename'];
        var sex = profiles[i]['sex'];
        var age = profiles[i]['age'];
        var address = profiles[i]['address'] === undefined ? ' - ' : profiles[i]['address'];
        var pid = profiles[i]['_id'];

        $('.profile-list table tbody').append(
            '<tr>' +
            '<td>' + lname + '</td>' +
            '<td>' + fname + '</td>' +
            '<td>' + mname + '</td>' +
            '<td>' + sex + '</td>' +
            '<td>' + age + '</td>' +
            '<td>' + address + '</td>' +
            '<td>' + '<a href="#" class="edit-button" id="'+ pid + '"><span class="oi oi-pencil"></span></a>' + '</td>' +
            '<td>' + '<a href="#" class="delete-button" id="'+ pid + '"><span class="oi oi-x"></span></a>' + '</td>' +
            '</tr>');
        // load appointments
        loadDates(profiles[i]);
    }
    // create click event for edit row
    $('.edit-button').on('click', function() {
        var id = $(this).attr('id');
        editRow(id);
    });
// create click event for delete row
    $('.delete-button').on('click', function() {
        var id = $(this).attr('id');
    ipcRenderer.send('main:confirm-delete', id);
    });

// update pagination
/**
<ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
</ul>
*/
var pages = Math.floor((dbcount / pageSize)) + 1;
// load for each page
$('.pagination').empty();
// load number links
for (var i = 0; i <= pages - 1; i++) {
    var html = '<li class="page-item"><a class="btn page-link page-number" data-page="' + (i + 1) + '" href="#">' + (i + 1) + '</a></li>';
    $('.pagination').append(html);
}
// load previous link
    if (pages > 1) {
        var disabled = currentPage == 1 ? 'disabled' : '';

        var prevHtml = '<li class="page-item"><a class="btn page-link page-cursor ' + disabled + '" data-page="' + (currentPage - 1) + '" href="#">Previous</a></li>';
        $('.pagination').prepend(prevHtml);
    }
// load next link
    if( pages > 1){
        var disabled = currentPage >= pages ? 'disabled' : '';
        var nextHtml = '<li class="page-item"><a class="btn page-link page-cursor ' + disabled + '" data-page="' + (currentPage + 1) + '" href="#" ' + disabled + '>Next</a></li>';
        $('.pagination').append(nextHtml);
    }
    $('.page-number').on('click', function () {

        var pgNo = parseInt($(this).data('page'));
        console.log('clicked page: ' + pgNo);
        currentPage = pgNo;
        loadProfiles('');
    });
    $('.page-cursor').on('click',function(){
        var pgNo = parseInt($(this).data('page'));
        currentPage = pgNo;
        loadProfiles('');
    });

}

// double click toggle fullscreen
$(document).on('dblclick','body',(e) => {
    console.log('double clicked!');
    ipcRenderer.send('general:double-click',null);
 });

// delete confirmation
ipcRenderer.on('main:confirmed-delete', (e, item) => {
var id = item;
deleteRow(id);
 });

// initial load
$(document).ready(() => {
    $('input[name=search]').focus();
    loadProfiles('');

});

// search function
$('input[name=search]').on('change', function(){
    var arg = $(this).val();
    loadProfiles(arg);
});
$('#search-select').change(function(){
    var selection = $(this).find("option:selected").val();
    selected = selection;
    console.log('selection: ' + selection);
});



// create query for search-selection
function getQuery( selection, arg ) {
    switch (selection) {
        case '1':
            return { lastname: arg };

            break;
        case '2':
            return { firstname: arg };
            break;
        case '3':
            return { middlename: arg };
            break;
        case '4':
            return {sex: arg };
            break;
        case '5':
            return {age: arg };
            break;
        case '6':
            return {address: arg };
            break;
        default:
            return {firstname: arg };
            break;
    }
}
/*----------------------------------------*
 *              IPC RENDERER              *
 *----------------------------------------*/
// create click event for new profile
$('#new-profile').on('click',() => {
    var item = null;
    ipcRenderer.send('profile:create', item);
});
// create click event for settings
$('#settings').on('click', () => {
    var item = null;
    ipcRenderer.send('settings:open', item);
 });
/*----------------------------------------*
 *              LOADING  DATES            *
 *----------------------------------------*/
 function loadDates(pf){
    // console.log('loading dates...');
    // events =[{ title: 'Demo', start: '2018-11-25'},];
            var todayDate = moment().startOf('day');
            // var YM = todayDate.format('YYYY-MM');
            // var YESTERDAY = todayDate.clone().subtract(1, 'day').format('YYYY-MM-DD');
            // var TODAY = todayDate.format('YYYY-MM-DD');
            // var TOMORROW = todayDate.clone().add(1, 'day').format('YYYY-MM-DD');
        //demo
                if(pf.visits.length > 0) {
                    for (var i = pf.visits.length - 1; i >= 0; i--) {
                        var appt = pf.visits[i].next_appt;
                        var appt_date = moment(appt);
                        if(appt_date > todayDate) {
                            console.log('profile id: (with visits) ' + pf._id);
                            console.log(appt);
                            var event = { title: pf.lastname + "-" + pf.firstname, start: appt_date.format("YYYY-MM-DD") };
                            console.log('event: ' + event);
                            events.push(event);
                        }
                    }
                }

 }
 function loadCalendar(){

            $('#calendar').fullCalendar({


            header: {
                left: 'prev,next today',
                center: 'title',
                // right: 'month,agendaWeek,agendaDay,listWeek'
                right: 'month,agendaDay'
            },
            // weekends: false,
            editable: true,
            eventLimit: true, // allow "more" link when too many evnts
            navLinks: true,
            events: events
        }); // end calendar
 }
/*----------------------------------------*
 *           SORTING PROCESS              *
 *----------------------------------------*/
$('#last-name-sort').on('click',function(e){
e.preventDefault();
console.log('sorting by lastname');
var order = sorting_order ? 1 : -1;
sorting = {lastname: order};
sorting_order = !sorting_order;
loadProfiles('');
});
$('#first-name-sort').on('click',function(e){
e.preventDefault();
console.log('sorting by firstname');
var order = sorting_order ? 1 : -1;
sorting = {firstname: order};
sorting_order = !sorting_order;
loadProfiles('');

});
$('#middle-name-sort').on('click',function(e){
e.preventDefault();
console.log('sorting by middlename');
var order = sorting_order ? 1 : -1;
sorting = {middlename: order};
sorting_order = !sorting_order;
loadProfiles('');

});
$('#sex-gender-sort').on('click',function(e){
e.preventDefault();
console.log('sorting by gender');
var order = sorting_order ? 1 : -1;
sorting = {sex: order};
sorting_order = !sorting_order;
loadProfiles('');

});
$('#age-years-sort').on('click',function(e){
e.preventDefault();
console.log('sorting by age');
var order = sorting_order ? 1 : -1;
sorting = {age: order};
sorting_order = !sorting_order;
loadProfiles('');

});
$('#home-address-sort').on('click',function(e){
e.preventDefault();
console.log('sorting by address');
var order = sorting_order ? 1 : -1;
sorting = {address: order};
sorting_order = !sorting_order;
loadProfiles('');

});
$('#calendar-button').on('click',function(){
    loadCalendar();
    $(this).hide();
});
