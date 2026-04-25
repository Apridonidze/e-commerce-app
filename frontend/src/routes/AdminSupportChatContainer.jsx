import { useState } from 'react';

import AdminSupportChat from '../admin/containers/AdminSupportChat';
import AdminSupportChatSidebar from '../admin/containers/AdminSupportChatSidebar'
import Header from '../layout/Header';

const AdminSupportChatContainer = () => {

    const [targetConvId, setTargetConvId] = useState(null)


    return(
        <div className="main-container container-fluid d-flex flex-column justify-content-start " style={{maxWidth : '3000px'}}>
            <div className="main-body" >

                <div className="main-start"><AdminSupportChatSidebar setTargetConvId={setTargetConvId} /></div>
                
                <div className="main-end">
                    <div className="main-header"><Header /></div>
                    {targetConvId ? <AdminSupportChat targetConvId={targetConvId} setTargetConvId={setTargetConvId}/> : 'No chats targeted'}
                </div>
            </div>
        </div>
    );
};

export default AdminSupportChatContainer;