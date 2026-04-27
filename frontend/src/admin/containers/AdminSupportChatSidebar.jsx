import { useCookies } from "react-cookie";
import { useEffect, useRef, useState } from "react";

import { BACKEND_URL } from "../../../config";

import { Link } from "react-router-dom";
const AdminSupportChatSidebar = ({ setTargetConvId, setToggleAlert,targetConvId }) => {

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
                setToggleAlert()
            }

            if(response.type === 'internal_error'){
                setToggleAlert()
            }

    
        }
    
        return () => {socketRef.current?.close()}
    },[])
    
    return(
        <div className="sidebar-container">

            <div className="sidebar-header pt-3 px-2">
                <h4><i className="fa-solid fa-message"></i>Messages</h4>
            </div>

            <div className="sidebar-section">
                <span className='section-title px-2 pb-1 fw-medium' style={{fontSize : '12px' , letterSpacing : '0.8px'}}>ONGOING CONVERSATIONS</span>

                {rooms.length === 0 ? (
                    <div className="empty-state text-start align-items-start d-flex flex-row gap-3">
                        <i className="fa-regular fa-comments w-auto"></i>
                        <p>No conversations yet</p>
                    </div>
                ) : (

                <div className="conversation-list">
                    {rooms.map((room, roomId) => (
                        <div
                            key={roomId}
                            className={`conversation-item mb-2 ${room.sender_id !== 'You' ? 'unread' : ''} ${room.conversation_id == targetConvId.conversation_id ? 'active' : ''}`}
                            onClick={() => setTargetConvId({conversation_id : room.conversation_id, user : room.fullname})}
                        >

                            <div className="avatar">
                                <i className="fa-solid fa-user"></i>
                            </div>

                            <div className="conversation-content">
                                <div className="conversation-top align-items-center">
                                    <span className="name fw-medium">{room.fullname}</span>
                                    <span className="time">{new Date(room.created_at).toLocaleDateString()}</span>
                                </div>

                                <div className="conversation-bottom">
                                    <span className="message-preview">{room.sender_id}: {room.content}</span>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
                )}
            </div>
        </div>
    )
}

export default AdminSupportChatSidebar;