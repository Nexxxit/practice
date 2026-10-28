import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { parseHtml } from '@/shared/lib/parseHtml'
import { cn } from '@/shared/lib/cn'
import { type ReactNode, type Ref } from 'react'
import './richContent.css'

interface RichContentProps {
    content?: string
    className?: string
    ref?: Ref<HTMLDivElement>
}

const HTML_CONTENT_RE = /<\/?(?:p|h[1-6]|pre|ul|ol|li|div|blockquote|table|img|br|strong|em|code|a)\b/i
const MARKDOWN_MARKER_RE = /```|(^|\n)[ \t]{0,3}#{1,6}\s\S|(^|\n)[ \t]{0,3}(>|&gt;)\s\S|\*\*[^\s*]+\*\*/

const CODE_RE = /(```[\s\S]*?(?:```|$)|`[^`\n]*`)/g

const stripCodeBlocks = (content: string) =>
    content.replace(/<pre[\s\S]*?<\/pre>/gi, '').replace(/<code[\s\S]*?<\/code>/gi, '')

const htmlToText = (html: string) =>
    new DOMParser().parseFromString(html, 'text/html').body.textContent || ''

const ENTITIES: Record<string, string> = {
    nbsp: '\u00A0',
    amp: '&',
    quot: '"',
    apos: "'",
    '#39': "'",
    lt: '<',
    gt: '>',
}

const decodeEntities = (text: string) =>
    text.replace(/&(nbsp|amp|quot|apos|#39|lt|gt);/gi, (whole, name: string) => ENTITIES[name.toLowerCase()] ?? whole)

const maskCode = (content: string) => {
    const chunks: string[] = []
    const masked = content.replace(CODE_RE, (chunk) => {
        chunks.push(chunk)
        return `%%code-${chunks.length - 1}%%`
    })
    return { masked, chunks }
}

const unmaskCode = (content: string, chunks: string[]) =>
    content.replace(/%%code-(\d+)%%/g, (whole, index: string) => decodeEntities(chunks[Number(index)] ?? whole))

const render = (content: string): ReactNode => {
    const { masked, chunks } = maskCode(content)

    if (!HTML_CONTENT_RE.test(masked)) {
        return <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    }
    if (MARKDOWN_MARKER_RE.test(stripCodeBlocks(masked))) {
        return <Markdown remarkPlugins={[remarkGfm]}>{unmaskCode(htmlToText(masked), chunks)}</Markdown>
    }
    return parseHtml(content)
}

export const RichContent = ({ content, className, ref }: RichContentProps) => {
    if (!content) return null
    return <div ref={ref} className={cn('rich-content', className)}>{render(content)}</div>
}
