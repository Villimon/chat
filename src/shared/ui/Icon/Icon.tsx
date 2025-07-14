import { FC, memo, NamedExoticComponent } from 'react'
import cls from './Icon.module.scss'
import { cn } from '@/shared/lib/classNames/classNames'

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>

interface IconBaseProps extends SvgProps {
    className?: string
    Svg: React.FC<React.SVGProps<SVGSVGElement>>
}

interface NonClickableIconProps extends IconBaseProps {
    clickable?: false
}

interface ClickableBaseProps extends IconBaseProps {
    clickable: true
    onClick: () => void
}

type IconProps = ClickableBaseProps | NonClickableIconProps

export const Icon: FC<IconProps> = memo((props) => {
    const {
        Svg,
        width = 32,
        height = 32,
        clickable,
        className,
        ...otherProps
    } = props

    const icon = (
        <Svg
            width={width}
            height={height}
            className={cn(cls.Icon, {}, [className])}
            onClick={undefined}
            {...otherProps}
        />
    )

    if (clickable) {
        return (
            <button
                type="button"
                className={cls.button}
                onClick={props.onClick}
                style={{ height, width }}
            >
                {icon}
            </button>
        )
    }

    return icon
}) as NamedExoticComponent<IconProps>
Icon.displayName = 'Icon'
