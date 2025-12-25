const SupportChat = () => {

    const handleMessageSend = (e) => {
        e.preventDefault()
    }

    return(
        <div className="support-chat-container position-fixed border border-1 bg-white w-25 bottom-0 end-0">
            <div className="support-chat-header d-flex justify-content-between">
                <h4>Support Chat</h4>
                
            </div>

            <div className="support-chat-header">
                <h1>Messages</h1>
            </div>

            <div className="support-chat-header">
                <form onSubmit={handleMessageSend}>
                    <div className="input-group">
                        <input type="text" className="form-control"/>
                        <input type="submit" className="btn btn-primary" value='Send'/>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default SupportChat