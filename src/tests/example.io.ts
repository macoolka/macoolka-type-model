import * as t from 'macoolka-io'
export const User = t.intersection([
  t.type({
    name: t.string,
    id: t.string,
    city: t.withDefault(t.keyof({ dalian: '', london: '', newyork: '', beijing: '' }), 'dalian')
  }),
  t.partial({
    age: t.int,
    female: t.boolean
  })
])
