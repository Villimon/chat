export {
    useToggleDialogMuteMutation,
    getUserDataByIdQuery,
} from './api/userApi'
export { userReducer, userActions } from './model/slice/UserSlice'
export { getUserInited } from './model/selectors/getUserInited/getUserInited'
export { getUserData } from './model/selectors/getUserData/getUserData'
export type { User } from './model/types/userSchema'
