import { useState } from "react"
import SupportChat from "./SupportChat"


const SupportChatContainer = () =>{

    const [toggleChat, setToggleChat] = useState(false)
    const [count,setCount] = useState(0)

    return(
        <div className="support-chat-container position-fixed border border-1 bg-white w-25 bottom-0 end-0">
            <div className="support-chat-header d-flex justify-content-between border-bottom" onClick={() => setToggleChat(!toggleChat)} style={{cursor: 'pointer'}}>
                <h3>Support Chat</h3>
                <span>{count} Online Admins</span>
            </div>
            {toggleChat ? <SupportChat setCount={setCount}/> : <></> }
        </div>
    )
}


//TODO : make support-chat-header like a small button and move title to support chat with admin count (move count,setCount to supportchat)
//TODO : add classlists .show .hide every time button is clicked and toggle header and SupportChat compoennt separately 

export default SupportChatContainer