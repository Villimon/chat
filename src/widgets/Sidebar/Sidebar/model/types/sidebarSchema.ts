export type FolderType = {
    value: string
    title: string
}

export interface SidebarSchema {
    page: number
    limit: number
    activeFolder: FolderType
    searchQuery: string
}
