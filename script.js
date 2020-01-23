var searchTerm;
var recordsNum;
var startYear = "";
var endYear = "";
var startYearURL;
var yearURL = "";

function searchNYT() {
    var queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + searchTerm + yearURL + '&api-key=mxs1ONjEPGyI9ZQwUnKJ0uccr2Lwh3qt';
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(response.response.docs);
        
        for (var i = 0; i < recordsNum; i++) {
            var NewsDiv = $('<div class="news"></div>');
            $('#articles').prepend(NewsDiv);
            var storyLink = $('<a class="text-dark" href="' + response.response.docs[i].web_url + '" target="_blank"><h4>' + response.response.docs[i].headline.main +'</h4></a>');
            var storyDiv = $('<div>' + response.response.docs[i].abstract + '</div>');
            var authorDiv = $('<div>' + response.response.docs[i].byline.original + '</div>');
            var dateDiv = $('<div><b>Publish date: </b>' + response.response.docs[i].pub_date + '</div>');
            $(NewsDiv).append(storyLink, authorDiv, storyDiv, dateDiv);
        }
    }); 
}

function addYearURL() {
    if ((startYear === "") && (endYear === "")) {
       yearURL = "";
    }
    else if (endYear === "") {
       yearURL = '&facet_fields=source&facet=true&begin_date=' + startYear + '0101';
    }

    else if (startYear === "") {
        yearURL = '&facet_fields=source&facet=true&end_date=' + endYear + '1231';
    }

    else {
        yearURL = '&facet_fields=source&facet=true&begin_date=' + startYear + '0101' + '&end_date=' + endYear + '1231';
    }
}

$("body").on("keyup", ".form-control", function(event) {
        if (event.keyCode === 13) {
        $("#search").click();
    }
});

$("#search").on("click", function(event) {
    event.preventDefault();
    searchTerm = $("#search-term").val().trim();
    recordsNum = parseInt($("#records").val());
    startYear = $("#start-year").val().trim();
    endYear = $("#end-year").val().trim();
    addYearURL();
    searchNYT();
});

$("#clear").on("click", function(event) {
$(".news").remove();
});