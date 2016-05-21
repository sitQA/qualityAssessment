'use strict';
var chai = require('chai')
    , expect = chai.expect
    , should = chai.should();

var amqp = require('amqplib/callback_api');
var conf = require('../modules/configuration/conf');
var situation = require('./testdata').andSit;

situation.meta.strategy = "weightedAvg";
var msg = new Buffer(JSON.stringify(situation));


describe('AMQP Integration', () => {
   var app, consumedSituation;

    before((done) => {
        app = require('../app');

        app.start(() => {
            amqp.connect(conf.get('amqp.url'), function(err, conn) {
                conn.createChannel(function(err, ch) {
                    var q = conf.get('amqp.sitQueue');
                    var ex = conf.get('amqp.sitExchange');

                    ch.assertQueue(q, {durable: true}); // for sending raw situation input
                    ch.assertExchange(ex, 'fanout', {durable: false}); // for reading annotated situation output

                    ch.assertQueue('', {exclusive: true}, function(err, qu) {
                        ch.bindQueue(qu.queue, ex, '');

                        ch.consume(qu.queue, function(msg) {
                            consumedSituation = JSON.parse(msg.content);
                            done();
                        }, {noAck: true});

                        // send situation input when subscriber is set up
                        // when sent earlier, the annotated situation msg is discarded by the amqp exchange
                        ch.sendToQueue(q, msg, {persistent: true});
                    });
                });
            });
        });


    });

    it('should have published situation with quality annotation', (done) => {
        expect(consumedSituation).to.have.property('quality');
        done();
    });

});