'use strict';
var NoOpStrategy = require('./strategies').noOp;


class Situation {
    /**
     *
     * @param opt properties
     * @param opt.id id of the situation template
     * @param opt.name name of the situation
     * @param timeDetcted timestamp of th edetection time
     * @param children children of the situation
     * @param meta information to describe how quality should be assessed
     */
    constructor(opt) {
        this.id = opt.id;
        this.children = opt.children;
        this.timeDetected = new Date(opt.timeDetected);
        this.children = opt.children || {};
        this.meta = opt.meta || new Meta();
        this.initChildren();
    }

    initChildren() {
        let conditions = [];
        this.children.items.forEach(item => {
            conditions.push(new Condition(item));
        });
        this.children.items = conditions;

    }

    getQuality() {
        return this.meta.strategy.calculateSituation(this);
    }
}

class Meta {
    constructor() {
        this.strategy = new NoOpStrategy();
    }
}

/**
 * e.g. OR, AND, XOR
 */
class Operation {

    constructor(type) {
        this.type = type.toLowerCase();
        if(this.type == 'or') {
            this.evaluate = arr => true; // TODO: implement
        } else if(type == 'and') {
            this.evaluate = this.evaluateAnd
        } else if(type == 'xor') {
            this.evaluate = arr => true;
        } else {
            throw "unknown operation type";
        }
    }

    static evaluateAnd(items) {
        return items.every(element => {
            return element.fulfilled;
        });
    }
}


/**
 * logial expression that can be evaluated
 */
class Condition {

    constructor(opt) {
        this.name = opt.name || 'unnamed';
        this.operator = Condition.types()[opt.operator];
        this.value = opt.value;
        this.context = opt.context;
        this.fulfilled = opt.fulfilled;
    }

    static types() {
        return {
            lowerThan: '<',
            greaterThan: '>',
            equals: '===',
            notEquals: '!==',
            between: 'between',
            average: 'avg',
            min: '>=',
            max: '<='
            // intervalMinEqual
            // intervalMin
            // intervalMaxEqual
            // intervalMax
            // sensorLowerThan
            // sensorGreaterThan
            // sensorEquals
        }
    }
}

module.exports = Situation;