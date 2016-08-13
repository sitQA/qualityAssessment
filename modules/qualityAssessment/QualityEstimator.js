'use strict';

const strategies = require('./strategies');
const preprocessors = require('./preprocessors');

class QualityEstimator {

    /**
     * @param situation
     */
    static calcQuality(situation) {
        if(situation === undefined || situation.meta === undefined) {
            throw "situation must have QA meta data";
        }
        try {
            let preprocessor = this._instantiatePreprocessor(situation);
            situation = preprocessor.getSituation();
        } catch(e) {
            console.log("no preprocessor is used");
        }
        let strategy = this._instantiateStrategy(situation);
        return strategy.getQuality();
    }
    
    static _instantiateStrategy(situation) {
        let strategyName = situation.meta.strategy;
        let Strategy = strategies[strategyName];
        if(Strategy === undefined) {
            throw 'no such strategy: ' + strategyName;
        }
        return new Strategy(situation);
    }

    static _instantiatePreprocessor(situation) {
        let processorName = situation.meta.preprocessor;
        let Preprocessor = preprocessors[processorName];
        if(Preprocessor === undefined) {
            throw 'no such preprocessor: ' + processorName;
        }
        return new Preprocessor(situation);
    }
}

module.exports = QualityEstimator;