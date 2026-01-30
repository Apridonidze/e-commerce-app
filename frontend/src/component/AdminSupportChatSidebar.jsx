import { useCookies } from "react-cookie";
import { useEffect, useRef, useState } from "react";

import { BACKEND_URL } from "../../config";

const AdminSupportChatSidebar = ({ setTargetConvId }) => {

    const [ cookies ] = useCookies(['token'])
    const socketRef = useRef(null);

    const [rooms,setRooms] = useState([])
    
    useEffect(() => {
        
        socketRef.current = new WebSocket(`ws://${BACKEND_URL.split('/')[2]}?token=${cookies.token}&gainAdminAccess=${true}&conversation_id=${null}`)
    
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
        <div className="admin-support-chat-sidebar border" >

            <div className="row">
                <span className="d-flex align-items-top gap-3"><i class="fa-solid fa-arrow-left"></i>
                <h4>Support Chat</h4></span>
            </div>

            <div className="row w-100">
                {rooms.length === 0 ? 'no messages yet' : rooms?.map((room,roomId) => (
                    <div className="message d-flex gap-3 border align-items-center justify-content-start" style={{fontWeight : room.sender_id !== 'You' ? 'bolder' : "lighter" , cursor : 'pointer'}} key={roomId} onClick={() => setTargetConvId(room.conversation_id)}>
                        <span className="border fs-2 text-secondary rounded-5 text-center m-auto" style={{width: "75px", height: '55px'}}><i class="fa-solid fa-user"></i></span>
                        <span><span className="fw-bolder">{room.fullname}</span> <br /> {room.sender_id} : {room.content} <br />{room.created_at} </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminSupportChatSidebar;