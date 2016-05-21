var amqp = require('amqplib/callback_api');
var conf = require('../configuration/conf');

amqp.connect(conf.get('amqp.url'), function(err, conn) {
    conn.createChannel(function(err, ch) {
        var q = conf.get('amqp.sitQueue');

        ch.assertQueue(q, {durable: true});
        ch.sendToQueue(q, new Buffer('Hello World!'), {persistent: true});
        console.log(" [x] Sent 'Hello World!'");
    });
});