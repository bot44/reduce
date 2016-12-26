# reduce

## Installation

```
$ npm install bot44-reduce
```

## Usage

```
const reduce = require('bot44-reduce');
const sleep = require('bot44-sleep');

let initValue = Promise.resolve(10);
let array = [
    1,
    Promise.resolve(2),
    3
];

let total = reduce(array, function(memo, it) {
    return sleep(1000)
        .then(() => {
            memo += it * 2;
            return memo;
        });
}, initValue);

console.log(total);
```

## License

MIT
