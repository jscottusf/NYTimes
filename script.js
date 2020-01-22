var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+searchTerm+"&api-key=XKzeCKZfebLMl2q4GYfkjLt1rI3G8ofg";
var searchTerm = $("#search-term").attr("data-search-term")    

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);

var fieldName = $("<h1>").text(response.response.docs[0].title);

});