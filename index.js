const uncurry = f => args => args.reduce((p, c) => p(c), f)

const curry = n => f => {
  const rec = a => acc => (a === 0 ? f(acc) : x => rec(a - 1)([...acc, x]))
  return rec(n)([])
}

const mapWithKey = f => o =>
  Object.keys(o).reduce((p, k) => ({ ...p, [k]: f(k)(o[k]) }), {})

const match = cases => ({ label, values }) => uncurry(cases[label])(values)

const create = def => {
  const constructors = mapWithKey(label => types => curry(types.length)(values => ({ label, values })))(def)
  return { ...constructors, def }
}

module.exports = { match, create, adt: create }
