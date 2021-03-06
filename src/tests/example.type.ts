export interface NonEmptyArray<A> extends Array<A> {
  0: A
}

export type MaybeArray<A> = A | Array<A>

export interface User {
  name: string
  id: string
  age?: number
  female?: boolean
  city: 'dalian' | 'london' | 'newyork' | 'beijing'
}
