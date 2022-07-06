const redis = require('redis');

const client = redis.createClient({
    port: 6379,
    host: "127.0.0.1"
})

client.on('connect', () => {
    console.log("Client is connected to redis");
});

client.on('conreadynect', () => {
    console.log("Client is ready to use");
});

client.on('error', (err) => {
    console.log(error.message)
});

client.on('end', (err) => {
    console.log("Client is disconnected from redis");
});

process.o('SIGINT', () => {
    client.quit();
})

module.exports = client;