'use strict';

let strategies = require('./strategies');

class QualityEstimator {

    /**
     * @param situation
     */
    calcQuality(situation) {
        let strategyName = situation.meta.strategy;
        let strategy = this.resolveStrategy(strategyName);
        console.log(strategy);
        return strategy.getQuality(situation);
        
    }
    
    resolveStrategy(strategyName) {
        let s = strategies[strategyName];
        if(s === null) {
            throw 'no such strategy: ' + strategyName;
        }
        return new s();
    }
}

module.exports = QualityEstimator;