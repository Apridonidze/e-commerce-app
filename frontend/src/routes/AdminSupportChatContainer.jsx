import { useEffect, useState, useRef } from 'react';
import { BACKEND_URL } from '../../config';
import { useCookies } from 'react-cookie';

import AdminSupportChat from '../admin/containers/AdminSupportChat';
import AdminSupportChatSidebar from '../admin/containers/AdminSupportChatSidebar'



const AdminSupportChatContainer = () => {

    const [ cookies ] = useCookies(['token'])
    const socketRef = useRef(null);

    const [targetConvId, setTargetConvId] = useState(null)
    
    
    return(
        <div className="admin-support-chat-container d-flex">
            <AdminSupportChatSidebar setTargetConvId={setTargetConvId} />
            {targetConvId ? <AdminSupportChat targetConvId={targetConvId}/> : 'No chats targeted    '}
        </div>
    )
}

export default AdminSupportChatContainer;