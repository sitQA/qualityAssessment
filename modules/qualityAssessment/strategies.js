'use strict';

class AssessmentStrategy {

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
    constructor(situation, weights) {
        super();
        this.situation = situation;
        this.weights = weights || {};
    }

    /**
     * Calculates the quality by averaging all conditions of a situation which have evaluated to true.
     * When the operation is XOR or AND, then all conditions have to be taken into account.
     *
     * @returns {number} the average quality
     */
    getQuality() {
        let scoreSum = 0;
        let divisor = 0;
        this.situation.children.items.forEach(condition => {
            if(condition.fulfilled) {
                scoreSum += condition.context.quality * this._getWeight(condition.name);
                divisor += this._getWeight(condition.name);
            }
        });
        console.log("dividing " + scoreSum + " by " + divisor);
        let quality = scoreSum / divisor;
        return quality;
    }

    /**
     * Returns a weight if one is specified. Defaults to 1 if non eis specified.
     *
     * @param conditionName
     * @returns {*|number}
     * @private
     */
    _getWeight(conditionName) {
        return this.weights[conditionName] || 1;
    }
}

module.exports = {
    'noOp': NoOpStrategy,
    'weightedAvg': WeightedAverageStrategy
};


