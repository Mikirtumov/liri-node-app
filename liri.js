


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
    message: "Who you want to search?",
    name: "question",
    choices: [
        "Music",
        "Movies",
        "Bands",
      ]
},
    
{
    type: 'input',
    message: "Select Movie Music or Band",
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
       
      console.log(data.tracks.items[0]); 
      console.log("--------------------------------"); 

      console.log(data.tracks.items[0].artists[0].name);
      console.log(data.tracks.items[0].artists[0].external_urls);
      console.log(data.tracks.items[0].album.album_type);

      
      });
      
    
}
function searchMovie(movie){
    
        // console.log(searchText);
        axios.get('http://www.omdbapi.com/?s='+ movie).then((response) => {
          console.log(response);
        }).catch((err) => {
          console.log(err);
        });
      
}
function searchBand(bands){
    console.log("serching band " + bands);
}

