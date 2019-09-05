import * as t from 'macoolka-io'
const enumKind = t.literal('enum')
const enumScalar = t.intersection([t.type({
    _kind: enumKind,
    values: t.array(t.string)
}), t.partial({
    defaultValue: t.string,
})])
const jsonKind = t.literal('json')
const jsonScalar = t.intersection([t.type({
    _kind: jsonKind,
}), t.partial({
    defaultValue: t.record(t.string, t.any),
})])

const stringKind = t.literal('string')
const stringScalar = t.intersection([
    t.type({
        _kind: stringKind,
    }), t.partial({
        format: t.keyof({
            UUID: '',
            EMail: '',
            IPV4: '',
            IPV6: '',
            URL: '',
        }),
        defaultValue: t.string,
        minLength: t.int,
        maxLength: t.int,
        pattern: t.string
    })])
const numberKind = t.literal('number')
const numberScalar = t.intersection([
    t.type({
        _kind: numberKind,
    }),
    t.partial({
        defaultValue: t.number,
        maximum: t.number,
        minimum: t.number,
    })
])
const intKind = t.literal('int')
const intScalar = t.intersection([
    t.type({
        _kind: intKind,
    }), t.partial({
        defaultValue: t.int,
        maximum: t.int,
        minimum: t.int,
    })])
const booleanKind = t.literal('boolean')
const booleanScalar = t.intersection([
    t.type({
        _kind: booleanKind,
    }), t.partial({
        defaultValue: t.boolean,
    })])
const datetimeKind = t.literal('datetime')
const datetimeScalar = t.intersection([
    t.type({
        _kind: datetimeKind,
    }), t.partial({
        defaultValue: t.literal('now'),
    })])

const typeKind = t.literal('type')

const typeScalar = t.intersection([
    t.type({
        _kind: typeKind,
        value: t.string,
    }), t.partial({
        defaultValue: t.string
    })])
const typeUnionKind = t.literal('typeUnion')

const typeUnionScalar = t.intersection([
    t.type({
        _kind: typeUnionKind,
        values: t.array(t.string),
    }), t.partial({
        defaultValue: t.string
    })])
const kindKind = t.literal('kind')
const kindScalar = t.intersection([
    t.type({
        _kind: kindKind,
        value: t.string
    }), t.partial({
        defaultValue: t.string
    })])

const Param = t.intersection([t.type({
    name: t.string,
    type: t.withDefault(t.union([
        stringKind,
        numberKind,
        intKind,
        booleanKind,
        datetimeKind,
        jsonKind,
        stringScalar,
        numberScalar,
        intScalar,
        enumScalar,
        booleanScalar,
        datetimeScalar,
        kindScalar,
        typeScalar,
        typeUnionScalar,
        jsonScalar,
    ]), 'string'),
    required: t.withDefault(t.boolean, false),
    isArray: t.withDefault(t.boolean, false),
    isArrayRequired: t.withDefault(t.boolean, false),
    defaultEmptyArray: t.withDefault(t.boolean, true),
}), t.partial({
    description: t.array(t.string),
})])

const Field = t.intersection([Param, t.type({

    unique: t.withDefault(t.boolean, false),
    id: t.withDefault(t.boolean, false),
    exclusiveCreate: t.withDefault(t.boolean, false),
    exclusiveUpdate: t.withDefault(t.boolean, false),
    exclusiveWhere: t.withDefault(t.boolean, false),
    order: t.withDefault(t.boolean, true),
    readonly: t.withDefault(t.boolean, false),
}), t.partial({
    since: t.string,
    deprecated: t.boolean,
    deprecationReason: t.array(t.string),

})])


const Method = t.intersection([Param, t.type({
    returnVoid: t.withDefault(t.boolean, false),
    params: t.withDefault(t.array(Param), []),

}), t.partial({
    since: t.string,
})])
const TypeAlias= t.intersection([Param,

    t.type({
        fields: t.withDefault(t.array(Field), []),
        methods: t.withDefault(t.array(Method), []),

    }),
    t.partial({
        since: t.string,
        description: t.array(t.string)
    })
])
const Type = t.intersection([

    t.type({
        name: t.string,
        fields: t.withDefault(t.array(Field), []),
        methods: t.withDefault(t.array(Method), []),
        implements: t.withDefault(t.array(t.string), []),

    }),
    t.partial({
        since: t.string,
        description: t.array(t.string)
    })
])
export const Schema = t.intersection([

    t.type({
        name: t.string,
        idUnique: t.withDefault(t.boolean, true),
        models: t.withDefault(t.array(Type), []),
        typealiases: t.withDefault(t.array(TypeAlias), []),
    }),
    t.partial({
        since: t.string,
        description: t.array(t.string),
    })
])

export type ModelType = t.TypeOf<typeof Type>
export type Schema = t.TypeOf<typeof Schema>
export type ModelField = t.TypeOf<typeof Field>
export type ISchema = t.TypeOf<typeof Schema>


