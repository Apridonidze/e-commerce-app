import { useEffect, useRef } from 'react';
import { BACKEND_URL } from '../../config';
import { useCookies } from 'react-cookie';

import AdminSupportChatSidebar from './AdminSupportChatSidebar'
import { useState } from 'react';



const AdminSupportChat = () => {

    const [ cookies ] = useCookies(['token'])
    const socketRef = useRef(null);

    const [targetConvId, setTargetConvId] = useState(null)
    
    useEffect(() => {
        socketRef.current = new WebSocket(`ws://${BACKEND_URL.split('/')[2]}?token=${cookies.token}&gainAdminAccess=${true}`)

        socketRef.current.onopen = () => {
            console.log('connected to websocket')
            //check for admin  access , if not permited close connection redirect user to 403 page (create reusable component for this and reuise for adminpanel)

            //give admins possiblity to remove convid and room after they are done helping client with websocket
        }

        socketRef.current.onmessage = (event) => {
            const response = JSON.parse(event.data)

            if(response.type === 'recieve_conv_ids'){
                console.log(response)
            }

            if(response.type === 'admin_access'){
                console.log(response)
            }

        }

        return () => {socketRef.current?.close()}
    },[])

    return(
        <div className="admin-support-chat-container d-flex">
            <AdminSupportChatSidebar setTargetConvId={setTargetConvId} targetConvId={targetConvId}/>
            
        </div>
    )
}

export default AdminSupportChat;