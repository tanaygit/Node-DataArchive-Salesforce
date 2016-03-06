var hbs = require('hbs');
//var numeral = require('numeral');

// register a helper for template to return field from record
hbs.registerHelper('get', function(record, field) {
			 
  return  record[field];
});

hbs.registerHelper('getRecord', function(record) {
		console.log('in hbs :: '+record);	 
  return  '';
});