const Fn = (() => {
  const uncurry = f => args => args.reduce((p, c) => p(c), f)

  const curry = n => f => {
    const rec = a => acc => (a === 0 ? f(acc) : x => rec(a - 1)([...acc, x]))
    return rec(n)([])
  }

  return { uncurry, curry }
})()

const Obj = (() => {
  const hasProp = p => o => Object.prototype.hasOwnProperty.call(o, p)

  const mapWithKey = f => o =>
    Object.keys(o).reduce((p, k) => ({ ...p, [k]: f(k)(o[k]) }), {})

  return { hasProp, mapWithKey }
})()

module.exports = { Fn, Obj }
