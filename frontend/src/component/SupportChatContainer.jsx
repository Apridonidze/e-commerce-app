import { useState } from "react"
import SupportChat from "./SupportChat"


const SupportChatContainer = () =>{

    const [toggleChat, setToggleChat] = useState(false)

    return(
        <div className="support-chat-main-container position-fixed text-center align-items-center rounded-2 bottom-0 end-0 m-5" style={{cursor: 'pointer'}}>
           
            {!toggleChat ? 
                <div className="support-chat-toggle p-2 rounded-3"  onClick={() => setToggleChat(!toggleChat)} style={{backgroundColor : '#10b981'}} >
                    <i class="fa-regular fa-message text-white fs-4 p-1"></i>
                </div> : 
            <></>}

            {toggleChat ? <SupportChat  setToggleChat={setToggleChat}/> :<></> }

        </div>
    )
}

export default SupportChatContainer