import { useEffect, useRef } from 'react'

export const useMenuLogic = (
    isOpenMenu?: boolean,
    onCloseMenu?: () => void,
) => {
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Element
            const isClickOnModal = target.closest('#modal') !== null

            if (
                menuRef.current
                && !menuRef.current.contains(target)
                && !isClickOnModal
            ) {
                onCloseMenu?.()
            }
        }

        if (isOpenMenu) {
            document.addEventListener('click', handleClickOutside)
            return () => {
                document.removeEventListener('click', handleClickOutside)
            }
        }

        return undefined
    }, [isOpenMenu, onCloseMenu])

    return menuRef
}
