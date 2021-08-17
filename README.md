# obj-to-cloudwatch-pattern

[![Version](https://img.shields.io/npm/v/obj-to-cloudwatch-pattern.svg)](https://npmjs.org/package/obj-to-cloudwatch-pattern)
[![Downloads](https://img.shields.io/npm/dt/obj-to-cloudwatch-pattern.svg)](https://npmjs.org/package/obj-to-cloudwatch-pattern)
[![License](https://img.shields.io/npm/l/obj-to-cloudwatch-pattern.svg)](https://github.com/ChalkPE/obj-to-cloudwatch-pattern/blob/main/LICENSE)

Convert object into [AWS CloudWatch log pattern](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntax.html)

## Example
```js
import convert from 'obj-to-cloudwatch-pattern'

convert({
  a: 42,
  b: 'string "escaped" \\ o_o /',
  c: 'nomatch',
  d: null,
  e: undefined,
  f: { g: '<=40', h: '>= 50', i: '/users/*' },
  j: { k: '> 10', l: '< 100', m: { n: { o: 'nested' } }, p: '!wow' }
})
```

> `($.a = 42) && ($.b = "string \"escaped\" \\ o_o /") && ($.c = nomatch) && ($.d IS NULL) && ($.e NOT EXISTS) && ($.f.g <= 40) && ($.f.h >= 50) && ($.f.i = /users/*) && ($.j.k > 10) && ($.j.l < 100) && ($.j.m.n.o = "nested") && ($.j.p != "wow")`


## License
[MIT License](LICENSE)
