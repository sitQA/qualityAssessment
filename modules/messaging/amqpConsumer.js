var amqp = require('amqplib/callback_api');
var conf = require('../configuration/conf');


amqp.connect(conf.get('amqp.url'), function(err, conn) {
    conn.createChannel(function(err, ch) {
        var q = conf.get('amqp.sitQueue');

        ch.assertQueue(q, {durable: true});

        ch.consume(q, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
            //TODO: let other modules register as listeners, invoke listeners when msg received
            ch.ack(msg);
        }, {noAck: false});
    });
});