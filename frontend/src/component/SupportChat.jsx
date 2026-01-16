import { useCookies } from "react-cookie"
import { useLayoutEffect, useEffect , useRef, useState } from "react"

import { BACKEND_URL } from "../../config"


const SupportChat = () => {

    const [ cookies ] = useCookies(['token'])

    const [input, setInput] = useState('')
    const [messages , setMessages] = useState([])
    const [convId, setConvId] = useState() 

    const socketRef = useRef(null)

    const messagesRef = useRef(null)

    

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
                console.log(data)
                socketRef.current.close();
            }

            if(data.type === 'message_status'){
                console.log(data.message)
            }

            if(data.type === 'recieve_support_chat_message'){
                console.log(data)
                setMessages(data.message.reverse())
            }

            if(data.type === 'recieve_convid'){
                setConvId(data.convId)
            }

            if(data.type === 'recieve_admin_list'){
                console.log(data)
            }

        };


        return () => {socketRef.current?.close() };

    },[])


    useLayoutEffect(() => {
        if (messagesRef.current) {messagesRef.current.scrollTop = messagesRef.current.scrollHeight;};
    }, [messages]);


    const handleMessageSend = (e) => {

        e.preventDefault();

        //filter input

        if(!convId) return;

        socketRef.current.send(JSON.stringify({type : 'support_chat_message', text : input , convId : convId}))

        setInput('')
    }

console.log(messages)

    return(
        <div className="support-chat-container position-fixed border border-1 bg-white w-25 bottom-0 end-0" tabIndex={1}>
            <div className="support-chat-header d-flex justify-content-between">
                <h4>Support Chat</h4>
                
            </div>

            <div className="support-chat-header d-flex flex-column" style={{maxHeight : "300px" , overflowY : 'scroll'}} ref={messagesRef}>
                {messages?.map((m , mId) => <span key={mId} className={m.sender_name === 'You' ? 'align-self-end' : 'align-self-start'}>{m.content}</span>)}
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