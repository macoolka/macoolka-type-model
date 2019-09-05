/**
 * Helper fro print code
 * @desczh
 * 打印代码的帮助函数
 * @file
 */
import { monoidString, fold as _fold } from 'fp-ts/lib/Monoid'
import { pipe } from 'fp-ts/lib/pipeable'
import { notEmpty, notMaybe } from 'macoolka-predicate'
import { MDocumentable } from '../models/Module'
import * as A from 'fp-ts/lib/Array'
const fold = _fold(monoidString)
const indentations: { [key: number]: string } = {
    1: '  ',
    2: '    ',
    3: '      ',
    4: '        ',
    5: '          ',
    6: '            ',
    7: '              ',
    8: '                ',
    9: '                  '
}
/**
 * The define a block node
 * @desczh
 * 定义一个代码块
 * @since 0.2.0
 */
export interface NodeGroup {
    /**
     * Block begin content
     * @desczh
     * 开始内容
     */
    begin: string,
    /**
     * Block end content
     * @desczh
     * 结束内容
     */
    end: string,
    /**
     * indent to root
     * @desczh
     * 缩进
     */
    indent: number,
    /**
     * children node content
     * @desczh
     * 主体内容
     */
    content: Array<string>,
    /**
     * content's split
     * @desczh
     * 主体内容分隔符
     */
    split?: string,
}
/**
 *
 * @since 0.2.0
 */
export interface CodeOption {
    /**
     * Get empty string with a indent unit
     * @desczh
     * 用缩进单位得到空文本
     */
    indentMake?: (i: number) => string,
    /**
     * Hard line
     * @desczh
     * 换行符号
     */
    line?: string,
}
const standIndent = (i: number): string => {
    if (i === 0) {
        return ''
    }
    return notMaybe(indentations[i])
        ? indentations[i]
        : new Array(i).join(`  `)
}

/**
 * The provide a helper about build `block` `line` `item` document.
 * Block containers head and content and end
 * Line mean a statement
 * Item maen a statement and description
 * @desczh
 * 提供一些帮助方法在建立`block` `line` `item`
 *
 * block包含头尾内容，一般用于interface
 * line是一条语句
 * item是包含注释的语句
 * @since 0.2.0
 */
export const formatCode = ({
    indentMake = standIndent,
    line = '\n'
}: CodeOption) => {

    /**
     *
     *
     */
    const formatBlock = ({ begin, end, indent, content, split = '' }: NodeGroup) => {
        return pipe(
            [
                notEmpty(begin) ? (indentMake(indent) + begin) : '',
                pipe(
                    content.join(split)

                ),
                formatLine(indent)(end)

            ],
            fold
        )
    }
    const formatLine = (i: number) => (content: string) => {

        return (indentMake(i) + content + line)
    }
    const formatItem = (i: number, desc: boolean = true) =>
        ({ content, docs: docs }: { content: string, docs: MDocumentable }) => {
            const doc = documentableToString(docs)
            return pipe(
                [
                    desc
                        ? printDescription(i)(doc)
                        : '',
                    notEmpty(content) ? formatLine(i)(content) : ''
                ],
                fold
            )
        }

    function printDescription(indent: number) {
        return (content: Array<string>) => {

            return content.length > 0
                ? formatBlock({
                    begin: `/**` + line,
                    end: ' */',
                    indent: indent,
                    content: content.map(a => pipe(
                        indentMake(indent) + ' * ' + a,
                        formatLine(0)
                    ))

                })
                : ''
        }
    }

    function documentableToString({ deprecated, description, descriptions, ignore, since, examples, reason }: MDocumentable) {
        let content: Array<string> = A.copy(description)

        if (notMaybe(descriptions)) {
            Object.entries(descriptions).map(([key, value]) => {
                const desc = value as Array<string>
                if (desc.length > 0) {

                    content.push(`@desc${key}`)

                    content = content.concat(desc)
                }

            })
        }
        if (notEmpty(examples)) {
            content.push(`@examples`)
            content = content.concat(examples)
        }
        if (deprecated) {
            content.push('@deprecated')
            if (notMaybe(reason)) {
                content = content.concat(reason)
            }
        }
        if (ignore) {
            content.push('@ignore')
        }
        if (notMaybe(since)) {
            content.push(`@since ${since}`)
        }

        return content
    }

    return {
        formatLine,
        formatBlock,
        formatItem,
        fold
    }
}
