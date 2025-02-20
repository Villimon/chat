import { FC } from 'react'
import { Flex, FlexType } from '../../Stack/Flex/Flex'

type VStackProps = Omit<FlexType, 'direction'>

export const VStack: FC<VStackProps> = (props) => {
    const { align = 'start' } = props
    return <Flex {...props} align={align} direction="column" />
}
