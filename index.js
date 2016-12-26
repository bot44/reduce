'use strict';

function reduce(array, reducer, initialValue) {
    if (array === undefined || array === null) {
        return Promise.reject(new TypeError('Reduce called on null or undefined'));
    }
    if (typeof reducer != 'function') {
        return Promise.reject(new TypeError(reducer + ' is not a function'));
    }

    let len = array.length || 0;
    let accumulatorPromise;

    let dispatch = function (i) {
        if (i == len) {
            return accumulatorPromise;
        }
        return Promise.all([accumulatorPromise, array[i]])
            .then(([accumulator, value]) => {
                accumulatorPromise = reducer(accumulator, value, i, array);
                return dispatch(i + 1);
            });
    };

    if (arguments.length > 2) {
        accumulatorPromise = Promise.resolve(initialValue);
        return dispatch(0);

    } else if (len) {
        accumulatorPromise = Promise.resolve(array[0]);
        return dispatch(1);

    } else {
        return Promise.reject(new TypeError('Reduce of empty array with no initial value'));
    }
}

module.exports = reduce;
