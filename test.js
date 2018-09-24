const { test } = require("ava")
const { create: adt, match } = require(".")

test("can create Maybe type", t => {
  const Maybe = adt({ Nothing: [], Just: ["a"] })
  const { Nothing, Just } = Maybe

  const v = Just(21)

  // Manipulate the value
  const show = match({ Nothing: "(Nothing)", Just: x => `(Just ${x})` })
  const map = f => match({ Nothing, Just: x => Just(f(x)) })
  t.is(show(map(x => x * 2)(v)), "(Just 42)")

  // Ensure the law is satisfied for some selected inputs
  const inputs = [Nothing, Just(42)]
  for (const i of inputs) {
    const id = match(Maybe)
    t.is(show(id(i)), show(i))
  }
})
