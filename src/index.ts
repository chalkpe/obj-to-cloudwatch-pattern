const keywords = ['nomatch', 'nonmatch']
const comparisons = ['<=', '>=', '<', '>']

function escape(str: string): string {
  const escaped = str.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  return str.includes('*') ? escaped : `"${escaped}"`
}

function flatten(obj: any, path = '$'): string[] {
  const entries: [string, any][] =
    typeof obj === 'object' && obj !== null ? Object.entries(obj) : [['', obj]]

  return entries.flatMap(([k, v]) => {
    const key = k ? `${path}.${k}` : path

    switch (typeof v) {
      case 'object':
        return v === null ? `${key} IS NULL` : flatten(v, key)

      case 'string':
        if (keywords.includes(v)) return `${key} = ${v}`

        const c = comparisons.find((c) => v.startsWith(c))
        if (c) return `${key} ${c} ${v.slice(c.length).trim()}`

        const n = v.startsWith('!')
        return `${key} ${n ? '!=' : '='} ${escape(n ? v.slice(1) : v)}`

      case 'number':
      case 'bigint':
        return `${key} = ${v}`

      case 'undefined':
        return `${key} NOT EXISTS`

      case 'boolean':
        return `${key} IS ${v.toString().toUpperCase()}`

      case 'symbol':
      case 'function':
      default:
        throw new Error(`Unsupported type: ${typeof v}`)
    }
  })
}

function convert(obj: any): string {
  const entries = flatten(obj)
  return entries.length > 0 ? `(${entries.join(') && (')})` : ''
}

export default convert
