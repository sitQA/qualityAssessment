'use strict';

/**
 * Base class for all available assessment strategies.
 * Subclasses should override the #getQuality() method.
 */
class AssessmentStrategy {

    constructor(situation) {
        this.situation = situation;
    }

    getQuality() {
        throw "not implemented";
    }

}


class NoOpStrategy extends AssessmentStrategy {

    getQuality() {
        return null;
    }
}

/**
 * Calculates averages.
 * Uses artihmetic mean if no weights are specified.
 */
class WeightedAverageStrategy extends AssessmentStrategy {

    constructor(situation, weights) {
        super(situation);
        this.weights = weights || {};
    }

    /**
     * Calculates the quality by averaging all conditions of a situation which have evaluated to true.
     * When the operation is XOR or AND, then all conditions have to be taken into account.
     *
     * @returns {number} the average quality
     */
    getQuality() {
        if(this.situation.children.operation === 'or') {
            return this.getMaxQuality();
        } else {
            return this.getAverage();
        }
    }

    getAverage() {
        let scoreSum = 0;
        let divisor = 0;
        this.situation.children.items.forEach(condition => {
            scoreSum += condition.context.quality * this._getWeight(condition.name);
            divisor += this._getWeight(condition.name);
        });
        return scoreSum / divisor;
    }

    getMaxQuality() {
        let maxQ = 0;
        this.situation.children.items.forEach(condition => {
            if(condition.fulfilled && condition.context.quality > maxQ) {
                maxQ = condition.context.quality;
            }
        });
        return maxQ;
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

/**
 * Strategy which uses the lowest quality score among the situation's children.
 * The situation quality is assumed to be only as high as its most uncertain member.
 */
class PessimisticStrategy extends AssessmentStrategy {

    constructor(situation) {
        super(situation);
    }

    getQuality() {
        return this.getMinQuality();
    }

    getMinQuality() {
        let minQ = 1;
        this.situation.children.items.forEach(condition => {
            if(!this._skipCondition(condition) && condition.context.quality < minQ) {
                minQ = condition.context.quality;
            }
        });
        return minQ;
    }

    _skipCondition(condition) {
        return this.situation.children.operation === 'or' && !condition.fulfilled;
    }

}

module.exports = {
    'noOp': NoOpStrategy,
    'weightedAvg': WeightedAverageStrategy,
    'pessimistic': PessimisticStrategy
};


