'use strict';
var chai = require('chai')
    , expect = chai.expect
    , should = chai.should();

let ConfidenceInterval = require('../modules/qualityAssessment/preprocessors').confidenceInterval;

let orSit = require('./testdata').orSit;
let andSit = require('./testdata').andSit;
let xorSit = require('./testdata').xorSit;


let Situation = require('../modules/qualityAssessment/situation').Situation;

let minCondition = {
    name : 'free RAM',
    operator: 'min',
    value: '100',
    context: {
        'value' : 20,
        'quality' : 0.5,
        'timestamp': 876786
    },
    fulfilled: true
};

let equalsCondition = {
    name : 'percent',
    operator: 'equals',
    value: '100',
    range: [0,5000],
    context: {
        'value' : 100,
        'quality' : 0.7,
        'timestamp': 876786
    },
    fulfilled: true
};


describe('ConfidenceIntervalPreprocessor', () => {

    describe('not applicable', () => {

        it('situation should be unchanged due to unsupported operator', () => {
            let equalsSituation = new Situation({
                children: {operation: 'and', items: [equalsCondition]},
                name: 'situationA',
                id: 'situationA',
                timeDetected: new Date()
            });
            let preprocessor = new ConfidenceInterval(equalsSituation);
            let processed = preprocessor.getSituation();
            processed.should.equal(equalsSituation);
        });

        it('situation should be unchanged due to missing range info', () => {
            let missingRangeSituation = new Situation({
                children: {operation: 'and', items: [minCondition]},
                name: 'situationB',
                id: 'situationB',
                timeDetected: new Date()
            });
            let preprocessor = new ConfidenceInterval(missingRangeSituation);
            let processed = preprocessor.getSituation();
            processed.should.equal(missingRangeSituation);
        });

    });

    describe('supported operator', () => {

        let minCondition = {
            name : 'free RAM',
            operator: 'min',
            value: '100',
            context: {
                'value' : 300,
                'quality' : 0.5,
                'timestamp': 876786
            },
            fulfilled: true,
            meta: {}
        };

        it('should increase quality values when far from threshold', () => {
            minCondition.meta.range = [0,500];
            let supportedSituation = new Situation({
                children: {operation: 'and', items: [minCondition]},
                name: 'situationB',
                id: 'situationB',
                timeDetected: new Date()
            });
            let preprocessor = new ConfidenceInterval(supportedSituation);
            let qBefore = supportedSituation.children.items[0].context.quality;
            let processed = preprocessor.getSituation();
            let qAfter = processed.children.items[0].context.quality;
            expect(qAfter > qBefore).to.be.true;
        });

        it('should decrease quality values when close to threshold', () => {
            minCondition.meta.range = [0,500];
            minCondition.context.value = 101;
            minCondition.context.quality = 0.5;

            let supportedSituation = new Situation({
                children: {operation: 'and', items: [minCondition]},
                name: 'situationB',
                id: 'situationB',
                timeDetected: new Date()
            });
            let preprocessor = new ConfidenceInterval(supportedSituation);
            let qBefore = supportedSituation.children.items[0].context.quality;
            let processed = preprocessor.getSituation();
            let qAfter = processed.children.items[0].context.quality;
            expect(qAfter < qBefore).to.be.true;
        });

    });
    
});