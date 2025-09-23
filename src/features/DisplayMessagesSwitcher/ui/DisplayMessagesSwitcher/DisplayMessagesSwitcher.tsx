import { FirstDisplay } from '../FirstDisplay/FirstDisplay'
import { DisplayBox } from '../DisplayBox/DisplayBox'
import { Display } from '@/shared/constants/theme'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { SecondDisplay } from '../SecondDisplay/SecondDisplay'

export const variantsDisplayMessages = [
    {
        id: '1',
        theme: Display.WITH_BACKGROUND,
        title: 'С фоном',
        Content: <FirstDisplay />,
    },
    {
        id: '2',
        theme: Display.WITHOUT_BACKGROUND,
        title: 'Без фона',
        Content: <SecondDisplay />,
    },
]

export const DisplayMessagesSwitcher = () => {
    // TODO: написать свитчер дисплея

    return (
        <HStack gap="8">
            {variantsDisplayMessages.map((item) => (
                <DisplayBox
                    onClick={() => {}}
                    // onClick={onToggleHandlerTheme}
                    selected
                    // selected={display === item.theme}
                    key={item.id}
                    display={item.theme}
                    title={item.title}
                    content={item.Content}
                />
            ))}
        </HStack>
    )
}
