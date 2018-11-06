var mk = "";
var mkArray = ["mk-ok","mk-d","mk-m","mk-mo","mk-im","mk-sp","mk-rf","mk-un","mk-am","mk-co","mk-jc","mk-ab","mk-p","mk-in","mk-imp","mk-s","mk-rm","mk-x","mk-xo"];
var data = [];
// var demoData = [ {tooth: "28", details: {top: "", left: "", center: "co", right: "", bottom: ""}, }, {tooth: "16", details: {top: "co", left: "", center: "", right: "", bottom: ""}, } ];
jQuery(function(){
    $('.legend ul li').addClass("ui-widget-content");
    $('#condition').selectable({
        stop: function(){
            $(".ui-selected", this).each(function(){
                var index = $("#condition li").index(this);
                var name = $(this).attr('id');
                console.log('selected index: ' + index + " mk-class: " + name);
                mk = name;
            });
        }});
    $('#restoration').selectable({
        stop: function(){
            $(".ui-selected", this).each(function(){
                var index = $("#restoration li").index(this);
                var name = $(this).attr('id');
                console.log('selected index: ' + index + " mk-class: " + name);
                mk = name;
            });
        }});
    $('#surgery').selectable({
        stop: function(){
            $(".ui-selected", this).each(function(){
                var index = $("#surgery li").index(this);
                var name = $(this).attr('id');
                console.log('selected index: ' + index + " mk-class: " + name);
                mk = name;
            });
        }});
/*-------ON CLICK EVENT FOR THE TOOTH--------------*/
/*-------------------------------------------------*/
    $(".tooth").children().each( function(){
    $(this).on('click', () => {
        $(this).toggleClass(mk);
        clearPreviousClasses($(this));
        addDetails($(this));
        });
     });
    // clear selectable
    $('.btn-clear').click(() => {
    console.log('clicked btn-clear');
    $('#condition .ui-selected').removeClass('ui-selected' + ' ' + mk);
    $('#restoration .ui-selected').removeClass('ui-selected' + ' ' + mk);
    $('#surgery .ui-selected').removeClass('ui-selected' + ' ' + mk);
});
    // reset teeth marks
    $('.btn-reset').click(() => {
    console.log('clicked btn-reset');
    $(".tooth").children().each( function(){
        for (var i = mkArray.length - 1; i >= 0; i--) {
            $(this).removeClass(mkArray[i]);

        }
    });
    mk = "";
});

    // save button
    $('.btn-save').click(() => {
        html2canvas($('.chart')[0]).then(function(canvas){
            var url = canvas.toDataURL('image/png');
            var el = "<a href='"+ canvas.toDataURL('image/png') +"' target='_blank'>Download file.</a>";
            canvas.toBlob(function(blob){
            saveAs(blob, "dental-chart.png");
            // console.log(blob);
            });

        });
     });
/*----------  ON LOAD --------------*/
$(document).ready(() => {
    $(".top-container").prepend("<span class='details'>&nbsp;</span>");
    $(".bottom-container").append("<span  class='details'>&nbsp;</span>");
    // if(mkData) {
    //     data = mkData;
    // }
    loadDentalData();
 });


}); // END JQUERY FUNCTION

/*----------------------------------------*
 *              FUNCTIONS                 *
 *----------------------------------------*/
//

function clearPreviousClasses( el ) {

        for (var i = mkArray.length - 1; i >= 0; i--) {
            if(mkArray[i] !== mk) {
                el.removeClass(mkArray[i]);
            }
        }
}

function loadDentalData(){
    for (var i = data.length - 1; i >= 0; i--) {
        var number = data[i]['tooth'];
        var details = data[i]['details'];
        $("#tooth-" + number + " .tooth .top").addClass('mk-' + details['top']);
        $("#tooth-" + number + " .tooth .left").addClass('mk-' + details['left']);
        $("#tooth-" + number + " .tooth .center").addClass('mk-' + details['center']);
        $("#tooth-" + number + " .tooth .right").addClass('mk-' + details['right']);
        $("#tooth-" + number + " .tooth .bottom").addClass('mk-' + details['bottom']);
        // add details text
        var tooth_details = $('#tooth-' + number + ' .details').text();
        tooth_details += details['top'] + ' ' +
                            details['left'] + ' ' +
                            details['center'] + ' ' +
                            details['right'] + ' ' +
                            details['bottom'];


        $('#tooth-' + number + ' .details').text(tooth_details);
}
    }

// add details to corresponding table cell
function addDetails( el ) {
    var details = mk.substr(3);
    var number = el.parent().parent().attr('id').substr(6);
    var info = el.parent().parent().children('.details').text();
    if ( info.indexOf(details)> -1 ) {
        // nothing to do if already in text
    } else {
        info += '\n' + details;
    }
    el.parent().parent().children(".details").text(info);
    console.log('details: ' + details + ' / number: ' + number);
    var pos = el.attr("class").split(" ", 1);
    console.log("pos: " + pos);
    var top = "", left = "", center = "", right = "", bottom = "";
    // put data into corresponding position
    switch (pos[0]) {
        case "top":
            top = details;
            break;
        case "left":
            left = details;
            break;
        case "center":
            center = details;
            break;
        case "right":
            right = details;
        case "bottom":
            bottom = details;
            break;
        default:
            // statements_def
            break;
        }

    // save as object
    var mark = {
        "tooth": number,
        "details": {
            "top":    top,
            "left":   left,
            "center":  center,
            "right":  right,
            "bottom":  bottom,
        },
    };
        if(details != '') {
        data.push(mark);
    }
    // for debugging
    console.log('current mark: ' + mark);
}














