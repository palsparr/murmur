var http = require('http');
var url = require('url');

var responseJSONObject = {};
var responseArray = [];

var server = createServer(function(request, response) {
    
    var parsedRequest = url.parse(request.url, true);
    
    switch(parsedRequest) {
        case search:
            
            break;
        case create:
            
            break;
        case follow:
            
            break;
        case sendMSG:
            
            break;
        case getPreviousMsgs:
            
            break;
        case getFollowed:
            
            break;
        case getTop:
            
            break;
        default:
                    
            
    };
    
    
});

function searchTopics(keyword) {
    
}
function createTopic(topicID) {
    
}
function followTopic(topicID) {

}
function sendMessage(message, topicID) {
    
}
function getPreviousMsgs(topicID) {
    
}
function getFollowedTopics(user) {
    
}
fuction getTopTopics() {
    
}