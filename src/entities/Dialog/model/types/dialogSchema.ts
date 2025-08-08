import { User } from '@/entities/User'

export interface Dialog {
    id: string
    type: 'private' | 'group' | 'channel'
    participants: string[] // ID участников
    title?: string // Автогенерация для приватных чатов
    lastMessage: {
        text: string
        senderId: string
        timestamp: string
    }
    unreadCount: number
    avatar?: string
    interlocutor?: User
}

export interface DialogDto {
    currentPage: number
    totalPages: number
    totalItems: number
    data: Dialog[]
}
