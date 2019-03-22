const { Fn, Obj } = require("./utils")

const otherwise = Symbol("@masaeedu/adt/otherwise")

const missing = cases => v => {
  const vj = JSON.stringify(v)
  const cj = JSON.stringify(cases)
  const msg = `
Failed to match ${vj}.
No matching handler in ${cj} and no default handler.`

  throw new Error(msg.trim())
}

const match = cases => {
  const { [otherwise]: defaultHandler = missing(cases) } = cases

  return v => {
    const { label, values } = v
    return cases.hasOwnProperty(label)
      ? Fn.uncurry(cases[label])(values)
      : defaultHandler(v)
  }
}

const create = def => {
  const createConstructor = label => types =>
    Fn.curry(types.length)(values => ({ label, values }))
  const constructors = Obj.mapWithKey(createConstructor)(def)

  return { ...constructors, match, def }
}

module.exports = { match, create, otherwise, adt: create }
