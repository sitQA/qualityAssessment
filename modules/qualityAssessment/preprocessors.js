'use strict';

const ops = require('./situation').Condition.types();

/**
 * Base class for all available preprocessor strategies.
 * Subclasses should override the #getSituation() method.
 */
class PreprocessorStrategy {

    constructor(situation) {
        this.situation = situation;
    }

    /**
     * @return the preprocessed situation object
     */
    getSituation() {
        throw "not implemented";
    }

}

/**
 * A preprocessing strategy which is applied on all conditions of a situation that use
 * comparison operators that work on a numeric interval.
 * Conditions are skipped if required meta data (expected value ranges) are missing.
 */
class ConfidenceIntervalPreprocessor extends PreprocessorStrategy {

    constructor(situation) {
        super(situation);
        this.done = false;
    }

    _updateQuality() {
        if (this.done) {
            return; //make method indempotent
        }
        this.situation.children.items.forEach(condition => {
            if (this._strategyApplicable(condition)) {
                let start = condition.meta.range[0];
                let end = condition.meta.range[1];
                let threshold = condition.value;
                // get range, calculate distance to threshold as percent value and increase confidence accordingly
                let value = condition.context.value;
                let relativeDistance = Math.abs((threshold - value) / (end - start));
                console.log("relative distance is " + relativeDistance);

                let q;
                if(relativeDistance <= 0.05) {
                    q = condition.context.quality * (0.9 - relativeDistance);
                } else {
                    q = condition.context.quality * (1 + relativeDistance);
                }
                if (q > 1) {
                    q = 1;
                }
                condition.context.quality = q;
            }
        });
        this.done = true;
    }

    _strategyApplicable(condition) {
        let validOperators = [ops.greaterThan, ops.lowerThan, ops.max, ops.min];
        console.log("has meta? " + (condition.meta.range !== undefined));
        console.log("is array? " + (condition.meta.range instanceof Array));
        console.log(condition.operator + " is a valid operator? " + (validOperators.indexOf(condition.operator) >= 0));
        return condition.meta.range !== undefined && condition.meta.range instanceof Array && validOperators.indexOf(condition.operator) >= 0;

    }

    getSituation() {
        this._updateQuality();
        return this.situation;
    }
}

module.exports = {
    'confidenceInterval': ConfidenceIntervalPreprocessor
};