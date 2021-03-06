/**
 * Code generated by github.com/macoolka/macoolka-gen-model, DO NOT EDIT.
 */
import * as t from 'macoolka-io'
export const City = t.keyof({ 'A': '','B': '','C': '' })
export const Empty = t.never
export const T1 = t.type({
  name1: t.string
})

export const T2 = t.partial({
  name2: t.string
})

export const Basic = t.intersection([T1,T2,t.intersection([  t.type({
    id: t.string,
    string: t.string
  })
,  t.partial({
    number: t.number,
    date: t.dateFromISOString,
    int: t.int,
    boolean: t.boolean,
    json1: t.record(t.string,t.any),
    string_kind: t.string,
    number_kind: t.string,
    int_kind: t.int,
    datetime_kind: t.dateFromISOString,
    json_kind: t.record(t.string,t.any),
    boolean_kind: t.boolean,
    enum_kind: t.keyof({ 'a': '','b': '' }),
    enum_t_kind: City,
    kind_kind: t.literal('k'),
    type_kind: T1,
    typeUnion_kind: t.union([T1,T2])

  })
])
],'Basic')
