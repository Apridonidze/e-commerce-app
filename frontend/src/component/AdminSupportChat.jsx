import { useEffect, useRef } from 'react';
import { BACKEND_URL } from '../../config';
import { useCookies } from 'react-cookie';


const AdminSupportChat = () => {

    const [ cookies ] = useCookies(['token'])
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = new WebSocket(`ws://${BACKEND_URL.split('/')[2]}?token=${cookies.token}?gainAdminAccess=${true}`)

        socketRef.current.onopen = () => {
            console.log('connected to websocket')
        }

    },[])

    return(
        <div className="admin-support-chat-container">
            Admin Support Chat
        </div>
    )
}

export default AdminSupportChat;