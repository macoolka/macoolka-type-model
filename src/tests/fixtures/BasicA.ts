import { InputModule } from '../../types'
const a: InputModule.MModule =
{
  "path": [
    "",
    "home",
    "fastspeeed",
    "mocoolka",
    "core",
    "macoolka-type-ast",
    "src",
    "tests",
    "fixtures",
    "Basic.ts"
  ],
  "name": "Basic",
  "interfaces": [
    {
      "name": "Basic",
      "isExported": true,
      "signature": "export interface Basic extends T1, T2 {\n  string: string\n  number?: number\n  date?: Date\n  int?: number\n  boolean?: boolean\n  json1?: Record<string,any>\n  string_kind?: string\n  number_kind?: number\n  int_kind?: number\n  datetime_kind?: Date\n  json_kind?: Record<string,any>\n  boolean_kind?: boolean\n  enum_kind?: 'a' | 'b'\n  enum_t_kind?: City\n  kind_kind?: 'k'\n  type_kind?: T1\n  typeUnion_kind?: T1 | T2\n  add:(\n    string: string,\n    number?: number,\n    date?: Date,\n    int?: number,\n    boolean?: boolean,\n    json1?: Record<string,any>,\n    string_kind?: string,\n    number_kind?: number,\n    int_kind?: number,\n    datetime_kind?: Date,\n    json_kind?: Record<string,any>,\n    boolean_kind?: boolean,\n    enum_kind?: 'a' | 'b',\n    enum_t_kind?: City,\n    kind_kind?: 'k',\n    type_kind?: T1,\n    typeUnion_kind?: T1 | T2,\n  ) => void\n}",
      "implements": [
        "T1",
        "T2"
      ],
      "methods": [],
      "fields": [
        {
          "name": "add",
          "signature": "add:(\n    string: string,\n    number?: number,\n    date?: Date,\n    int?: number,\n    boolean?: boolean,\n    json1?: Record<string,any>,\n    string_kind?: string,\n    number_kind?: number,\n    int_kind?: number,\n    datetime_kind?: Date,\n    json_kind?: Record<string,any>,\n    boolean_kind?: boolean,\n    enum_kind?: 'a' | 'b',\n    enum_t_kind?: City,\n    kind_kind?: 'k',\n    type_kind?: T1,\n    typeUnion_kind?: T1 | T2,\n  ) => void",
          "required": true,
          "type": {
            "_kind": "type",
            "value": "object",
            "isArray": false
          },
          "description": [],
          "examples": [],
          "deprecated": false,
          "ignore": false,
          "reason": [],
          "descriptions": {}
        },
        {
          "name": "boolean",
          "signature": "boolean?: boolean",
          "required": false,
          "type": {
            "_kind": "boolean",
            "isArray": false
          },
          "description": [],
          "examples": [],
          "deprecated": false,
          "ignore": false,
          "reason": [],
          "descriptions": {}
        },
        {
          "name": "boolean_kind",
          "signature": "boolean_kind?: boolean",
          "required": false,
          "type": {
            "_kind": "boolean",
            "isArray": false
          },
          "description": [],
          "examples": [],
          "deprecated": false,
          "ignore": false,
          "reason": [],
          "descriptions": {}
        },
        {
          "name": "date",
          "signature": "date?: Date",
          "required": false,
          "type": {
            "_kind": "type",
            "value": "Date",
            "isArray": false
          },
          "description": [],
          "examples": [],
          "deprecated": false,
          "ignore": false,
          "reason": [],
          "descriptions": {}
        },
        {
          "name": "datetime_kind",
          "signature": "datetime_kind?: Date",
          "required": false,
          "type": {
            "_kind": "type",
            "value": "Date",
            "isArray": false
          },
          "description": [],
          "examples": [],
          "deprecated": false,
          "ignore": false,
          "reason": [],
          "descriptions": {}
        },
        {
          "name": "enum_kind",
          "signature": "enum_kind?: 'a' | 'b'",
          "required": false,
          "type": {
            "_kind": "enum",
            "values": [
              "\"a\"",
              "\"b\""
            ],
            "isArray": false
          },
          "description": [],
          "examples": [],
          "deprecated": false,
          "ignore": false,
          "reason": [],
          "descriptions": {}
        },
        {
          "name": "enum_t_kind",
          "signature": "enum_t_kind?: City",
          "required": false,
          "type": {
            "_kind": "enum",
            "values": [
              "\"A\"",
              "\"B\"",
              "\"C\""
            ],
            "isArray": false
          },
          "description": [],
          "examples": [],
          "deprecated": false,
          "ignore": false,
          "reason": [],
          "descriptions": {}
        },
        {
          "name": "int",
          "signature": "int?: number",
          "required": false,
          "type": {
            "_kind": "number",
            "isArray": false
          },
          "description": [],
          "examples": [],
          "deprecated": false,
          "ignore": false,
          "reason": [],
          "descriptions": {}
        },
        {
          "name": "int_kind",
          "signature": "int_kind?: number",
          "required": false,
          "type": {
            "_kind": "number",
            "isArray": false
          },
          "description": [],
          "examples": [],
          "deprecated": false,
          "ignore": false,
          "reason": [],
          "descriptions": {}
        },
        {
          "name": "json1",
          "signature": "json1?: Record<string,any>",
          "required": false,
          "type": {
            "_kind": "type",
            "value": "object",
            "isArray": false
          },
          "description": [],
          "examples": [],
          "deprecated": false,
          "ignore": false,
          "reason": [],
          "descriptions": {}
        },
        {
          "name": "json_kind",
          "signature": "json_kind?: Record<string,any>",
          "required": false,
          "type": {
            "_kind": "type",
            "value": "object",
            "isArray": false
          },
          "description": [],
          "examples": [],
          "deprecated": false,
          "ignore": false,
          "reason": [],
          "descriptions": {}
        },
        {
          "name": "kind_kind",
          "signature": "kind_kind?: 'k'",
          "required": false,
          "type": {
            "_kind": "kind",
            "value": "\"k\"",
            "isArray": false
          },
          "description": [],
          "examples": [],
          "deprecated": false,
          "ignore": false,
          "reason": [],
          "descriptions": {}
        },
        {
          "name": "number",
          "signature": "number?: number",
          "required": false,
          "type": {
            "_kind": "number",
            "isArray": false
          },
          "description": [],
          "examples": [],
          "deprecated": false,
          "ignore": false,
          "reason": [],
          "descriptions": {}
        },
        {
          "name": "number_kind",
          "signature": "number_kind?: number",
          "required": false,
          "type": {
            "_kind": "number",
            "isArray": false
          },
          "description": [],
          "examples": [],
          "deprecated": false,
          "ignore": false,
          "reason": [],
          "descriptions": {}
        },
        {
          "name": "string",
          "signature": "string: string",
          "required": true,
          "type": {
            "_kind": "string",
            "isArray": false
          },
          "description": [],
          "examples": [],
          "deprecated": false,
          "ignore": false,
          "reason": [],
          "descriptions": {}
        },
        {
          "name": "string_kind",
          "signature": "string_kind?: string",
          "required": false,
          "type": {
            "_kind": "string",
            "isArray": false
          },
          "description": [],
          "examples": [],
          "deprecated": false,
          "ignore": false,
          "reason": [],
          "descriptions": {}
        },
        {
          "name": "typeUnion_kind",
          "signature": "typeUnion_kind?: T1 | T2",
          "required": false,
          "type": {
            "_kind": "typeUnion",
            "values": [
              "T1",
              "T2"
            ],
            "isArray": false
          },
          "description": [],
          "examples": [],
          "deprecated": false,
          "ignore": false,
          "reason": [],
          "descriptions": {}
        },
        {
          "name": "type_kind",
          "signature": "type_kind?: T1",
          "required": false,
          "type": {
            "_kind": "type",
            "value": "T1",
            "isArray": false
          },
          "description": [],
          "examples": [],
          "deprecated": false,
          "ignore": false,
          "reason": [],
          "descriptions": {}
        }
      ],
      "description": [],
      "examples": [],
      "deprecated": false,
      "ignore": false,
      "reason": [],
      "descriptions": {}
    },
    {
      "name": "NonEmptyArray",
      "isExported": true,
      "signature": "export interface NonEmptyArray<A> extends Array<A> {\n    0: A\n}",
      "implements": [
        "Array",
        "Array",
        "Array",
        "Array",
        "Array",
        "Array"
      ],
      "methods": [],
      "fields": [
        {
          "name": "0",
          "signature": "0: A",
          "required": true,
          "type": {
            "_kind": "type",
            "value": "A",
            "isArray": false
          },
          "description": [],
          "examples": [],
          "deprecated": false,
          "ignore": false,
          "reason": [],
          "descriptions": {}
        }
      ],
      "description": [
        "Code generated by github.com/macoolka/macoolka-gen-model, DO NOT EDIT."
      ],
      "examples": [],
      "deprecated": false,
      "ignore": false,
      "reason": [],
      "descriptions": {}
    },
    {
      "name": "T1",
      "isExported": true,
      "signature": "export interface T1 {\n  name1: string\n}",
      "implements": [],
      "methods": [],
      "fields": [
        {
          "name": "name1",
          "signature": "name1: string",
          "required": true,
          "type": {
            "_kind": "string",
            "isArray": false
          },
          "description": [],
          "examples": [],
          "deprecated": false,
          "ignore": false,
          "reason": [],
          "descriptions": {}
        }
      ],
      "description": [],
      "examples": [],
      "deprecated": false,
      "ignore": false,
      "reason": [],
      "descriptions": {}
    },
    {
      "name": "T2",
      "isExported": false,
      "signature": "interface T2 {\n  name2?: string\n}",
      "implements": [],
      "methods": [],
      "fields": [
        {
          "name": "name2",
          "signature": "name2?: string",
          "required": false,
          "type": {
            "_kind": "string",
            "isArray": false
          },
          "description": [],
          "examples": [],
          "deprecated": false,
          "ignore": false,
          "reason": [],
          "descriptions": {}
        }
      ],
      "description": [],
      "examples": [],
      "deprecated": false,
      "ignore": false,
      "reason": [],
      "descriptions": {}
    }
  ],
  "typealiases": [
    {
      "name": "City",
      "signature": "export type City = 'A' | 'B' | 'C'",
      "description": [],
      "examples": [],
      "deprecated": false,
      "ignore": false,
      "reason": [],
      "descriptions": {}
    },
    {
      "name": "Empty",
      "signature": "export type Empty = never",
      "description": [],
      "examples": [],
      "deprecated": false,
      "ignore": false,
      "reason": [],
      "descriptions": {}
    }
  ],
  "classes": [],
  "exports": [],
  "functions": [],
  "constants": [],
  "description": [
    "Code generated by github.com/macoolka/macoolka-gen-model, DO NOT EDIT."
  ],
  "examples": [],
  "file": false,
  "deprecated": false,
  "ignore": false,
  "reason": [],
  "descriptions": {}
}

export default a
