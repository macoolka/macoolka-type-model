import en from './en.json'
import zh from './zh.json'
import buildApp, { MessageInfo, MonidI18NMonoid } from 'macoolka-i18n'
import { fold } from 'fp-ts/lib/Monoid'
export const foldI18N = fold(MonidI18NMonoid)
export const defaultOption = {
    defaultLanguage: 'en',
    locale: 'en',
    languages: ['en', 'zh'],
    data: {
        en,
        zh
    }
}
export type Message = MessageInfo<keyof typeof defaultOption.data.en, {
    model: string,
    name: string
}>
export const buildI18N = buildApp<Message>(defaultOption)
export const typeNotFound = (a: {
    model: string,
    name: string
}) => buildI18N({
    id: 'macoolka.data-model.typeNotFound',
    value: a
})

export const typeNameRepeat = (a: {
    model: string,
    name: string
}) => buildI18N({
    id: 'macoolka.data-model.typeNameRepeat',
    value: a
})
export const fieldNameRepeat = (a: {
    model: string,
    name: string
}) => buildI18N({
    id: 'macoolka.data-model.fieldNameRepeat',
    value: a
})
export const idNotFound = (a: {
    model: string,
    name: string
}) => buildI18N({
    id: 'macoolka.data-model.idNotFound',
    value: a
})
export const idRepeat = (a: {
    model: string,
    name: string
}) => buildI18N({
    id: 'macoolka.data-model.idRepeat',
    value: a
})
export default buildI18N
