

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
        if(this.done) {
            return; //make method indempotent
        }
        this.situation.children.items.forEach(condition => {
            if(!this._strategyApplicable(condition)) {
                // TODO: update quality
            }
        });
        this.done = true;
    }

    _strategyApplicable(condition) {
        //TODO: check if condition is using a number range check
        // and check if required meta data are present
        return false;
    }

    getSituation() {
        this._updateQuality();
        return this.situation;
    }
}