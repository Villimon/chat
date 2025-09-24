import { useCallback } from 'react'
import { FirstDisplayLayout } from '../FirstDisplayLayout/FirstDisplayLayout'
import { DialogLayoutBox } from '../DialogLayoutBox/DialogLayoutBox'
import { DialogLayout } from '@/shared/constants/theme'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { SecondDisplayLayout } from '../SecondDisplayLayout/SecondDisplayLayout'
import { useAppearance } from '@/shared/hooks/useAppearance/useAppearance'

export const dialogLayoutItems = [
    {
        id: '1',
        dialogLayout: DialogLayout.EXPANDED,
        title: 'Развернутый',
        Content: <FirstDisplayLayout />,
    },
    {
        id: '2',
        dialogLayout: DialogLayout.COMPACT,
        title: 'Компактный',
        Content: <SecondDisplayLayout />,
    },
]

export const DialogLayoutToggle = () => {
    const { dialogLayout, toggleDialogLayout } = useAppearance()

    const onToggleDialogLayoutHandler = useCallback(
        (dialogLayout: DialogLayout) => {
            toggleDialogLayout(dialogLayout)
        },
        [toggleDialogLayout],
    )

    return (
        <HStack gap="8">
            {dialogLayoutItems.map((item) => (
                <DialogLayoutBox
                    onClick={onToggleDialogLayoutHandler}
                    selected={dialogLayout === item.dialogLayout}
                    key={item.id}
                    display={item.dialogLayout}
                    title={item.title}
                    content={item.Content}
                />
            ))}
        </HStack>
    )
}
