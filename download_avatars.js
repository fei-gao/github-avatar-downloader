var request = require('request');
var secrets = require('./secrets');
var token = secrets['GITHUB_TOKEN'];
var fs = require('fs');

function getRepoContributors(repoOwner, repoName, cb) {
  
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
          'User-Agent': 'request',
          'Authorization': token
        }
      };
    
      //body is JSON string
      request(options, function(err, res, body) {
        var obj = JSON.parse(body);
        cb(err, obj);
      });
  }
  
function downloadImageByURL(url, filePath){
    request.get(url)
    .on('error', function(err){
        throw err;
    })

    .pipe(fs.createWriteStream(filePath))

    .on('finish', function(){
        console.log('write successfully!')
    });

}

//   getRepoContributors("jquery", "jquery", function(err, result) {
//     console.log("Errors:", err);
//     // console.log("Result:", result);
//     var keys = Object.keys(result);
//     for(var i = 0; i < keys.length; i++){
//         console.log(result[keys[i]]['avatar_url']);
//     }
//   });

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./avatars/kvirani.jpg")