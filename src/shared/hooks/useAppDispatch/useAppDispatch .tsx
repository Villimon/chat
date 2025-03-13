import { useDispatch } from 'react-redux'
import { AppDisptach } from '@/app/providers/StoreProvider'

export const useAppDispatch = () => useDispatch<AppDisptach>()
