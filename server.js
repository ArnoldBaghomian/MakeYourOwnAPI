'use strict';

var math = require('./math.js');

var md5 = require('md5') 

var http = require('http');

var server = http.createServer(function(req, res){
	var urlParts = req.url.match(/[^/]+/g);
	
	switch(urlParts[0]){
		case 'time':
		var timestamp = Date.now();
		res.end(timestamp + '\n'); 
		break; 
		case 'math':
		if(urlParts[1] === 'add'){
			
			var regex = /\d+/g;
			var numbersArray = req.url.match(regex);
			var sum = numbersArray.reduce(function(a,b){
				return parseFloat(a) + parseFloat(b);
			});
			var sumStr = sum.toString();
			res.end(sumStr + '\n');
		}
		else if(urlParts[1] === 'square'){
			var num = urlParts[2];
			var square = num * num; 
			var squareStr = square.toString();
			res.end(squareStr + '\n');
		}
		break;
		case 'sentence':
		var sentence = decodeURI(urlParts[1]);
		console.log(sentence);
		var words = 0;
		var letters=0;
		var spaces =0;
		sentence.split(' ').forEach(function(word){
			words++;
			word.split('').forEach(function(letter){
				letters++;
			})
		});
		spaces = words - 1; 
		res.end('words: '+ words + '  letters: ' + letters + '  spaces: ' + spaces + '\n');
		break;
		case 'gravatar':
		var email = urlParts[1];
		var md5Hash = md5(email);
		var gravatarURL = 'http://www.gravatar.com/avatar/' + md5Hash + '\n';
		res.end(gravatarURL);
		break;
		default:
		res.end('nothing');
	}
});

server.listen(4000);