const EmptyChat = () => {
    return(
        <div className="empty-chat-container mt-2 p-3">
            <h2 className="fw-bold mt-3">No chat selected</h2>
            <div className="d-flex flex-column">
                <h6>Select a conversation to start chatting</h6>
                <span className="small">Your messages will appear here once you choose a chat</span>
            </div>
        </div>
    )
}

export default EmptyChat