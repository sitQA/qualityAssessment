'use strict';
var logger = require('morgan');
var Situation = require('./modules/qualityAssessment/situation').Situation;

var amqpConsumer = require('./modules/messaging/amqpConsumer');
var amqpProducer = require('./modules/messaging/amqpProducer');
var QualityEstimator = require('./modules/qualityAssessment/QualityEstimator');

var handleMsg = function(msg, publish) {
    console.log("received situation msg");
    try{
        let situation = new Situation(JSON.parse(msg.content));
        situation.quality = QualityEstimator.calcQuality(situation);
        console.log("situation quality: " + situation.quality + " id: " + situation.id);
        publish(new Buffer(JSON.stringify(situation)), situation.id);
    } catch(e) {
        console.log(e);
    }
};

var start = function(callback) {
    amqpProducer.connect((publish) => {
        amqpConsumer.listen(callback, msg => {
            handleMsg(msg, publish);
        });
    });
};

module.exports = {
    start: start
};



