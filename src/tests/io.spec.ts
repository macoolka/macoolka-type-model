import * as t from '../io'
import { pipe } from 'fp-ts/lib/pipeable'
import { InputModule as I } from '../types'
import * as E from 'fp-ts/lib/Either'
import BasicA from './fixtures/BasicA'
type InputModule=I.MModule
const en={i18n:{locale:'en'}}
const zh={i18n:{locale:'zh'}}
describe('io', () => {
    it('decode ok', () => {
        
        pipe(
            t.Module([]).decode(BasicA),
            t.mapI18N,
            E.mapLeft(a=>{
                console.log(a({}))
            }),
            result => expect(E.isRight(result)).toBeTruthy()
        )
    })
    describe('validateId', () => {
        it('validateId ok', () => {
            const schema: InputModule = {
                name: 'schema',
                idUnique: true,
                interfaces: [{
                    name: 'test',
                    fields: [{
                        name: 'a1',
                        id: true
                    }, {
                        name: 'a2',
                    }, {
                        name: 'a3',
                    }]
                }]
            }
            pipe(
                t.Module([]).decode(schema),
                result => expect(E.isRight(result)).toBeTruthy()
            )
        })
        it('validateId repeat', () => {
            const schema: InputModule = {
                name: 'schema',
                idUnique: true,
                interfaces: [{
                    name: 'test',
                    fields: [{
                        name: 'a1',
                        id: true
                    }, {
                        name: 'a2',
                        id: true
                    }, {
                        name: 'a3',
                    }]
                }]

            }
            pipe(
                t.Module([]).decode({ ...schema, idUnique: false }),
                result => expect(E.isRight(result)).toEqual(true)
            )
            pipe(
                t.Module([]).decode(schema),
                t.mapI18N,
                result => {
                    expect(E.isLeft(result)).toEqual(true)
                    return result;
                },
                E.mapLeft(a => {
                    expect(a(en)).toMatchSnapshot()
                    expect(a(zh)).toMatchSnapshot()
                })

            )
           

        })
        it('validateId empty', () => {
            const schema: InputModule = {
                name: 'schema',
                idUnique: true,
                interfaces: [{
                    name: 'test',
                    fields: [{
                        name: 'a1',

                    }, {
                        name: 'a2',
                    }, {
                        name: 'a3',
                    }]
                }]

            }
            pipe(
                t.Module([]).decode(schema),
                t.mapI18N,
                E.mapLeft(as => {
                    expect(as(en)).toMatchSnapshot()
                    expect(as(zh)).toMatchSnapshot()
                })
            )
          
        })
    })
    describe('validate field name', () => {
        it('ok', () => {
            const schema: InputModule = {
                name: 'schema',
                idUnique: true,
                interfaces: [{
                    name: 'test',
                    fields: [{
                        name: 'a1',
                        id: true
                    }, {
                        name: 'a2',
                    }, {
                        name: 'a3',
                    }]
                }]

            }
            pipe(
                t.Module([]).decode(schema),
                result => expect(E.isRight(result)).toBeTruthy()
            )

        })
        it('validate field name repeat', () => {
            const schema: InputModule = {
                name: 'schema',
                idUnique: true,
                interfaces: [{
                    name: 'test', fields: [{
                        name: 'a1',
                        id: true
                    }, {
                        name: 'a1',

                    }, {
                        name: 'a3',
                    }]
                }]

            }
            pipe(
                t.Module([]).decode(schema),
                t.mapI18N,
                E.mapLeft(as => {
                    expect(as(en)).toMatchSnapshot()
                    expect(as(zh)).toMatchSnapshot()
                })
            )
           

        })

    })

    describe('validate type name', () => {
        it('ok', () => {
            const schema: InputModule = {
                name: 'schema',
                idUnique: true,
                interfaces: [{
                    name: 'test',
                    fields: [{
                        name: 'a1',
                        id: true
                    }]
                }, {
                    name: 'test1',
                    fields: [{
                        name: 'a1',
                        id: true
                    }]
                }, {
                    name: 'test2',
                    fields: [{
                        name: 'a1',
                        id: true
                    }]
                }],
                typealiases: [{
                    name: 'E1',

                }, {
                    name: 'E2',
                }]

            }
            pipe(
                t.Module([]).decode(schema),

                result => expect(E.isRight(result)).toBeTruthy()
            )

        })


    })

    describe('validate default value', () => {
        it('ok', () => {
            const schema: InputModule = {
                name: 'schema',
                idUnique: true,
                interfaces: [{
                    name: 'test',
                    fields: [{
                        name: 'a1',
                        type: {
                            _kind: 'string',
                            defaultValue: 'a1'
                        },
                        id: true
                    }, {
                        name: 'a2',
                        type: {
                            _kind: 'int',
                            defaultValue: 1
                        }

                    }, {
                        name: 'a3',
                        type: {
                            _kind: 'number',
                            defaultValue: 2
                        }

                    }, {
                        name: 'a4',
                        type: {
                            _kind: 'datetime',
                            defaultValue: 'now'
                        }

                    }]
                }]

            }
            pipe(
                t.Module([]).decode(schema),

                result => expect(E.isRight(result)).toBeTruthy()
            )

        })


    })
    it('interface empty', () => {
        pipe(
            {},
            t.MInterface.decode,
            t.mapI18N,
            result => {
                expect(E.isLeft(result)).toBeTruthy();
                return result;
            },
            E.mapLeft(as => {
                expect(as(en)).toMatchSnapshot()
                expect(as(zh)).toMatchSnapshot()
            })
        )
       
    })
    it('interface ok', () => {
        pipe(
            { name: '1' },
            t.MInterface.decode,
            result => {
                expect(E.isRight(result)).toBeTruthy();

            },

        )

    })
})


