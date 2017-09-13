$(document).ready(function() {
    var url = "http://localhost:3000/getcup";

    var json = $.getJSON(url, function(data) {
        console.log(data);
    });
});