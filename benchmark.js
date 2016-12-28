'use strict';

const Benchmark = require('benchmark');
const Bluebird = require('bluebird');
require('any-promise/register/bluebird');
const reduce = require('./');

const suite = new Benchmark.Suite();

suite
    .add('bot44-reduce', function (deferred) {
        reduce([1, 2, 3, 4], function (total, current) {
            total += current;
            return Promise.resolve(total);
        })
        .then(() => deferred.resolve());
    }, { defer: true })
    .add('Bluebird.reduce', function (deferred) {
        Bluebird.reduce([1, 2, 3, 4], function (total, current) {
            total += current;
            return Promise.resolve(total);
        })
        .then(() => deferred.resolve());
    }, { defer: true })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ async: true });
