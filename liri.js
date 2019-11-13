


require("dotenv").config();
var keys = require("./keys.js");
var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");





var spotify = new Spotify(keys.spotify);




var questions =[
{
    type: 'list',
    message: "Select Movie Music or Band",
    name: "question",
    choices: [
        "Music",
        "Movie",
        "Band",
      ]
},
    
{
    type: 'input',
    message: "Who you want to search?",
    name: "userChoice",

    

}

];
inquirer.prompt(questions).then(answers => {
    console.log(answers.question);
    console.log(answers.userChoice);
 
    switch(answers.question){
        case "Band":
            searchBand(answers.userChoice);
            break;
        case "Music":
            searchMusic(answers.userChoice);
            break;
        case "Movie":
            searchMovie(answers.userChoice);
            break;
}

});






function searchMusic(music){
    spotify.search({ type: 'track', query: music, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      

      console.log(data.tracks.items[0].artists[0].name);
      console.log(data.tracks.items[0].artists[0].external_urls);
      console.log(data.tracks.items[0].name);
      console.log(data.tracks.items[0].album.name);

      
      });
      
    
}
function searchMovie(movie){
    
        axios.get('http://www.omdbapi.com/?t=' + movie +'&apikey=trilogy')
.then(
    function(response) {
      // console.log(response.data);
      console.log(response.data.Year);
      console.log(response.data.Ratings[0].Value);
      console.log(response.data.Country);
      console.log(response.data.Language);
      console.log(response.data.Plot);
      console.log(response.data.Actors);
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
      
}
function searchBand(band){

  axios.get('https://rest.bandsintown.com/artists/' + band +'/events?app_id=codingbootcamp')
  .then(
      function(response) {
        
        console.log(response.data[0].venue.name);
        console.log(response.data[0].venue.country);
        console.log(response.data[0].venue.region);
        console.log(response.data[0].venue.city);
        console.log(response.data[0].datetime);
       

    
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
        
  }



































    