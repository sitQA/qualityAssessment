'use strict';
var amqp = require('amqplib/callback_api');
var conf = require('../configuration/conf');

/**
 *
 * @param onConnect callback to be invoked with a publish(Buffer) method as soon as the
 *  connection is ready for sending
 */
let connect = function(onConnect) {
    amqp.connect(conf.get('amqp.url'), function(err, conn) {
        conn.createChannel(function(err, ch) {
            var exchange = conf.get('amqp.sitExchange');
            ch.assertExchange(exchange, 'direct', {durable: false});
            let publish = function(msg, key) {
                ch.publish(exchange, key, new Buffer(msg));
            };
            onConnect(publish);
        });
    });
};


module.exports = {
   connect: connect
};