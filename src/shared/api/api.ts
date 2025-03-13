import axios from 'axios'
import { USER_LOCAL_STORAGE_KEY } from '@/shared/constants/localstorage'

export const $api = axios.create({
    baseURL: 'http://localhost:8000',
})

$api.interceptors.request.use((config) => {
    if (config.headers) {
        // TODO проверить

        config.headers.Authorization = localStorage.getItem(
            USER_LOCAL_STORAGE_KEY || '',
        )
    }

    return config
})
