'use strict';

const Promise = require('any-promise');

function reduce(array, reducer, initialValue) {
    if (array === undefined || array === null) {
        return Promise.reject(new TypeError('Reduce called on null or undefined'));
    }
    if (typeof reducer != 'function') {
        return Promise.reject(new TypeError(reducer + ' is not a function'));
    }

    let length = array.length || 0;
    let previousValue;

    let dispatch = function (i, done) {
        if (i == length) {
            if (previousValue !== null && previousValue !== undefined && typeof previousValue.then == 'function') {
                previousValue.then(function (value) { done(null, value); }, done);
            } else {
                done(null, previousValue);
            }
            return;
        }
        let currentValue = array[i];
        let c = -1;
        let tryReducer = function () {
            if (++c) {
                try {
                    previousValue = reducer(previousValue, currentValue, i, array);
                } catch (err) {
                    return done(err);
                }
                dispatch(i + 1, done);
            }
        }
        if (previousValue !== null && previousValue !== undefined && typeof previousValue.then == 'function') {
            previousValue.then(function (value) { previousValue = value; tryReducer(); }, done);
        } else {
            tryReducer();
        }
        if (currentValue !== null && currentValue !== undefined && typeof currentValue.then == 'function') {
            currentValue.then(function (value) { currentValue = value; tryReducer(); }, done);
        } else {
            tryReducer();
        }
    };

    if (arguments.length > 2) {
        previousValue = initialValue;
        return new Promise(function (resolve, reject) {
            dispatch(0, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

    } else if (length) {
        previousValue = array[0];
        return new Promise(function (resolve, reject) {
            dispatch(1, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

    } else {
        return Promise.reject(new TypeError('Reduce of empty array with no initial value'));
    }
}

module.exports = reduce;
