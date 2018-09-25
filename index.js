const { Fn, Obj } = require("./utils")

const match = cases => ({ label, values }) => Fn.uncurry(cases[label])(values)

const create = def => {
  const createConstructor = label => types =>
    Fn.curry(types.length)(values => ({ label, values }))
  const constructors = Obj.mapWithKey(createConstructor)(def)

  return { ...constructors, match, def }
}

module.exports = { match, create, adt: create }
