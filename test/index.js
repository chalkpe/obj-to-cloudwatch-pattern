import convert from '../lib/index.js'

console.log(
  convert({
    a: 42,
    b: 'string "escaped" \\ o_o /',
    c: 'nomatch',
    d: null,
    e: undefined,
    f: { g: '<=40', h: '>= 50', i: '/users/*' },
    j: { k: '> 10', l: '< 100', m: { n: { o: 'nested' } }, p: '!wow' }
  })
)
