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
            dbClient.connect();
            var query = dbClient.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
            query.on('end', function() { client.end(); });
            break;
        case "/followTopic":
            
            break;
        case "/sendMSG":
            var message = parsedRequest.query.message;
            sendMessage(message, 1);
            response.writeHead(200, {"Content-Type": "text"});
            response.write("Message Sent!");
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