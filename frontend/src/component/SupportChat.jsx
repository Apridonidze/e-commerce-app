import axios from "axios"
import { useCookies } from "react-cookie"
import { useEffect , useState } from "react"

import { BACKEND_URL } from "../../config"

import { io } from "socket.io-client"

const SupportChat = () => {

    const [ cookies ] = useCookies(['token'])

    const [input, setInput] = useState('')
    const [messages , setMessages] = useState([])

    const [convId, setConvId] = useState() 

    const socket = io(BACKEND_URL, {withCredentials : true})

    const [admin , setadmin] = useState()


    useEffect(() => {
        if (!socket || !cookies) return;

        socket.on('generateConvId', (convId) => {
            setConvId(convId)
        })

        socket.on("connect", () => {
            socket.emit("join");
            
            if(!convId)socket.emit('generateConvId')
                
        });

        socket.on('recieveMessage', (message) => {
            setMessages(message)
        })

        socket.on('adminsOnline', (adminList) => {
            console.log(adminList)
        })

        return () => {socket.off('adminsOnline') , socket.off('generateConvId') , socket.off('recieveMessage') , socket.off('connect')};
    }, [socket, convId]);


    const handleMessageSend = (e) => {

        e.preventDefault()

        if(!socket || !convId) return; // add disabled input and send button for this event.
        
        socket.emit('sendMessage', ({message: input , convId : convId})) //send message 
        
        setInput('')
        
    }

    console.log(convId)
    
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