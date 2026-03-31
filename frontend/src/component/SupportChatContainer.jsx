import { useState } from "react"
import SupportChat from "./SupportChat"


const SupportChatContainer = () =>{

    const [toggleChat, setToggleChat] = useState(false)

    return(
        <div className="support-chat-container position-fixed  rounded-4 text-center align-items-center p-2 bottom-0 end-0 m-5" style={{cursor: 'pointer', backgroundColor : '#10b981'}}>
            <div className="support-chat-header" onClick={() => setToggleChat(!toggleChat)} style={{backgroundColor : '#10b981'}}>
                <i class="fa-regular fa-message text-white fs-4 p-1"></i>
            </div>
            {toggleChat ? <SupportChat  setToggleChat={setToggleChat}/> : <></> }
        </div>
    )
}

//TODO : add classlists .show .hide every time button is clicked and toggle header and SupportChat compoennt separately 

export default SupportChatContainer