'use strict';
var amqp = require('amqplib/callback_api');
var conf = require('../configuration/conf');


/**
 *
 * @param onConnect callback to be invoked when the connection has been established
 * @param onMsgReceived callback to be invoked with a msg object when a message has been received
 */
let listen = function(onConnect, onMsgReceived) {
    amqp.connect(conf.get('amqp.url'), function(err, conn) {
        onConnect();
        conn.createChannel(function(err, ch) {

            var q = conf.get('amqp.sitQueue');
            ch.assertQueue(q, {durable: true});

            ch.consume(q, msg => {
                onMsgReceived(msg);
                ch.ack(msg);
            }, {noAck: false});

        });
    });
};

module.exports = {
    listen: listen
};

