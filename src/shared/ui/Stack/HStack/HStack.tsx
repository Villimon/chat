import { FC } from 'react'
import { Flex, FlexType } from '../../Stack/Flex/Flex'

type HStackProps = Omit<FlexType, 'direction'>

export const HStack: FC<HStackProps> = (props) => {
    return <Flex {...props} direction="row" />
}
