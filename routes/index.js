var express = require('express');
var router = express.Router();

var Promise = require("bluebird");

var bodyParser = require('body-parser');

 

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var nforce = require('nforce');
var org = require('../lib_connection/sfdc_connection');
var routesMoon = require('./moongse');
var routesPG = require('./pgDB');
    
/* home page. */
router.get('/', function(req, res, next) {
  org.getSObjects()
    .then(function(results){
	  res.render('index', { records: results.sobjects });
       
    });	
});

router.get('/sobject/:objname', function(req, res, next) {
console.log('soooo: '+JSON.stringify(req.params.objname));
 org.getDescribe({ type: req.params.objname})
    .then(function(results){     
	  res.render('sobjectdetails', { fields: results.fields,objectName:JSON.stringify(req.params.objname)});
       //res.end( JSON.stringify(results.fields ));
    });
	
});


router.get('/executequery', function(req, res, next) {
  org.query({ query: req.query.soql_query  })
    .then(function(results){
      
	 console.log('results.records: '+results.records);
	   routesPG(results.records);
	   
	   	var myJson = JSON.stringify(results.records );
		var jsonObj = JSON.parse(myJson);
		console.log('jsonObj: '+jsonObj);
		routesMoon(jsonObj)
       res.send( 'sobjectdetails',{queryresults: results.records});
    });

});

 
 

 

module.exports = router;

 