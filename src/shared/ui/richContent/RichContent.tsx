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

const stripCodeBlocks = (content: string) =>
    content.replace(/<pre[\s\S]*?<\/pre>/gi, '').replace(/<code[\s\S]*?<\/code>/gi, '')

const htmlToText = (html: string) =>
    new DOMParser().parseFromString(html, 'text/html').body.textContent || ''

const render = (content: string): ReactNode => {
    if (!HTML_CONTENT_RE.test(content)) {
        return <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    }
    if (MARKDOWN_MARKER_RE.test(stripCodeBlocks(content))) {
        return <Markdown remarkPlugins={[remarkGfm]}>{htmlToText(content)}</Markdown>
    }
    return parseHtml(content)
}

export const RichContent = ({ content, className, ref }: RichContentProps) => {
    if (!content) return null
    return <div ref={ref} className={cn('rich-content', className)}>{render(content)}</div>
}
