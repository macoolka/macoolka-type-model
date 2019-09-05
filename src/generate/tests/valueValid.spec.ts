import { User } from './fixtures/BasicUser'
import { isLeft, right } from 'fp-ts/lib/Either'
describe('valid rule', () => {
    it('string rule max length and min length', () => {
        expect(User.decode({ name: '1234' })).toEqual(right({ name: '1234' }))
        expect(User.decode({ name: '123456' })).toEqual(right({ name: '123456' }))
        expect(isLeft(User.decode({ name: '123' }))).toEqual(true)
        expect(isLeft(User.decode({ name: '1234567' }))).toEqual(true)
    })
    it('string rule regExp', () => {
        expect(User.decode({ mode: 'A' })).toEqual(right({ mode: 'A' }))
        expect(User.decode({ mode: 'ABC' })).toEqual(right({ mode: 'ABC' }))
        expect(isLeft(User.decode({ mode: '123' }))).toEqual(true)
        expect(isLeft(User.decode({ mode: 'B!' }))).toEqual(true)
    })
    it('number rule max value and min value', () => {
        expect(User.decode({ age: 20 })).toEqual(right({ age: 20 }))
        expect(User.decode({ age: 200 })).toEqual(right({ age: 200 }))
        expect(isLeft(User.decode({ age: 19 }))).toEqual(true)
        expect(isLeft(User.decode({ age: 201 }))).toEqual(true)
    })
})