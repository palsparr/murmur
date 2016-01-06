var http = require('http');
var url = require('url');

var responseJSONObject = {};
var responseArray = [];
var messageArray = [];

var server = http.createServer(function(request, response) {
    
    var parsedRequest = url.parse(request.url, true);
    
    switch(parsedRequest.pathname) {
        case "/search":
            
            break;
        case "/create":
            
            break;
        case "/follow":
            
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
        case "/getFollowed":
            
            break;
        case "/getTop":
            
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