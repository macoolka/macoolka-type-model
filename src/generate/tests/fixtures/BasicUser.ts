import * as t from 'macoolka-io'

export const User = t.intersection([
  t.type({}),
  t.partial({
    name: t.intersection([t.stringMaxLength(6), t.stringMinLength(4)]),
    age: t.intersection([t.numberMaxValue(200), t.numberMinValue(20)]),
    mode: t.stringMatch(/^A/)
  })
])
