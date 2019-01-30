
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
    //$("#distance-view").text(JSON.stringify(response));
    console.log(responseload);

    var onloadExp = responseload.explanation;
    var onloadImg = responseload.url;
    var onloadTitle = responseload.title;
    var onloadDate = responseload.date

    $(".aopdTitle").html("Astronomy Picture of the Day - " + onloadTitle + "  " + onloadDate);

    var onloadImgEmbed = $("<img>").attr("src", onloadImg);
    $("#onload-title").prepend(onloadImgEmbed);
    $("#onload-title").prepend(onloadExp);

  });

  //Random Date Selector Function for APOD
  $("#randomDay").on("click", function(eventRandom){
    eventRandom.preventDefault();

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
  
      $(".card-header").html("Astronomy Picture of the Day - " + randomTitle + "  " + randomDate);
  
      var randomImgEmbed = $("<img>").attr("src", randomImg);
      $("#onload-title").prepend(randomImgEmbed);
      $("#onload-title").prepend(randomExp);
     
  });
   
  })

  //Date Picker Function for APOD
  $("#find-day").on("click", function(eventSearch){
    eventSearch.preventDefault();

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
  
      $(".card-header").html("Astronomy Picture of the Day - " + searchTitle);
  
      var searchImgEmbed = $("<img>").attr("src", searchImg);
      $("#onload-title").prepend(searchImgEmbed);
      $("#onload-title").prepend(searchExp);
  });

  })
  //Date Picker function for EPIC
  $("#epicfind-day").on("click", function(eventSearch){
    eventSearch.preventDefault();

    var searchformatted = moment($("#epicday-input").val().trim(), "YYYY-MM-DD").format("YYYY-MM-DD");
    console.log (searchformatted);

    var searchurlEPIC = "https://api.nasa.gov/EPIC/api/natural/date/"+ searchformatted + "?api_key=bCP9fU9nJWwKOKJTIN3koopL1phM96nMizWD2crF";
    console.log(searchurlEPIC);

    //JSON call for new APOD based on user date picker
    $.ajax({
      url: searchurlEPIC,
      method: "GET"
    }).then(function(responseSearchEPIC) {
      console.log(responseSearchEPIC);
  
  });

  })

  //Random Date Selector Function for EPIC
  $("#epicrandomday").on("click", function(eventRandomEPIC){
    eventRandomEPIC.preventDefault();

    //function to create random day at button click
    function randomDate(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    
    var random = (randomDate(new Date(2012, 0, 1), new Date()));
    var randomFormatted = moment(random, "YYYY-MM-DD").format('YYYY-MM-DD');
    console.log(random);
    console.log(randomFormatted)

    //JSON call for new APOD based on random day generator
    var randomurlEPIC = "https://api.nasa.gov/planetary/apod?date="+ randomFormatted +"&api_key=bCP9fU9nJWwKOKJTIN3koopL1phM96nMizWD2crF"

    console.log(randomurlEPIC)

    $.ajax({
      url: randomurlEPIC,
      method: "GET"
    }).then(function(responseRandomEPIC) {
      console.log(responseRandomEPIC);
    });
  });

})