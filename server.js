var http = require("http");
var url = require("url");
var path = require("path");
var filesys = require("fs");
var mongodb = require("mongodb");
var mongoserver = mongodb.MongoServer("localhost", 27017);
var db_connector = mongodb.MongoClient("tweeter", 27017);


db_connector.connect("mongodb://localhost:27017/tweeter" function(err, db){
	if(err) throw err;
	else console.log("Connected to MongoDB.");
}
function save(msg, callback){
	var twits = db.collection("twits");
	twits.insert({message:msg, read:false}, {safe: true}, function(err, newTwits){
		if(err) throw err;
		else console.log(newTwits[0]._message+" inserted as "newTwits[0]._id);
	});
}

function flag(response, ID, callback){
	//set read flag of ID to true, set success to true. If ID doesn't exist, set success to false
	callback(success);
}

function getAll(callback){
	//get all messages from db, create JSON, store in data
	callback(data);
}

http.createServer(function(request, response) {

	var my_url = url.parse(request.url, true);
	var my_path = my_url.pathname;
	switch(my_path){
	case "save":
		save(my_url.query.message, function(success, error){
			if(success){
				response.writeHeader(200);
				response.end();
			}else{
				response.writeHeader(400,{"Content-Type":"text/plain"});
				response.write(error);
				response.end();
			}
		});
	break;
	
	case "flag":
		flag(my_url.query.ID, function(success){
			if(success){
				response.writeHeader(200);
				response.end();
			}else{
				response.writeHeader(400,{"Content-Type":"text/plain"});
				response.write("Message does not exist.");
				response.end();
			}
		});
	break;
	
	case "getall":
		getAll(function(data){
			response.writeHead(200, {"Content-Type": "application/json"});
			response.write(JSON.stringify(data));
			response.end;
		});
	break;

	default:
		response.writeHeader(404,{"Content-Type":"text/plain"});
		response.write("This page seems to be lost in time and space.\n");
		response.end();
	break;





		else{
			filesys.readFile(full_path,"binary",function(err,file){
				if(err){
					response.writeHeader(500,{"Content-Type":"text/plain"});
					response.write(err + "\n");
					response.end();
				}
				else{
					response.writeHeader(200);
					response.write(file, "binary");
					response.end();
				}
			});
		}
	});
}).listen(25567);