$(document).ready(function() {
    var url = "http://localhost:3000/getbooks";

    var json = $.getJSON(url, function(data) {
        console.log(data);
    });
});