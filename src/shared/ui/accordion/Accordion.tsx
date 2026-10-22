import { cn } from "@/shared/lib/cn"
import { createContext, useContext, useState } from "react"
import { ChevroneDown } from "@/shared/icons/ChevroneDown"
import './accordion.css'

type AccordionBaseProps = {
    children: React.ReactNode
    className?: string
}

type AccordionRootProps = AccordionBaseProps & {
    defaultOpen?: boolean
}

type AccordionTriggerProps = AccordionBaseProps

type AccordionContentProps = AccordionBaseProps


const AccordionContext = createContext<{ isOpen: boolean; everOpen: boolean; toggle: () => void; } | null>(null)

const useAccordion = () => {
    const ctx = useContext(AccordionContext)
    if (!ctx) throw new Error('Accordion должен быть использован внутри <Accordion>')
    return ctx
}

export const Accordion = ({ children, defaultOpen = false, className }: AccordionRootProps) => {
    const [isOpen, setOpen] = useState(defaultOpen)
    const [everOpen, setEverOpen] = useState(defaultOpen)

    const toggle = () => setOpen(prev => {
        if (!prev) setEverOpen(true)
        return !prev
    })


    return (
        <AccordionContext.Provider value={{ isOpen, toggle, everOpen }}>
            <article className={cn("accordion", className)}>
                {children}
            </article>
        </AccordionContext.Provider>
    )
}

Accordion.Trigger = ({ children, className }: AccordionTriggerProps) => {
    const { isOpen, toggle } = useAccordion()

    return (
        <button
            type="button"
            className={cn("accordion__trigger button", className)}
            aria-expanded={isOpen}
            onClick={toggle}
        >
            {children}
            <span className={cn("accordion__icon", isOpen && "accordion__icon--open")}>
                <ChevroneDown />
            </span>
        </button>
    )
}

Accordion.Content = ({ children, className }: AccordionContentProps) => {
    const { isOpen, everOpen } = useAccordion()

    return (
        <div className={cn("accordion__content-wrapper", isOpen && "accordion__content-wrapper--open")}>
            {everOpen && (
                <div className={cn("accordion__content", className)}>
                    {children}
                </div>
            )}
        </div>
    )
}