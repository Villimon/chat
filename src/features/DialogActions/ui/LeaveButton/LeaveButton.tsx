import { FC, memo } from 'react'
import { cn } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/Button'

interface LeaveButtonProps {
    onClick: () => void
    className?: string
}

export const LeaveButton: FC<LeaveButtonProps> = memo(
    ({ onClick, className }) => {
        return (
            <Button
                color="error"
                variant="clear"
                type="button"
                className={cn('', {}, [className])}
                onClick={onClick}
                fullWidth
            >
                Покинуть группу
            </Button>
        )
    },
)
