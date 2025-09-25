export interface Session {
    id: string
    user_id: string
    user_agent: string
    session_token: string
    ip_address: string
    platform: string
    browser: string
    os: string
    created_at: string
    last_activity_at: string
    expires_at: string
}
