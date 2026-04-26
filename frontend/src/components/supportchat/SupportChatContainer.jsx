import { useState } from "react"; //importing react hook
import SupportChat from "./SupportChat";//importing componnent

import '../../styles/supportchat.css'

const SupportChatContainer = ({ setToggleChat , toggleChat}) =>{


    return(
        <div className="support-chat-main-container text-center align-items-center rounded-5" style={{cursor: 'pointer'}}>
           
            {!toggleChat ? 
                <div className="support-chat-toggle p-2 rounded-3"  onClick={() => setToggleChat(!toggleChat)} style={{backgroundColor : '#10b981'}} >
                    <i class="fa-regular fa-message text-white fs-4 p-1"></i>
                </div> : 
            <></>}


        </div>
    );
};

export default SupportChatContainer; //exporting component