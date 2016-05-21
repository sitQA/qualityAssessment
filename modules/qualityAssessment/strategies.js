'use strict';

class AssessmentStrategy {

    constructor() {

    }

    getQuality(situation) {
        throw "not implemented";
    }

}

class NoOpStrategy extends AssessmentStrategy {

    getQuality(situation) {
        return 1;
    }
}

/**
 * Calculates averages.
 * Uses artihmetic mean if no weights are specified.
 */
class WeightedAverageStrategy extends AssessmentStrategy {

    // TODO: allow options to use max, min, all, only trues, ...
    constructor(weights) {
        super();
        this.weights = weights || {};
    }

    getQuality(situation) {
        let sum = 0;
        situation.children.items.forEach(item => {
            console.log(item);
            sum += item.context.quality;
        });
        let quality = sum / situation.children.items.length;
        return quality;
    }

}

module.exports = {
    'noOp': NoOpStrategy,
    'weightedAvg': WeightedAverageStrategy
};


