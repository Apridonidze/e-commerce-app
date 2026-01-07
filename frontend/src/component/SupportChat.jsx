import axios from "axios"
import { useCookies } from "react-cookie"
import { useEffect , useState } from "react"

import { BACKEND_URL } from "../../config"

import { io } from "socket.io-client"

const SupportChat = () => {

    const [ cookies ] = useCookies(['token'])

    const [input, setInput] = useState('')
    const [messages , setMessages] = useState([])

    const socket = io(BACKEND_URL, {withCredentials : true})


    useEffect(() => {
        if (!socket) return;

        socket.on("connect", () => {
            socket.emit("join", cookies.token);

            socket.on('join' , (message) => {
                console.log(message)
            })

            socket.on('recieveMessage', (message) => {
                
            })//recieve message

            socket.on('adminList' , (adminList) => {
                console.log(adminList) //add state for it to display if admins are active or not in support chat
            })

        });


        return () => socket.off("connect");
}, [socket]);

    const handleMessageSend = (e) => {

        e.preventDefault()

        if(!socket) return; // add error message heree 

        //generate convId via socket.emit('generateConvId') and assign it to frontend
        
        socket.emit('sendMessage', input) //send message 
        
        setInput('')

        socket.on('sendMessage', (message) => {
            setMessages(prev => [...prev , message])
        })

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
                <form onSubmit={handleMessageSend}>
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