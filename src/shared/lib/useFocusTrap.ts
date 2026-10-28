import { useEffect, type RefObject } from 'react'

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export const useFocusTrap = (containerRef: RefObject<HTMLElement | null>, active: boolean): void => {
    useEffect(() => {
        if (!active) return

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'Tab') return

            const container = containerRef.current
            if (!container) return

            const focusable = Array
                .from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
                .filter((element) => !element.closest('[inert]'))

            if (focusable.length === 0) {
                event.preventDefault()
                container.focus()
                return
            }

            const first = focusable[0]
            const last = focusable[focusable.length - 1]
            const current = document.activeElement

            if (event.shiftKey) {
                if (current === first || !container.contains(current)) {
                    event.preventDefault()
                    last.focus()
                }
            } else if (current === last || !container.contains(current)) {
                event.preventDefault()
                first.focus()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [containerRef, active])
}
