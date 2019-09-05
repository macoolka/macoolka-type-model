import en from './en.json'
import zh from './zh.json'
import buildApp, { MessageInfo } from 'macoolka-i18n'
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
export default buildI18N