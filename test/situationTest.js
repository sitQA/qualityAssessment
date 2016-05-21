'use strict';
var chai = require('chai')
    , expect = chai.expect
    , should = chai.should();

var Situation = require('../modules/qualityAssessment/situation').Situation;
var QualityEstimator = require('../modules/qualityAssessment/controller');


let condition1 = {
    name : '% CPU load',
    operator: '>',
    value: '30', // can have multiple values ("between", "avg")
    context: {
        'cpuLoad' : 40,
        'quality' : 0.7,
        'timestamp': 876786
    },
    fulfilled: true
};

let condition2 = {
    name : 'free RAM',
    operator: '<=',
    value: '30',
    context: {
        'freeMem' : 40,
        'quality' : 0.65,
        'timestamp': 876786
    },
    fulfilled: true
};


let exampleSituation = {
    id : 'machineFailed',
    timeDetected : new Date().getTime(),
    children : {
        operation: 'OR',
        items: [
            condition1,
            condition2
            // may have nested situations
        ]
    },
    meta: {
        strategy: 'weightedAvg' //'noOp'
    }
};


let situation = new Situation(exampleSituation);

describe('Situation', () => {

    it('should take a json object for initialization', () => {
        expect(situation.id).to.equal(exampleSituation.id);
        expect(situation.meta).to.equal(exampleSituation.meta);
        expect(situation.children.items.length).to.equal(exampleSituation.children.items.length);
    });

    it('should convert timestamps to date objects', () => {
        situation.timeDetected.should.be.a('date');
    });
});
