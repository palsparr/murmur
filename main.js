var http = require('http');
var url = require('url');
var pg = require('pg');
var connectionString = "postgres://anonymousgangster:patrik13@localhost:5432/anonymousgangster";
var dbClient = new pg.Client(connectionString);
dbClient.connect();

var responseJSONObject = {};
var responseArray = [];
var messageArray = [];
var resultList = [];


var server = http.createServer(function(request, response) {
    
    var parsedRequest = url.parse(request.url, true);
    
    switch(parsedRequest.pathname) {
        case "/searchTopics":
            var searchKey = parsedRequest.query.key;
            if (searchKey) {
                searchTopics(searchKey);   
            }
            break;
        case "/createTopic":
            var topicID = parsedRequest.query.topicID;
            if (topicID) {
                createTopic(topicID);
            }
            break;
        case "/followTopic":
            
            var topicID = parsedRequest.query.topicID;
            followTopic(topicID);
            
            break;
        case "/sendMSG":
            var message = parsedRequest.query.message;
            var topicID = parsedRequest.query.topicID;
            if (message) {
                if (topicID) {
                    sendMessage(message, topicID);
                }
            }
            getPreviousMsgs(topicID);
            
            //sendMessage(message, 1);
            
            break;
        case "/getPreviousMsgs":
            getPreviousMsgs(parsedRequest.query.topicID);
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
                    
    function searchTopics(keyword) {
        resultList = [];
        console.log(keyword);
        var query = dbClient.query('SELECT * FROM topics WHERE to_tsvector(id) @@ plainto_tsquery(' + "'" + keyword + "'" + ')');
        console.log('SELECT * FROM topics WHERE to_tsvector(id) @@ plainto_tsquery(' + "'" + keyword + "'" + ');'
                query.on('row', function(row) {
                    var topic = {};
                    topic.id = row.id;
                    topic.followers = row.followers;
                    resultList.push(topic);
                    
                });
                query.on('end', function() {
                    responseArray = resultList;
                    responseJSONObject.searchResults = responseArray;
                    response.writeHead(200, {"Content-Type": "text"});
                    responseJSONObject.code = 200;
                    responseJSONObject.request = parsedRequest.pathname;
                    response.write(JSON.stringify(responseJSONObject));
                    response.end();                    
                });
        
    }
    function createTopic(topicID) {
        var query = dbClient.query('CREATE TABLE IF NOT EXISTS topics (id TEXT, followers INTEGER)');
                query = dbClient.query('INSERT INTO topics (id, followers) VALUES (' + "'" + topicID + "'" + ', ' + 1 + ')');
                query.on('row', function(row) {
                    console.log(row.id + ' ' + row.followers); 
                });
                query = dbClient.query('CREATE TABLE IF NOT EXISTS ' + topicID + ' (messages TEXT)');
                
                response.writeHead(200, {"Content-Type": "text"});
                response.write("hej");
                response.end();

    }
    function followTopic(topicID) {
        var followers = 0;
        var query = dbClient.query('SELECT followers FROM topics WHERE id = ' + "'" + topicID + "'");
            console.log('SELECT followers FROM topics WHERE id = ' + "'" + topicID + "'");
            query.on('row', function(row) {
                followers = row.followers + 1;
                console.log(followers);
                query = dbClient.query('UPDATE topics SET followers = ' + followers + ' WHERE id = ' + "'" + topicID + "'");
            });
            getPreviousMsgs(topicID);
    }
    function sendMessage(message, topicID) {
        var query = dbClient.query('INSERT INTO ' + topicID  + ' (messages) VALUES (' + "'" + message + "'" + ')');
        console.log(topicID);
    }
    function getPreviousMsgs(topicID) {
        query = dbClient.query('SELECT * FROM ' + topicID);
                query.on('row', function(row) {
                    messageArray.push(row.messages); 
                    console.log('kommer hit');
                    console.log(row.messages);
                });
        query.on('end', function() { 
                    responseJSONObject.messages = messageArray;
                    response.writeHead(200, {"Content-Type": "text"});
                    responseJSONObject.code = 200;
                    responseJSONObject.request = parsedRequest.pathname;
                    response.write(JSON.stringify(responseJSONObject));
                    response.end();
        });
    }
    function getFollowedTopics(user) {

    }
    function getTopTopics() {

    }
    function update(topicID) {
        responseJSONObject.messages = messageArray;
    }   
    
});

server.listen(80);
console.log("Listening... Ya bitch!");

