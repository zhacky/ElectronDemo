$(function(){
//     var apptDate = moment("2018-11-25");
//     var eventArray = [{title: 'Demo', start: apptDate }];
// $('#calendar').fullCalendar({
//             header: {
//                 left: 'prev,next today',
//                 center: 'title',
//                 // right: 'month,agendaWeek,agendaDay,listWeek'
//                 right: 'month,agendaDay'
//             },
//             // weekends: false,
//             editable: true,
//             eventLimit: true, // allow "more" link when too many evnts
//             navLinks: true,
//             events: events
//         }); // end calendar

// });

function countProfiles(){
    for (let i = 0; i < profiles.length; i++) {
        const profile = profiles[i];
        console.log('profile --' + profile + ' - ' + i);
    }
}