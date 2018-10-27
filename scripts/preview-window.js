var profile;
const electron = require('electron');
const { ipcRenderer } = electron;




$('.to-pdf').on( 'click', () => {
    $('.to-pdf').hide();
        ipcRenderer.send('profile:print', null);
});


 ipcRenderer.on('wrote-pdf', (e, pdfPath) => {
    console.log('pdf file: ' + pdfPath);
    $('.to-pdf').show();
 });
