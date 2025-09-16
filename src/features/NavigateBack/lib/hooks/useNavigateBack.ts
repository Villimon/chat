interface UseNavigateBackParams {
    hash?: string
    url?: string
}

export const useNavigateBack = ({ hash, url }: UseNavigateBackParams) => {
    const getCleanUrl = (url: string = window.location.href): string => {
        try {
            const urlObj = new URL(url)
            urlObj.hash = hash || ''
            return urlObj.pathname + urlObj.search + urlObj.hash
        } catch (error) {
            console.warn('Invalid URL:', url, error)
            let resultUrl = url.split('#')[0]
            if (hash) {
                resultUrl += hash
            }
            return resultUrl
        }
    }

    const cleanUrl = getCleanUrl(url)
    return cleanUrl
}
