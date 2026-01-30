import { BACKEND_URL } from "../../config"

import { useRef, useEffect } from "react"
import { useCookies } from "react-cookie"

const AdminSupportChat = ({ targetConvId }) => {

    const [cookies] = useCookies(['token'])
    const socketRef = useRef(null)

    useEffect(() => {
    
        socketRef.current = new WebSocket(`ws://${BACKEND_URL.split('/')[2]}?token=${cookies.token}&gainAdminAccess=${true}`)
            
        socketRef.current.onopen = () => {
            console.log('connected')

            if(targetConvId){socketRef.current.send(JSON.stringify({type : 'join_conv', convId : targetConvId}))}
        }
    
        socketRef.current.onmessage = (event) => {
                
            const data = JSON.parse(event.data);
                
            if (data.type === "token_error") {
                alert("Token error: " + data.message);
                socketRef.current.close();
            }
    
            if(data.type === 'internal_error'){
                console.log(data)
                socketRef.current.close();
            }


              if(data.type === 'conv_info'){
                console.log(data)
                //set convid
            }
    
            if(data.type === 'message_status'){
                console.log(data.message)
            }
    
            if(data.type === 'receive_support_chat_message'){
                console.log(data)
            }

          
    
        };
    
        return () => {socketRef.current?.close() };
    
    },[targetConvId])
    
    return(
        <div className="admin-support-chat">
            <div className="admin-support-char-header row"></div>
            <div className="admin-support-char-main row">
                {targetConvId}
            </div>
            <div className="admin-support-char-footer row"></div>
        </div>
    )
}

export default AdminSupportChat;