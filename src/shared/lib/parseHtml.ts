import parse, { type DOMNode } from 'html-react-parser'
import DOMPurify from 'dompurify'

const stripCodeStyles = (node: DOMNode) => {
    if (node.type === 'tag' && (node.name === 'pre' || node.name === 'code')) {
        delete node.attribs.style
    }
}

export const parseHtml = (html: string) => parse(DOMPurify.sanitize(html), { replace: stripCodeStyles })
