var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var express = require('express');
 

var executeQuery = function(response) {
		console.log('XXX: '+response);
				var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };   
				
				
				
 				var mongodbUri = 'mongodb://tanay:59687ass@ds045454.mongolab.com:45454/testwithdoc';
                var mongooseUri = uriUtil.formatMongoose(mongodbUri);
				
				mongoose.connect(mongooseUri, options);

                var db = mongoose.connection;
				
				db.on('error', console.error.bind(console, 'connection error:'));
				
				console.log('connect:'+db);
				
				db.once('open', function callback () {
				
				console.log('In open');
				
				
				var accountSchema = mongoose.Schema({
						AccountName: String
					 
					});	
					
					var accModel = mongoose.model('account_sfdcs', accountSchema);
					/*var document = [{"name":"Tanay with deepto","type":null,"industry":null,"rating":null,"id":"0019000001Ya9NbAAJ"},{"name":"Tanay Now","type":null,"industry":null,"rating":null,"id":"0019000001YZe5wAAD"}]*/
					
					var document = response;
					
  
						//insert record
						accModel.collection.insert(document, function(err, records) {
							if (err) throw err;
							console.log("Record added as "+records );
						});
				
				
					/*var songSchema = mongoose.Schema({
					decade: String,
					artist: String,
					song: String,
					weeksAtOne: Number
				   });
				
					 var Song = mongoose.model('songs', songSchema);
					 
					 //Create seed data
					  var seventies = new Song({
						decade: '1970s',
						artist: 'Debby Boone',
						song: 'You Light Up My Life',
						weeksAtOne: 10
					  });
						seventies.save();
					*/
					
					
					
				/*		
						var accCreate = new accModel({
							AccountName: 'Tanay'
						});
						accCreate.save();
						
						*/
				});
			 
			
	
			 	
}			 

module.exports = executeQuery;