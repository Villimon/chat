import { FC, memo, NamedExoticComponent } from 'react'
import { Flex, FlexType } from '../../Stack/Flex/Flex'

export const HStack: FC<FlexType> = memo((props) => {
    return (
        <Flex
            {...props}
            direction={props.direction ? props.direction : 'row'}
        />
    )
}) as NamedExoticComponent<FlexType>
HStack.displayName = 'HStack'
