
  var config = {
    apiKey: "AIzaSyBePHA1VsjdRDmVeLZ50xCvz2zSc29Pblc",
    authDomain: "nasaproject-58c3d.firebaseapp.com",
    databaseURL: "https://nasaproject-58c3d.firebaseio.com",
    projectId: "nasaproject-58c3d",
    storageBucket: "",
    messagingSenderId: "637373643299"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  console.log(database);

$( document ).ready(function(){

  //Dialog Save for DB Push from user input on Survey
  $("#save").on("click", function(eventRandom){
    eventRandom.preventDefault();
    alert("Submitted");

    var firstName = $("#fn-input").val().trim();
    var lastName = $("#ln-input").val().trim();
    var location = $("#location-input").val().trim();
    var email = $("#email-input").val().trim();
    var bestAPOD = $("#apod-input").val().trim();
    var bestEPIC = $("#epic-input").val().trim();
    var surveyComments = $("#comments-input").val().trim();

    console.log(firstName);
    console.log(lastName);
    console.log(location)
    console.log(email);
    console.log(bestAPOD);
    console.log(bestEPIC);
    console.log(surveyComments);

    var newSurvey = {
      firstname : firstName,
      lastname : lastName,
      location : location,
      email : email,
      bestapod : bestAPOD,
      bestepic : bestEPIC,
      comments : surveyComments,
    };
    database.ref().push(newSurvey);
    alert("Added to DB");
  })

  //Data Pull from Firebase to Survey results page
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var firstName = childSnapshot.val().firstname;
    var lastName = childSnapshot.val().lastname;
    var location = childSnapshot.val().location;
    var bestapod = childSnapshot.val().bestapod;
    var bestepic = childSnapshot.val().bestepic;
    
    console.log(firstName);
    console.log(lastName);
    console.log(location);
    console.log(bestapod);
    console.log(bestepic);

    var newRow = $("<tr>").append(
      $("<td>").text(firstName),
      $("<td>").text(lastName),
      $("<td>").text(location),
      $("<td>").text(bestapod),
      $("<td>").text(bestepic),
    );

    $("#survey-table > tbody").append(newRow)
  })

  // onload JSON call to load current days APOD from NASA API
  var onloadqueryURL = "https://api.nasa.gov/planetary/apod?api_key=bCP9fU9nJWwKOKJTIN3koopL1phM96nMizWD2crF"

  $.ajax({
    url: onloadqueryURL,
    method: "GET"
  }).then(function(responseload) {
    console.log(responseload);

    var onloadExp = responseload.explanation;
    var onloadImg = responseload.url;
    var onloadTitle = responseload.title;
    var onloadDate = responseload.date

    $(".apodTitle").html("Astronomy Picture of the Day - " + onloadDate);

    var onloadImgEmbed = $("<img>").attr({src : onloadImg, "height" : "full", "width" : "full"});
    $("#onload-header").prepend(onloadTitle);
    $("#onload-body").prepend(onloadImgEmbed);
    $("#onload-exp").prepend(onloadExp);

  });

  //Random Date Selector Function for APOD
  $("#randomDay").on("click", function(eventRandom){
    eventRandom.preventDefault();
    $("#onload-body").empty();
    $("#onload-header").empty();
    $("#onload-exp").empty();

    //function to create random day at button click
    function randomDate(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    
    var random = (randomDate(new Date(2012, 0, 1), new Date()));
    var randomFormatted = moment(random, "YYYY-MM-DD").format('YYYY-MM-DD');
    console.log(random);
    console.log(randomFormatted)

    //JSON call for new APOD based on random day generator
    var randomurlAPOD = "https://api.nasa.gov/planetary/apod?date="+ randomFormatted +"&api_key=bCP9fU9nJWwKOKJTIN3koopL1phM96nMizWD2crF"

    console.log(randomurlAPOD)

    $.ajax({
      url: randomurlAPOD,
      method: "GET"
    }).then(function(responseRandom) {
      console.log(responseRandom);
  
      var randomExp = responseRandom.explanation;
      var randomImg = responseRandom.url;
      var randomTitle = responseRandom.title;
      var randomDate = responseRandom.date;
  
      $(".apodTitle").html("Astronomy Picture of the Day - " + randomDate);
  
      var randomImgEmbed = $("<img>").attr("src", randomImg);
      $("#onload-header").prepend(randomTitle);
      $("#onload-body").prepend(randomImgEmbed);
      $("#onload-exp").prepend(randomExp);
     
  });
   
  })

  //Date Picker Function for APOD
  $("#find-day").on("click", function(eventSearch){
    eventSearch.preventDefault();
    $("#onload-body").empty();
    $("#onload-header").empty();
    $("#onload-exp").empty();

    var searchformatted = moment($("#day-input").val().trim(), "YYYY-MM-DD").format("YYYY-MM-DD");
    console.log (searchformatted);

    var searchurlAPOD = "https://api.nasa.gov/planetary/apod?date="+ searchformatted +"&api_key=bCP9fU9nJWwKOKJTIN3koopL1phM96nMizWD2crF";
    console.log(searchurlAPOD);

    //JSON call for new APOD based on user date picker
    $.ajax({
      url: searchurlAPOD,
      method: "GET"
    }).then(function(responseSearch) {
      console.log(responseSearch);
  
      var searchExp = responseSearch.explanation;
      var searchImg = responseSearch.url;
      var searchTitle = responseSearch.title;
      var searchDate = responseSearch.date;
  
      $(".apodTitle").html("Astronomy Picture of the Day - " + searchDate);
  
      var searchImgEmbed = $("<img>").attr("src", searchImg);
      $("#onload-header").prepend(searchTitle);
      $("#onload-body").prepend(searchImgEmbed);
      $("#onload-exp").prepend(searchExp);
  });

  })
  //Date Picker function for EPIC
  $("#marsfind-day").on("click", function(eventSearchMars){
    eventSearchMars.preventDefault();
    $("#marsbody").empty();

    var searchformatted = moment($("#marsday-input").val().trim(), "YYYY-MM-DD").format("YYYY-MM-DD");
    console.log (searchformatted);
    $(".marsTitle").html("Mars - " + searchformatted);

    var searchurlMars = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" + searchformatted + "&api_key=bCP9fU9nJWwKOKJTIN3koopL1phM96nMizWD2crF";
    console.log(searchurlMars);
  
    //JSON call for new APOD based on user date picker
    $.ajax({
      url: searchurlMars,
      method: "GET"
    }).then(function(responseSearchMars) {
      console.log(responseSearchMars);

      for (var i = 0; i < 4; i++){

      var searchimg = responseSearchMars.photos[i].img_src;
      var searchCamera = responseSearchMars.photos[i].camera.full_name;
      var searchImgEmbed = $("<img>").attr("src", searchimg);
      $("#marsbody").prepend(searchImgEmbed);
      $("#marsbody").prepend(searchCamera);
      }
  });

  })

  //Random Date Selector Function for EPIC
  $("#marsrandomday").on("click", function(eventRandomMars){
    eventRandomMars.preventDefault();
    $("#marsbody").empty();

    //function to create random day at button click
    function randomDate(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    
    var random = (randomDate(new Date(2015, 0, 1), new Date()));
    var randomformatted = moment(random, "YYYY-MM-DD").format('YYYY-MM-DD');
    console.log(random);
    console.log(randomformatted);
    $(".marsTitle").html("Mars Rover - " + randomformatted);

    //JSON call for new APOD based on random day generator
    var randomurlMars = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" + randomformatted + "&api_key=bCP9fU9nJWwKOKJTIN3koopL1phM96nMizWD2crF";

    console.log(randomurlMars)

    $.ajax({
      url: randomurlMars,
      method: "GET"
    }).then(function(responseRandomMars) {
      console.log(responseRandomMars);

      for (var i = 0; i < 4; i++){

        var randomimg = responseRandomMars.photos[i].img_src;
        var randomCamera = responseRandomMars.photos[i].camera.full_name;
        var randomImgEmbed = $("<img>").attr("src", randomimg);
        $("#marsbody").prepend(randomImgEmbed);
        $("#marsbody").prepend(randomCamera);
        }

    });
  });

})