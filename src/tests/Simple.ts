{
  "_tag": "Right",
  "right": {
    "name": "Basic",
    "idUnique": false,
    "interfaces": [
      {
        "name": "Basic",
        "isExported": true,
        "signature": "export interface Basic extends T1, T2 {\n  string: string\n  number?: number\n  date?: Date\n  int?: number\n  boolean?: boolean\n  json1?: Record<string,any>\n  string_kind?: string\n  number_kind?: number\n  int_kind?: number\n  datetime_kind?: Date\n  json_kind?: Record<string,any>\n  boolean_kind?: boolean\n  enum_kind?: 'a' | 'b'\n  enum_t_kind?: City\n  kind_kind?: 'k'\n  type_kind?: T1\n  typeUnion_kind?: T1 | T2\n  add:(\n    string: string,\n    number?: number,\n    date?: Date,\n    int?: number,\n    boolean?: boolean,\n    json1?: Record<string,any>,\n    string_kind?: string,\n    number_kind?: number,\n    int_kind?: number,\n    datetime_kind?: Date,\n    json_kind?: Record<string,any>,\n    boolean_kind?: boolean,\n    enum_kind?: 'a' | 'b',\n    enum_t_kind?: City,\n    kind_kind?: 'k',\n    type_kind?: T1,\n    typeUnion_kind?: T1 | T2,\n  ) => void\n}",
        "fields": [
          {
            "name": "string",
            "required": true,
            "type": "string",
            "description": [],
            "examples": [],
            "file": [],
            "deprecated": false,
            "ignore": false,
            "reason": [],
            "descriptions": {},
            "path": [],
            "unique": false,
            "id": false,
            "readonly": false,
            "order": true,
            "exclusiveCreate": false,
            "exclusiveUpdate": false,
            "exclusiveWhere": false
          },
          {
            "name": "number",
            "required": false,
            "type": "number",
            "description": [],
            "examples": [],
            "file": [],
            "deprecated": false,
            "ignore": false,
            "reason": [],
            "descriptions": {},
            "path": [],
            "unique": false,
            "id": false,
            "readonly": false,
            "order": true,
            "exclusiveCreate": false,
            "exclusiveUpdate": false,
            "exclusiveWhere": false
          },
          {
            "name": "date",
            "required": false,
            "type": {
              "_kind": "type",
              "value": "Date",
              "maybe": false,
              "isArray": false,
              "isArrayRequired": false,
              "defaultEmptyArray": true
            },
            "description": [],
            "examples": [],
            "file": [],
            "deprecated": false,
            "ignore": false,
            "reason": [],
            "descriptions": {},
            "path": [],
            "unique": false,
            "id": false,
            "readonly": false,
            "order": true,
            "exclusiveCreate": false,
            "exclusiveUpdate": false,
            "exclusiveWhere": false
          },
          {
            "name": "int",
            "required": false,
            "type": "number",
            "description": [],
            "examples": [],
            "file": [],
            "deprecated": false,
            "ignore": false,
            "reason": [],
            "descriptions": {},
            "path": [],
            "unique": false,
            "id": false,
            "readonly": false,
            "order": true,
            "exclusiveCreate": false,
            "exclusiveUpdate": false,
            "exclusiveWhere": false
          },
          {
            "name": "boolean",
            "required": false,
            "type": "boolean",
            "description": [],
            "examples": [],
            "file": [],
            "deprecated": false,
            "ignore": false,
            "reason": [],
            "descriptions": {},
            "path": [],
            "unique": false,
            "id": false,
            "readonly": false,
            "order": true,
            "exclusiveCreate": false,
            "exclusiveUpdate": false,
            "exclusiveWhere": false
          },
          {
            "name": "json1",
            "required": false,
            "type": {
              "_kind": "type",
              "value": "object",
              "maybe": false,
              "isArray": false,
              "isArrayRequired": false,
              "defaultEmptyArray": true
            },
            "description": [],
            "examples": [],
            "file": [],
            "deprecated": false,
            "ignore": false,
            "reason": [],
            "descriptions": {},
            "path": [],
            "unique": false,
            "id": false,
            "readonly": false,
            "order": true,
            "exclusiveCreate": false,
            "exclusiveUpdate": false,
            "exclusiveWhere": false
          },
          {
            "name": "string_kind",
            "required": false,
            "type": "string",
            "description": [],
            "examples": [],
            "file": [],
            "deprecated": false,
            "ignore": false,
            "reason": [],
            "descriptions": {},
            "path": [],
            "unique": false,
            "id": false,
            "readonly": false,
            "order": true,
            "exclusiveCreate": false,
            "exclusiveUpdate": false,
            "exclusiveWhere": false
          },
          {
            "name": "number_kind",
            "required": false,
            "type": "number",
            "description": [],
            "examples": [],
            "file": [],
            "deprecated": false,
            "ignore": false,
            "reason": [],
            "descriptions": {},
            "path": [],
            "unique": false,
            "id": false,
            "readonly": false,
            "order": true,
            "exclusiveCreate": false,
            "exclusiveUpdate": false,
            "exclusiveWhere": false
          },
          {
            "name": "int_kind",
            "required": false,
            "type": "number",
            "description": [],
            "examples": [],
            "file": [],
            "deprecated": false,
            "ignore": false,
            "reason": [],
            "descriptions": {},
            "path": [],
            "unique": false,
            "id": false,
            "readonly": false,
            "order": true,
            "exclusiveCreate": false,
            "exclusiveUpdate": false,
            "exclusiveWhere": false
          },
          {
            "name": "datetime_kind",
            "required": false,
            "type": {
              "_kind": "type",
              "value": "Date",
              "maybe": false,
              "isArray": false,
              "isArrayRequired": false,
              "defaultEmptyArray": true
            },
            "description": [],
            "examples": [],
            "file": [],
            "deprecated": false,
            "ignore": false,
            "reason": [],
            "descriptions": {},
            "path": [],
            "unique": false,
            "id": false,
            "readonly": false,
            "order": true,
            "exclusiveCreate": false,
            "exclusiveUpdate": false,
            "exclusiveWhere": false
          },
          {
            "name": "json_kind",
            "required": false,
            "type": {
              "_kind": "type",
              "value": "object",
              "maybe": false,
              "isArray": false,
              "isArrayRequired": false,
              "defaultEmptyArray": true
            },
            "description": [],
            "examples": [],
            "file": [],
            "deprecated": false,
            "ignore": false,
            "reason": [],
            "descriptions": {},
            "path": [],
            "unique": false,
            "id": false,
            "readonly": false,
            "order": true,
            "exclusiveCreate": false,
            "exclusiveUpdate": false,
            "exclusiveWhere": false
          },
          {
            "name": "boolean_kind",
            "required": false,
            "type": "boolean",
            "description": [],
            "examples": [],
            "file": [],
            "deprecated": false,
            "ignore": false,
            "reason": [],
            "descriptions": {},
            "path": [],
            "unique": false,
            "id": false,
            "readonly": false,
            "order": true,
            "exclusiveCreate": false,
            "exclusiveUpdate": false,
            "exclusiveWhere": false
          },
          {
            "name": "enum_kind",
            "required": false,
            "type": {
              "_kind": "typeUnion",
              "values": ["\"a\"", "\"b\""],
              "maybe": false,
              "isArray": false,
              "isArrayRequired": false,
              "defaultEmptyArray": true
            },
            "description": [],
            "examples": [],
            "file": [],
            "deprecated": false,
            "ignore": false,
            "reason": [],
            "descriptions": {},
            "path": [],
            "unique": false,
            "id": false,
            "readonly": false,
            "order": true,
            "exclusiveCreate": false,
            "exclusiveUpdate": false,
            "exclusiveWhere": false
          },
          {
            "name": "enum_t_kind",
            "required": false,
            "type": {
              "_kind": "typeUnion",
              "values": ["\"A\"", "\"B\"", "\"C\""],
              "maybe": false,
              "isArray": false,
              "isArrayRequired": false,
              "defaultEmptyArray": true
            },
            "description": [],
            "examples": [],
            "file": [],
            "deprecated": false,
            "ignore": false,
            "reason": [],
            "descriptions": {},
            "path": [],
            "unique": false,
            "id": false,
            "readonly": false,
            "order": true,
            "exclusiveCreate": false,
            "exclusiveUpdate": false,
            "exclusiveWhere": false
          },
          {
            "name": "kind_kind",
            "required": false,
            "type": {
              "_kind": "kind",
              "value": "\"k\"",
              "maybe": false,
              "isArray": false,
              "isArrayRequired": false,
              "defaultEmptyArray": true
            },
            "description": [],
            "examples": [],
            "file": [],
            "deprecated": false,
            "ignore": false,
            "reason": [],
            "descriptions": {},
            "path": [],
            "unique": false,
            "id": false,
            "readonly": false,
            "order": true,
            "exclusiveCreate": false,
            "exclusiveUpdate": false,
            "exclusiveWhere": false
          },
          {
            "name": "type_kind",
            "required": false,
            "type": {
              "_kind": "type",
              "value": "T1",
              "maybe": false,
              "isArray": false,
              "isArrayRequired": false,
              "defaultEmptyArray": true
            },
            "description": [],
            "examples": [],
            "file": [],
            "deprecated": false,
            "ignore": false,
            "reason": [],
            "descriptions": {},
            "path": [],
            "unique": false,
            "id": false,
            "readonly": false,
            "order": true,
            "exclusiveCreate": false,
            "exclusiveUpdate": false,
            "exclusiveWhere": false
          },
          {
            "name": "typeUnion_kind",
            "required": false,
            "type": {
              "_kind": "typeUnion",
              "values": ["T1", "T2"],
              "maybe": false,
              "isArray": false,
              "isArrayRequired": false,
              "defaultEmptyArray": true
            },
            "description": [],
            "examples": [],
            "file": [],
            "deprecated": false,
            "ignore": false,
            "reason": [],
            "descriptions": {},
            "path": [],
            "unique": false,
            "id": false,
            "readonly": false,
            "order": true,
            "exclusiveCreate": false,
            "exclusiveUpdate": false,
            "exclusiveWhere": false
          },
          {
            "name": "add",
            "required": true,
            "type": {
              "_kind": "type",
              "value": "object",
              "maybe": false,
              "isArray": false,
              "isArrayRequired": false,
              "defaultEmptyArray": true
            },
            "description": [],
            "examples": [],
            "file": [],
            "deprecated": false,
            "ignore": false,
            "reason": [],
            "descriptions": {},
            "path": [],
            "unique": false,
            "id": false,
            "readonly": false,
            "order": true,
            "exclusiveCreate": false,
            "exclusiveUpdate": false,
            "exclusiveWhere": false
          }
        ],
        "description": [],
        "examples": [],
        "file": [],
        "deprecated": false,
        "ignore": false,
        "reason": [],
        "descriptions": {},
        "path": [],
        "methods": [],
        "implements": []
      },
      {
        "name": "NonEmptyArray",
        "isExported": true,
        "signature": "export interface NonEmptyArray<A> extends Array<A> {\n    0: A\n}",
        "fields": [
          {
            "name": "0",
            "required": true,
            "type": {
              "_kind": "type",
              "value": "A",
              "maybe": false,
              "isArray": false,
              "isArrayRequired": false,
              "defaultEmptyArray": true
            },
            "description": [],
            "examples": [],
            "file": [],
            "deprecated": false,
            "ignore": false,
            "reason": [],
            "descriptions": {},
            "path": [],
            "unique": false,
            "id": false,
            "readonly": false,
            "order": true,
            "exclusiveCreate": false,
            "exclusiveUpdate": false,
            "exclusiveWhere": false
          }
        ],
        "description": ["Code generated by github.com/macoolka/macoolka-gen-model, DO NOT EDIT."],
        "examples": [],
        "file": [],
        "deprecated": false,
        "ignore": false,
        "reason": [],
        "descriptions": {},
        "path": [],
        "methods": [],
        "implements": []
      },
      {
        "name": "T1",
        "isExported": true,
        "signature": "export interface T1 {\n  name1: string\n}",
        "fields": [
          {
            "name": "name1",
            "required": true,
            "type": "string",
            "description": [],
            "examples": [],
            "file": [],
            "deprecated": false,
            "ignore": false,
            "reason": [],
            "descriptions": {},
            "path": [],
            "unique": false,
            "id": false,
            "readonly": false,
            "order": true,
            "exclusiveCreate": false,
            "exclusiveUpdate": false,
            "exclusiveWhere": false
          }
        ],
        "description": [],
        "examples": [],
        "file": [],
        "deprecated": false,
        "ignore": false,
        "reason": [],
        "descriptions": {},
        "path": [],
        "methods": [],
        "implements": []
      },
      {
        "name": "T2",
        "isExported": false,
        "signature": "interface T2 {\n  name2?: string\n}",
        "fields": [
          {
            "name": "name2",
            "required": false,
            "type": "string",
            "description": [],
            "examples": [],
            "file": [],
            "deprecated": false,
            "ignore": false,
            "reason": [],
            "descriptions": {},
            "path": [],
            "unique": false,
            "id": false,
            "readonly": false,
            "order": true,
            "exclusiveCreate": false,
            "exclusiveUpdate": false,
            "exclusiveWhere": false
          }
        ],
        "description": [],
        "examples": [],
        "file": [],
        "deprecated": false,
        "ignore": false,
        "reason": [],
        "descriptions": {},
        "path": [],
        "methods": [],
        "implements": []
      }
    ],
    "typealiases": [
      {
        "name": "City",
        "signature": "export type City = 'A' | 'B' | 'C'",
        "description": [],
        "examples": [],
        "file": [],
        "deprecated": false,
        "ignore": false,
        "reason": [],
        "descriptions": {},
        "path": [],
        "type": "string",
        "required": false,
        "isExported": true,
        "fields": [],
        "methods": []
      },
      {
        "name": "Empty",
        "signature": "export type Empty = never",
        "description": [],
        "examples": [],
        "file": [],
        "deprecated": false,
        "ignore": false,
        "reason": [],
        "descriptions": {},
        "path": [],
        "type": "string",
        "required": false,
        "isExported": true,
        "fields": [],
        "methods": []
      }
    ],
    "classes": [],
    "exports": [],
    "functions": [],
    "constants": [],
    "description": ["Code generated by github.com/macoolka/macoolka-gen-model, DO NOT EDIT."],
    "examples": [],
    "file": [],
    "deprecated": false,
    "ignore": false,
    "reason": [],
    "descriptions": {},
    "path": []
  }
}
