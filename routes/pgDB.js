var pg = require('pg');
var conString = "postgres://postgres:tanayFT@localhost:5432/myDB";
 
//this initializes a connection pool 
//it will keep idle connections open for a (configurable) 30 seconds 
//and set a limit of 20 (also configurable) 

//var rows = [{"name":"Tanay with deepto","id":"0019000001Ya9Nb","name2":"Tanay with deepto"},{"name":"Tanay Now","id":"0019000001YZ5w","name3":"Tanay with deepto"}];

var executeQueryPG = function(response) {
 console.log('herrrr'+response);

	var buildStatement = function(rows) {
	  
	  var params = []
	  var chunks = []
	  
	  
		
		var myJson = JSON.stringify(rows);
						 
			var jsonObj = JSON.parse(myJson);
			//routesMoon(jsonObj)    
		 
		 for (var i=0; i<jsonObj.length; i++){
		// here jsonObject['sync_contact_list'][i] is your current "bit"
		
			//jsonObj[i]["name"];
			//console.log('Tana'+jsonObj[i]["name"]);
			
		var row = jsonObj[i]
		var valueClause = []
		
		params.push(row.name)
		valueClause.push('$' + params.length)
		params.push(row.id)
		valueClause.push('$' + params.length)
		chunks.push('(' + valueClause.join(', ') + ')')
	  }
		  return {
			text: 'INSERT INTO "Accounts"("Name", "SFDC ID") VALUES ' + chunks.join(', '),
			values: params
		  } 
	}  
	/*	 
	 { text: 'INSERT INTO "Accounts"("Name", "SFDC ID") VALUES ($1, $2), ($3, $4)',
  values:
   [ 'Tanay with deepto',
     '0019000001Ya9NbAAJ',
     'Tanay Now',
     '0019000001YZe5wAAD' ] }*/
  
  
  
  
  
 


	pg.connect(conString, function(err, client, done) {
	  if(err) {
		return console.error('error fetching client from pool', err);
	  }
	  client.query('SELECT * FROM "Accounts"', function(err, result) {
		//call `done()` to release the client back to the pool 
		
		
		
		
		
		done();
		
		if(err) {
		  return console.error('error running query', err);
		}
		//console.log(result.rows[1]);
		//output: 1 
	  });
	  //var qryString = buildStatement(rows);
	 // console.log(qryString);
	  client.query(buildStatement(response));
	  
	});
}
module.exports = executeQueryPG;