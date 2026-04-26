import { useState } from 'react';

import AdminSupportChat from '../admin/containers/AdminSupportChat';
import AdminSupportChatSidebar from '../admin/containers/AdminSupportChatSidebar'
import Header from '../layout/Header';

import '../styles/supportchat.css'

const AdminSupportChatContainer = () => {

    const [targetConvId, setTargetConvId] = useState({conversation_id : null, user : null})
    const [toggleAlert, setToggleAlert] = useState({status : false , type: '', statusCode : null, message : ''}); //states to toggle components

    return(
        <div className="main-container container-fluid d-flex flex-column justify-content-start " style={{maxWidth : '3000px'}}>
                {toggleAlert?.status ? <StatusMessage setToggleAlert={setToggleAlert} toggleAlert={toggleAlert}/> : <></>}

            <div className="main-body" >

                <div className="main-start"><AdminSupportChatSidebar setTargetConvId={setTargetConvId} targetConvId={targetConvId} setToggleAlert={setToggleAlert}/></div>
                
                <div className="main-end">
                    <div className="main-header"><Header /></div>
                    {targetConvId ? <AdminSupportChat targetConvId={targetConvId} setTargetConvId={setTargetConvId}/> : 'No chats targeted'}
                </div>
            </div>
        </div>
    );
};

export default AdminSupportChatContainer;