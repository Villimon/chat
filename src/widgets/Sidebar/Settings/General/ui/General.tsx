import { memo } from 'react'
import { NavigateBack } from '@/features/NavigateBack'

const General = memo(() => {
    return (
        <aside>
            <NavigateBack hash="#settings" />
        </aside>
    )
})

export default General
