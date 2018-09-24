const { test } = require("ava")
const { create: adt, match } = require(".")

test('can create Maybe type', t => {
  const { Nothing, Just } = adt({ Nothing: [], Just: ["a"] })
  const map = f => match({
    Nothing,
    Just: x => Just(f(x))
  })
  const show = match({ Nothing: '(Nothing)', Just: x => `(Just ${x})` })

  t.is(show(map(x => x * 2)(Just(21))), '(Just 42)')
})
