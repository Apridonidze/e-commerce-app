import { useCookies } from "react-cookie";
import { useEffect, useRef, useState } from "react";

import { BACKEND_URL } from "../../config";

const AdminSupportChatSidebar = ({ setTargetConvId, targetConvId }) => {

    const [ cookies ] = useCookies(['token'])
    const socketRef = useRef(null);

    const [rooms,setRooms] = useState([])
    
    useEffect(() => {
        
        socketRef.current = new WebSocket(`ws://${BACKEND_URL.split('/')[2]}?token=${cookies.token}&gainAdminAccess=${true}`)
    
        socketRef.current.onopen = () => {

            console.log('connected to websocket')
        }
    
        socketRef.current.onmessage = (event) => {

            const response = JSON.parse(event.data)
    
            if(response.type === 'recieve_conv_ids'){
                setRooms(response.rooms)
            }
    
            if(response.type === 'admin_access'){
                console.log(response)
            }

            if(response.type === 'internal_error'){
                console.log(response)
            }

    
        }
    
        return () => {socketRef.current?.close()}
    },[])

    console.log('rooms' , rooms)
    return(
        <div className="admin-support-chat-sidebar">
            
        </div>
    )
}

export default AdminSupportChatSidebar;