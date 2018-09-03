var request = require('request');
var fs = require('fs');
var secrets = require('./secrets');
var token = secrets['GITHUB_TOKEN'];

function getRepoContributors(cb) {
    var repoOwner = process.argv[2];
    var repoName = process.argv[3];
    var inputArr = process.argv.slice(2);
    
    //check if user input 2 parameters
    if(inputArr.length === 2 ){
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
          'User-Agent': 'fei-gao',
          'Authorization': token
        }
      };
    
      //body is JSON string
      request(options, function(err, res, body) {
        var obj = JSON.parse(body);
        cb(err, obj);
      });
    } else {
        console.log("You put " + inputArr.length + ` parameters.
        The right format looks like: node download_avatars.js <owner> <repo>`);
    }
}
  
function downloadImageByURL(url, filePath){
    request.get(url)
    .on('error', function(err){
        throw err;
    })

    .pipe(fs.createWriteStream(filePath));
}

//cb loops through each item in the array:
//It constructs a file path using the login value (e.g., "avatars/dhh.jpg")
//It then passes the avatar_url value and the file path to downloadImageByURL
getRepoContributors(function(err, result) {
    console.log("Errors:", err);
    // console.log("Result:", result);
    var keys = Object.keys(result);
    for(var i = 0; i < keys.length; i++){
        var url = result[keys[i]]['avatar_url'];
        var name = result[keys[i]]['login'];
        var filePath = `avatars/${name}.jpg`.toString();
        
        downloadImageByURL(url, filePath);
    }
});