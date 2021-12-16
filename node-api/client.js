const net = require('net');
//let client = net.connect({port:3000});

/*
client.on('data', (data) => {
    console.log(data.toString());
    client.end();
});
*/
// re-write

const client = net.createConnection({ port : 3000 }, () => {
    // connect listener 
    console.log('connected to server!');
    client.write('./index.html');
});

client.on('data', (data) => {
    console.log(data.toString());
    client.end();
});

client.on('end', () => {
    console.log('disconnected to server!');
});