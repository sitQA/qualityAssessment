'use strict';
var chai = require('chai')
    , expect = chai.expect
    , should = chai.should();

let WeightedAvgStrategy = require('../modules/qualityAssessment/strategies').weightedAvg;
let PessimisticStrategy = require('../modules/qualityAssessment/strategies').pessimistic;

let orSit = require('./testdata').orSit;
let andSit = require('./testdata').andSit;
let xorSit = require('./testdata').xorSit;


describe('WeightedAverageStrategy', () => {

    describe('OR Situation', () => {
        let avgStrategy = new WeightedAvgStrategy(orSit);
        let score = avgStrategy.getQuality();

        it('should calculate quality', () => {
            score.should.be.a('number');
        });

        it('quality should be max of true conditions', () => {
            expect(score).to.equal(0.7);
        });

    });

    describe('AND Situation', () => {
        let avgStrategy = new WeightedAvgStrategy(andSit);
        let score = avgStrategy.getQuality();

        it('should calculate quality', () => {
            score.should.be.a('number');
        });

        it('should be the average of all conditions', ()=> {
            expect(score).to.equal((0.7+0.5)/2);
        });

    });

    describe('XOR Situation', () => {
        let avgStrategy = new WeightedAvgStrategy(xorSit);
        let score = avgStrategy.getQuality();

        it('should calculate quality', () => {
            score.should.be.a('number');
        });

        it('should be the average of all conditions', ()=> {
            expect(score).to.equal((0.5+0.9)/2);
        });

    });

});

describe('PessimisticStrategy', () => {

    describe('OR Situation', () => {
        let pessimisticStrategy = new PessimisticStrategy(orSit);
        let score = pessimisticStrategy.getQuality();

        it('should calculate quality', () => {
            score.should.be.a('number');
        });

        it('quality should be min of true conditions', () => {
            expect(score).to.equal(0.5);
        });

    });

    describe('other Situations', () => {
        let pessimisticStrategyAnd = new PessimisticStrategy(andSit);
        let pessimisticStrategyXor = new PessimisticStrategy(xorSit);
        let scoreAnd = pessimisticStrategyAnd.getQuality();
        let scoreXor = pessimisticStrategyXor.getQuality();

        it('should calculate quality', () => {
            scoreAnd.should.be.a('number');
            scoreXor.should.be.a('number');
        });

        it('should be the minimum of all conditions', ()=> {
            expect(scoreAnd).to.equal(0.5);
            expect(scoreXor).to.equal(0.5);
        });

    });

});