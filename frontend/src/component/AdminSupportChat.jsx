import { BACKEND_URL } from "../../config"
import { useState } from "react"

import { useRef, useEffect } from "react"
import { useCookies } from "react-cookie"

const AdminSupportChat = ({ targetConvId }) => {

    const [cookies] = useCookies(['token'])
    const socketRef = useRef(null)
    const messagesRef = useRef(null)
    const [messages, setMessages] = useState([])

    const [convId, setConvId] = useState(null)
    const [input,setInput] = useState('');
    const [lastStatus, setLastStatus] = useState('Delivered')

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
                setConvId(data.convId)
            }
    
            if(data.type === 'message_status'){
                
                setLastStatus(data.status)
                
            }
    
            if(data.type === 'receive_support_chat_message'){
                console.log(data)
                setMessages(data.message.reverse())
            }
    
        };
      
    
        return () => {socketRef.current?.close() };
    
    },[])


    useEffect(() => {
        
        if(messages[messages.length - 1] && messages[messages.length - 1].status === 'Delivered'){
            socketRef.current.send(JSON.stringify({type : "message_status" , status : 'Seen' , convId : convId}))
        }
        
    },[messages])


     const handleMessageSend = (e) => {

        e.preventDefault();

        if(input.trim() === '') return;

        socketRef.current.send(JSON.stringify({type : 'support_chat_message', text : input , convId : convId}))

        setInput('')
    }
    
    return(
        <div className="admin-support-chat d-flex flex-column w-100">
            <div className="admin-support-char-header row">names</div>
            <div className="support-chat-header d-flex flex-column w-auto border"  ref={messagesRef}>
                {messages?.map((m , mId) => <span key={mId} className={m.sender_name === 'You' ? 'align-self-end' : 'align-self-start'}>{m.content} {m.status}</span>)}
            </div>
            <div className="admin-support-char-footer row">
                <form onSubmit={(e) => handleMessageSend(e)}>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Send Message..." onChange={(e) => setInput(e.target.value)} value={input}/>
                        <input type="submit" className="btn btn-primary" value='Send'/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminSupportChat;