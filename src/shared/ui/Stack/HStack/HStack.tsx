import { FC } from 'react'
import { Flex, FlexType } from '../../Stack/Flex/Flex'

export const HStack: FC<FlexType> = (props) => {
    return (
        <Flex
            {...props}
            direction={props.direction ? props.direction : 'row'}
        />
    )
}
