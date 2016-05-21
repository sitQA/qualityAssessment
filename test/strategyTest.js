'use strict';
var chai = require('chai')
    , expect = chai.expect
    , should = chai.should();
let WeightedAvgStrategy = require('../modules/qualityAssessment/strategies').weightedAvg;

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

    });



});