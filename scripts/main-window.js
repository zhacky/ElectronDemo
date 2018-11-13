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
var selected;
// load list to table
var pageSize = 10;
var currentPage = 1;
function loadProfiles( search ){
    if(search === undefined || search === '' ) {
        db.find({}).skip((currentPage-1) * pageSize).limit(pageSize).exec((err,docs) => {
        profiles = docs;
        loadRows();
        }); //end find
    } else {
        var arg = new RegExp(search);
        var query = getQuery(selected,arg);
        console.log(selected);
        db.find({query}).skip(currentPage * pageSize).limit(pageSize).exec((err,docs) => {
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
    for (var i = profiles.length - 1; i >= 0; i--) {
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
for (var i = pages - 1; i >= 0; i--) {
    var html = '<li class="page-item"><a class="btn page-link page-number" data-page="' + (i + 1) + '" href="#">' + (i + 1) + '</a></li>';
    $('.pagination').prepend(html);
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
