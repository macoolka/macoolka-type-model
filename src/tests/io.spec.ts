import * as t from '../io'
import { pipe } from 'fp-ts/lib/pipeable'
import { InputModule as I } from '../types'
import * as E from 'fp-ts/lib/Either'
type InputModule=I.MModule
describe('io', () => {
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
                t.Module.decode(schema),
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
                t.Module.decode({ ...schema, idUnique: false }),
                result => expect(E.isRight(result)).toEqual(true)
            )
            pipe(
                t.Module.decode(schema),

                result => {
                    expect(E.isLeft(result)).toEqual(true)
                    return result;
                },
                E.mapLeft(a => {
                    expect(t.show(a)({})).toMatchSnapshot()
                })

            )
            pipe(
                t.Module.decode(schema),

                result => {
                    expect(E.isLeft(result)).toEqual(true)
                    return result;
                },
                E.mapLeft(a => {
                    expect(t.show(a)({locale:'zh'})).toMatchSnapshot()
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
                t.Module.decode(schema),
                E.mapLeft(as => {
                    expect(t.show(as)({})).toMatchSnapshot()
                })
            )
            pipe(
                t.Module.decode(schema),
                E.mapLeft(as => {
                    expect(t.show(as)({ locale: 'zh' })).toMatchSnapshot()
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
                t.Module.decode(schema),
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
                t.Module.decode(schema),
                E.mapLeft(as => {
                    expect(t.show(as)()).toMatchSnapshot()
                })
            )
            pipe(
                t.Module.decode(schema),
                E.mapLeft(as => {
                    expect(t.show(as)({ locale: 'zh' })).toMatchSnapshot()
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
                t.Module.decode(schema),

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
                t.Module.decode(schema),

                result => expect(E.isRight(result)).toBeTruthy()
            )

        })


    })
    it('interface empty', () => {
        pipe(
            {},
            t.MInterface.decode,
            result => {
                expect(E.isLeft(result)).toBeTruthy();
                return result;
            },
            E.mapLeft(as => {
                expect(t.show(as)()).toMatchSnapshot()
            })
        )
        pipe(
            {},
            t.MInterface.decode,
            result => {
                expect(E.isLeft(result)).toBeTruthy();
                return result;
            },
            E.mapLeft(as => {
                expect(t.show(as)({ locale: 'zh' })).toMatchSnapshot()
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


