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


    useEffect(() => {
        if (!socket || !cookies) return;

        socket.on('adminList' , (adminList) => {
            console.log(adminList) //add state for it to display if admins are active or not in support chat
            //checka adminlist , if it return empty array set setIsAdminOnline to false , else to true to let users know if admin is online
        })


        socket.on('generateConvId', (convId) => {
            setConvId(convId)
        })

        socket.on("connect", () => {
            socket.emit("join", {userCookies: cookies.token , socketId : socket.id});
            
            if(!convId)socket.emit('generateConvId')
            
        });

         

        socket.on('sendMessage', (message) => {
            console.log(message)
        })



        return () => {socket.off("connect"); socket.off("adminList"); socket.off("generateConvId"); socket.off("sendMessage")};
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