'use strict';

let strategies = require('./strategies');

class QualityEstimator {

    /**
     * @param situation
     */
    static calcQuality(situation) {
        if(situation === undefined || situation.meta === undefined) {
            throw "situation must have QA meta data";
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
}

module.exports = QualityEstimator;