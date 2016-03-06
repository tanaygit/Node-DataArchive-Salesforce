var nforce = require('nforce');

var org = nforce.createConnection({
  clientId: '3MVG9Y6d_Btp4xp7N5rr5cGjYAet.kdrWZ.fJado8sl_n37rOrbOSTTRiE79wWB.ccgEfIf0tJVO0G0n6l3YY',
  clientSecret: '8265554001065018777',
  redirectUri: 'http://localhost:5000/_auth',
  environment: 'production',
  mode: 'single'
});

org.authenticate({ username: 'tanay.barman_smart@gmail.com', password: '596tanay'}, function(err, resp){
  // the oauth object was stored in the connection object
  if(!err) console.log('Successfully connected to Salesforce. Cached token: ' + org.oauth.access_token);
  if(err) console.log('Cannot connect to Salesforce: ' + err);
});

module.exports = org;