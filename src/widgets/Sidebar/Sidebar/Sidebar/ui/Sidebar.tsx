import { memo } from 'react'
import { SidebarHeader } from '../../SidebarHeader/ui/SidebarHeader'
import { DialogList } from '../../DialogList/ui/DialogList'

export const Sidebar = memo(() => {
    // const location = useLocation()
    // const navigate = useNavigate()
    // const addHash = (hash: string) => {
    //     navigate(`${location.pathname}${hash}`)
    // }

    return (
        <aside>
            <SidebarHeader />
            <DialogList />
            {/* <Link to="/">123</Link>
            <Link to="/chat/34">chat</Link>
            <Link to="/login">login</Link>
            <Link to="/registration">registration</Link>
            <Link to="/asdasdasd">asdasdasd</Link>
            <button onClick={() => addHash('#settings')}>settings</button>
            <button onClick={() => addHash('#settings.profile')}>
                profile
            </button>
            <button onClick={() => addHash('#settings.general')}>
                general
            </button>
            <button onClick={() => addHash('#settings.security')}>
                security
            </button> */}
        </aside>
    )
})
