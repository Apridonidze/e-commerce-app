import { useCookies } from "react-cookie"
import { useLayoutEffect, useEffect , useRef, useState } from "react"

import { BACKEND_URL } from "../../config"


const SupportChat = ({setToggleChat }) => {

    const [ cookies ] = useCookies(['token'])

    const [input, setInput] = useState('')
    const [messages , setMessages] = useState([])
    const [convId, setConvId] = useState() 

    const socketRef = useRef(null)

    const messagesRef = useRef(null)
    const [lastStatus , setLastStatus] = useState('Delivered')
    const [count,setCount] = useState(0)

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
                setLastStatus(data.status)
            }

            if(data.type === 'receive_support_chat_message'){
                console.log(data)
                setMessages(data.message.reverse())
            }

            if(data.type === 'recieve_convid'){
                setConvId(data.convId)
                console.log(data)
            }

            if(data.type === 'recieve_admin_list'){
                setCount(data.list.length)
            }

            if(data.type === 'recieve_chat_end'){
                setToggleChat(false);
            }

//             no_online_admins
// error



        };

        return () => {socketRef.current?.close() };

    },[])


    useLayoutEffect(() => {
        if (messagesRef.current) {messagesRef.current.scrollTop = messagesRef.current.scrollHeight;};
    }, [messages]);


    const handleMessageSend = (e) => {

        e.preventDefault();

        if(input.trim() === '') return;

        socketRef.current.send(JSON.stringify({type : 'support_chat_message', text : input , convId : convId}))

        setInput('')
    }

    return(
        <div className="support-chat-container" tabIndex={1}>

            <div className="support-chat-header ">
                <div className="header-start text-start border-0">
                    <h4>Support Chat</h4>
                    <h6>Online Admins {count}</h6>
                </div>
                <div className="header-end border-0">
                    <i onClick={() => setToggleChat(false)} class="fa-solid fa-xmark"></i>
                </div>
            </div>

            <div className="support-chat-main d-flex flex-column border-0" style={{overflowY : 'scroll'}} ref={messagesRef}>
                {messages?.map((m , mId) => <span key={mId} className={m.sender_name === 'You' ? 'align-self-end' : 'align-self-start'}>{m.content} {m.status}</span>)}
            </div>

            <div className="support-chat-footer">
                <form onSubmit={(e) => handleMessageSend(e)}>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Write a message..." onChange={(e) => setInput(e.target.value)} value={input}/>
                        <button type="submit" className="btn" style={{backgroundColor : "#10b981"}}><i class="fa-solid fa-paper-plane text-white"></i></button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

//TODO : add Message status to only last message that is send by not me 
//TODO : import title and online admins count from SupportChatContainer

export default SupportChat