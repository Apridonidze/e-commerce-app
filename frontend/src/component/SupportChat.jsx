import axios from "axios"
import { useCookies } from "react-cookie"
import { useEffect , useRef, useState } from "react"

import { BACKEND_URL } from "../../config"


const SupportChat = () => {

    const [ cookies ] = useCookies(['token'])

    const [input, setInput] = useState('')
    const [messages , setMessages] = useState([])
    const [convId, setConvId] = useState(123) 

    const socketRef = useRef(null)

    useEffect(() => {

        socketRef.current = new WebSocket(`ws://${BACKEND_URL.split('/')[2]}?token=${cookies.token}`)
        
        socketRef.current.onopen = () => {
            console.log('connected')
        }

        socketRef.current.onmessage = (event) => {
            
            const data = JSON.parse(event.data);
            
            if (data.type === "token_error") {
                alert("Token error: " + data.message);
                socketRef.current.close();
            }

            if(data.type === 'internal_error'){
                alert(data.message)
                socketRef.current.close();
            }

            if(data.type === 'message_status'){
                alert(data.message)
            }




        };


        return () => socketRef.current?.close();

    },[])

    const handleMessageSend = (e) => {

        e.preventDefault();

        socketRef.current.send(JSON.stringify({type : 'support_chat_message',text : input , convId : convId}))
        setInput('')
    }

    return(
        <div className="support-chat-container position-fixed border border-1 bg-white w-25 bottom-0 end-0">
            <div className="support-chat-header d-flex justify-content-between">
                <h4>Support Chat</h4>
                
            </div>

            <div className="support-chat-header d-flex flex-column">
                {messages?.map((m , mId) => <span key={mId}>{m.content}</span>)}
            </div>

            <div className="support-chat-header">
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

export default SupportChat