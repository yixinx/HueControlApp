let huejay = require('huejay');
let bridge = require('find-bridge');

let client = new huejay.Client({
	host:'192.168.0.12',
	port:80,
	username:'qheFK7aEy9jwiZXI1gECL9Oe1DRcdReWPeKJiEm2',
	timeout:15000,
});

client.users.get()
  .then(user => {
    console.log('Username:', user.username);
    console.log('Device type:', user.deviceType);
    console.log('Create date:', user.created);
    console.log('Last use date:', user.lastUsed);
  });

client.bridge.isAuthenticated()
  .then(() => {
    console.log('Successful authentication');
  })
  .catch(error => {
    console.log('Could not authenticate');
  });

client.bridge.get()
  .then(bridge => {
    console.log(`Retrieved bridge ${bridge.name}`);
    console.log('  Id:', bridge.id);
    console.log('  Model Id:', bridge.modelId);
    console.log('  Model Name:', bridge.model.name);
  });

module.exports = client;
