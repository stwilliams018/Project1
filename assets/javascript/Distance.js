function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

var random = (randomDate(new Date(2012, 0, 1), new Date()));
var randomFormatted = moment(random, "YYYY-MM-DD")
console.log(random);
console.log(randomFormatted)

$( document ).ready(function(){

  var onloadqueryURL = "https://api.nasa.gov/planetary/apod?api_key=bCP9fU9nJWwKOKJTIN3koopL1phM96nMizWD2crF"

  $.ajax({
    url: onloadqueryURL,
    method: "GET"
  }).then(function(responseload) {
    //$("#distance-view").text(JSON.stringify(response));
    console.log(responseload);

    var onloadExp = responseload.explanation;
    var onloadImg = responseload.url;
    var onloadTitle = responseload.title;

    $(".card-header").html("Astronomy Picture of the Day - " + onloadTitle);

    var onloadImgEmbed = $("<img>").attr("src", onloadImg);
    $("#onload-title").prepend(onloadImgEmbed);
    $("#onload-title").prepend(onloadExp);

    

  });


  $("#randomDay").on("click", function(eventRandom){
    eventRandom.preventDefault();

    var randomurlAPOD = "https://api.nasa.gov/planetary/apod?date="+ randomFormatted +"&api_key=bCP9fU9nJWwKOKJTIN3koopL1phM96nMizWD2crF"



    console.log(randomurlAPOD)

    $.ajax({
      url: onloadqueryURL,
      method: "GET"
    }).then(function(responseRandom) {
      console.log(responseRandom);
  
      var randomExp = responserandom.explanation;
      var randomImg = responserandom.url;
      var randomTitle = responserandom.title;
  
      $(".card-header").html("Astronomy Picture of the Day - " + randomTitle);
  
      var randomImgEmbed = $("<img>").attr("src", randomImg);
      $("#onload-title").prepend(randomImgEmbed);
      $("#onload-title").prepend(randomExp);
  });

  })

  $("#find-day").on("click", function(eventSearch){
    eventSearch.preventDefault();

    var searchurlAPOD = "https://api.nasa.gov/planetary/apod?date="+ searchFormatted +"&api_key=bCP9fU9nJWwKOKJTIN3koopL1phM96nMizWD2crF"



    console.log(searchurlAPOD)

    $.ajax({
      url: onloadqueryURL,
      method: "GET"
    }).then(function(responseSearch) {
      console.log(responseRandom);
  
      var searchExp = responseSearch.explanation;
      var searchImg = responseSearch.url;
      var searchTitle = responseSearch.title;
  
      $(".card-header").html("Astronomy Picture of the Day - " + searchTitle);
  
      var searchImgEmbed = $("<img>").attr("src", searchImg);
      $("#onload-title").prepend(searchImgEmbed);
      $("#onload-title").prepend(searchExp);
  });

  })

})