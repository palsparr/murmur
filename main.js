var http = require('http');
var url = require('url');
var pg = require('pg');
var connectionString = "postgres://anonymousgangster:patrik13@localhost:5432/anonymousgangster";
var dbClient = new pg.Client(connectionString);

var responseJSONObject = {};
var responseArray = [];
var messageArray = [];


var server = http.createServer(function(request, response) {
    
    var parsedRequest = url.parse(request.url, true);
    
    switch(parsedRequest.pathname) {
        case "/searchTopics":
            
            break;
        case "/createTopic":
            if (parsedRequest.query.topicID) {
                dbClient.connect();
                var query = dbClient.query('CREATE TABLE IF NOT EXISTS topics (id TEXT, followers INTEGER)');
                query = dbClient.query('INSERT INTO topics (id, followers) VALUES (' + "'" + parsedRequest.query.topicID + "'" + ', ' + 0 + ')');
                query.on('row', function(row) {
                    console.log(row.id + ' ' + row.followers); 
                });
                query = dbClient.query('CREATE TABLE IF NOT EXISTS ' + parsedRequest.query.topicID + ' (messages TEXT)');
                query.on('end', function() { dbClient.end(); });
                response.writeHead(200, {"Content-Type": "text"});
                response.write("hej");
                response.end();
            }
            break;
        case "/followTopic":
            dbClient.connect();
            var followers;
            var query = dbClient.query('SELECT followers FROM topics WHERE id = ' + "'" + 'testernester' + "'");
            query.on('row', function(row) {
                followers = row.followers;
            });
            query = dbClient.query('UPDATE topics SET followers = ' + followers + ' WHERE id = ' +  "'"  + 'testernester' + "'");
            query.on('end', function() { dbClient.end(); });
            break;
        case "/sendMSG":
            var message = parsedRequest.query.message;
            var topicID = parsedRequest.query.topicID;
            if (message) {
                if (topicID) {
                    var query = dbClient.query('INSERT INTO ' + topicID  + ' (messages) VALUES (' + "'" + message + "'" + ')');
                    console.log(topicID);
                }
            }
            query = dbClient.query('SELECT * FROM ' + topicID);
            query.on('row', function(row) {
                messageArray.push(row.messages.toString); 
                console.log(row.messages.toString);
            });
            query.on('end', function() { dbClient.end(); });
            //sendMessage(message, 1);
            responseJSONObject.messages = messageArray;
            response.writeHead(200, {"Content-Type": "text"});
            responseJSONObject.code = 200;
            responseJSONObject.request = parsedRequest.pathname;
            response.write(JSON.stringify(responseJSONObject));
            response.end();
            break;
        case "/getPreviousMsgs":
            
            break;
        case "/getFollowedTopics":
            
            break;
        case "/getTopTopics":
            
            break;
        case "/update":
            update(1);
            response.writeHead(200, {"Content-Type": "text"});
            responseJSONObject.code = 200;
            responseJSONObject.request = parsedRequest.pathname;
            response.write(JSON.stringify(responseJSONObject));
            response.end();
            break;
        default:
                    
            
    };
    
    
});

server.listen(80);
console.log("Listening... Ya bitch!");

function searchTopics(keyword) {
    
}
function createTopic(topicID) {
    
}
function followTopic(topicID) {

}
function sendMessage(message, topicID) {
    messageArray.push(message);
}
function getPreviousMsgs(topicID) {
    
}
function getFollowedTopics(user) {
    
}
function getTopTopics() {
    
}
function update(topicID) {
    responseJSONObject.messages = messageArray;
}