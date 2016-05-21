'use strict';

let Situation = require('../modules/qualityAssessment/situation').Situation;

let maxCondition = {
    name : 'free RAM',
    operator: 'min',
    value: '30',
    context: {
        'freeMem' : 40,
        'quality' : 0.5,
        'timestamp': 876786
    },
    fulfilled: true
};

let equalsCondition = {
    name : 'free slots',
    operator: 'equals',
    value: '30',
    context: {
        'freeMem' : 40,
        'quality' : 0.7,
        'timestamp': 876786
    },
    fulfilled: true
};

let greaterFalseCondition = {
    name : 'free slots',
    operator: 'greaterThan',
    value: '10',
    context: {
        'freeSlots' : 4,
        'quality' : 0.9,
        'timestamp': 876786
    },
    fulfilled: false
};

let falseCondition = {
    name : 'free slots',
    operator: 'greaterThan',
    value: '10',
    context: {
        'freeSlots' : 4,
        'quality' : 0.1,
        'timestamp': 876786
    },
    fulfilled: false
};

let situationWithAnd = new Situation({
    children: {operation: 'and', items: [maxCondition, equalsCondition]},
    name: 'situationWithAnd',
    id: 'situationWithAnd',
    timeDetected: new Date()
});

let situationWithOr = new Situation({
    children: {operation: 'or', items: [maxCondition, equalsCondition, greaterFalseCondition, falseCondition]},
    name: 'situationWithAnd',
    id: 'situationWithAnd',
    timeDetected: new Date()
});

let situationWithXor = new Situation({
    children: {operation: 'xor', items: [maxCondition, greaterFalseCondition]},
    name: 'situationWithAnd',
    id: 'situationWithAnd',
    timeDetected: new Date()
});

module.exports = {
    andSit: situationWithAnd,
    orSit: situationWithOr,
    xorSit: situationWithXor
};