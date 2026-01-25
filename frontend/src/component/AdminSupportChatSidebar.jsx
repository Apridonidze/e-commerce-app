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

    return(
        <div className="admin-support-chat-sidebar border" style={{minHeight: '100vh'}}>
            {rooms.length === 0 ? 'no messages yet' : rooms?.map((room,roomId) => (
                <div className="message d-flex gap-3 border w-100 align-items-center" key={roomId}>
                    <span className="border fs-2 text-secondary rounded-5 text-center" style={{width: "55px", height: '55px'}}><i class="fa-solid fa-user"></i></span>
                    <span>{room.fullname} <br /> {room.content} <br />{room.created_at}</span>
                </div>
            ))}
        </div>
    )
}

export default AdminSupportChatSidebar;