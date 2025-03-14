import { memo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export const Sidebar = memo(() => {
    const location = useLocation()
    const navigate = useNavigate()
    const addHash = (hash: string) => {
        navigate(`${location.pathname}${hash}`)
    }
    return (
        <aside
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
            }}
        >
            <Link to="/">123</Link>
            <Link to="/chat/34">chat</Link>
            <Link to="/login">login</Link>
            <Link to="/registration">registration</Link>
            <button onClick={() => addHash('#settings')}>settings</button>
            <button onClick={() => addHash('#settings.profile')}>
                profile
            </button>
            <button onClick={() => addHash('#settings.general')}>
                general
            </button>
            <button onClick={() => addHash('#settings.security')}>
                security
            </button>
        </aside>
    )
})
