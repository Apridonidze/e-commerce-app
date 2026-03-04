import { useState } from 'react';

import AdminSupportChat from '../admin/containers/AdminSupportChat';
import AdminSupportChatSidebar from '../admin/containers/AdminSupportChatSidebar'

const AdminSupportChatContainer = () => {

    const [targetConvId, setTargetConvId] = useState(null)

    return(
        <div className="admin-support-chat-container d-flex">
            <AdminSupportChatSidebar setTargetConvId={setTargetConvId} />
            {targetConvId ? <AdminSupportChat targetConvId={targetConvId}/> : 'No chats targeted    '}
        </div>
    )
}

export default AdminSupportChatContainer;