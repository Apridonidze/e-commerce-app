import { useCookies } from "react-cookie"; //importing cookies react library
import { BACKEND_URL } from "../../config";//importing backend url from config file
import { useLayoutEffect, useEffect , useRef, useState } from "react";//importing react hooks


const SupportChat = ({ setToggleChat, setToggleAlert }) => {

    const [ cookies ] = useCookies(['token']); //defining cookie

    const [input, setInput] = useState('');
    const [messages , setMessages] = useState([]);
    const [convId, setConvId] = useState() ; //states for chat data

    const [count,setCount] = useState(0); //state to store online admins count

    const socketRef = useRef(null); //ref for websocket connection

    const messagesRef = useRef(null);
    const messageRefs = useRef([null]);
    const statusRefs = useRef([null]);//refs for messages
    

    useEffect(() => {

        socketRef.current = new WebSocket(`ws://${BACKEND_URL.split('/')[2]}?token=${cookies.token}`); //creatingg new websocket connection and passing token in query
        
        socketRef.current.onmessage = (event) => {
            
            const data = JSON.parse(event.data); //defining data that comes from backend websocket
            
            if (data.type === "token_error") {
                setToggleAlert({status: true, type: "Failed", statusCode: 400, message: String(data.message || 'Unknown error')}); //toggling error message component
                socketRef.current.close();//closing websockect connection
            }; //recieving token error message

            if(data.type === 'internal_error'){
                setToggleAlert({status: true, type: "Internal_Error", statusCode: 500, message: String(data.message || 'Unknown error')}); //toggling internal error message component
                socketRef.current.close(); //closing connection
            }; //recieving internal errror message

            if(data.type === 'receive_support_chat_message'){
                setMessages(data.message.reverse()) //setting messages in state for oldest to latest
            }; //recieveing messages

            if(data.type === 'recieve_convid'){

                if(!data.convId) return setToggleAlert({status: true, type: "Internal_Error", statusCode: 500, message: 'Could Not Recieve Conversation Id. Try Later...'}); //returning internal error message if convId is undefined

                setConvId(data.convId); //setting conversation id in state
            }; //recieving conversation id as user

            if(data.type === 'recieve_admin_list'){
                setCount(data.list.length); //setting online admin count in state
            }; //recieving count of online admins

            if(data.type === 'recieve_chat_end'){
                setToggleChat(false); //closing support chat
                setToggleAlert({status: true, type: "Info", statusCode: 200, message: 'Support Closed Conversation'}); //toggling intenral error  message
            }; //recieving recieve_chat_end status when admin ends conversation after help

        };

        return () => socketRef.current?.close(); //cleanup function to trigger useEffect once

    },[]); //websocket connection events 


    useLayoutEffect(() => {
        if (messagesRef.current) {messagesRef.current.scrollTop = messagesRef.current.scrollHeight}; //scrolling user at the end of the chat when opening
    }, [messages]); //using useLayoutEffect to trigger function after component is fully loaded


    const handleMessageSend = (e) => {

        e.preventDefault(); //preventing page load after function triggers

        if(input.trim() === ''|| input.trim().length > 300) return; //returnign empty promise if input is empty or too large

        socketRef.current.send(JSON.stringify({type : 'support_chat_message', text : input , convId : convId})); //else sending our message to websocket
        setInput(''); //clearing state after message is sent
    };

    useEffect(() => {
        if(messageRefs && messageRefs.current && statusRefs && statusRefs.current){ //checking if refs are defined and returning promise below
            statusRefs.current.forEach((el, i) => { //looping messages
                if (!el) return; //returning empty promise if looped ref is undefined

                if (i === statusRefs.current.length - 1) { //toggling message status for last sent message by us if message is defined
                    el.classList.remove('d-none');
                    el.classList.add('d-flex');
                } else { //untoggling message status from every messages except last one
                    el.classList.add('d-none');
                    el.classList.remove('d-flex');
                }
            });
        }
    },[messages]); //displaying your users last message status 'Delivered' , 'Seen' (by admin) on messages state change

    return(
        <div className="support-chat-container" tabIndex={1}>

            <div className="support-chat-header d-flex justify-content-between">
                <div className="header-start text-start border-0">
                    <h4>Support Chat</h4>
                    <h6><i class="fa-solid fa-circle rounded-5" style={{color : count > 0 ? '#10b981' : '#9b9b9b' , fontSize : '14px'}}></i> Online Admins {count}</h6>
                </div>
                <div className="header-end border-0 w-auto">
                    <i onClick={() => setToggleChat(false)} class="fa-solid fa-xmark"></i>
                </div>
            </div>

            <div className="support-chat-main d-flex flex-column border-0 text-end " style={{overflowY : 'scroll'}} ref={messagesRef}>
                {messages?.map((m , mId) => 
                    <span key={mId} className={`d-flex flex-column ${m.sender_name == 'You' ? 'align-self-end' : 'align-self-start'}`} style={{maxWidth : '60%', height:'auto'}}> 
                        <span id="message" ref={(e) => messageRefs.current[mId] = e}  style={{backgroundColor : m.sender_name !== 'You' && '#10b981' , color : m.sender_name !== 'You' && 'white', width: 'fit-content'}} className={`text-start ${m.sender_name == 'You' ? 'align-self-end' : 'align-self-start'} px-2 py-1 rounded-3 fw-medium my-1 text-break`} >{m.content}</span> 
                        <small style={{fontSize : "14px"}} className={`d-none ${m.sender_name == 'You' ? 'align-self-end' : 'align-self-start'}`} ref={(e) => statusRefs.current[mId] = e}>{m.sender_name !== 'You' ? <></> :m.status}</small>
                    </span>)}
            </div>

            <div className="support-chat-footer">
                <form onSubmit={(e) => handleMessageSend(e)}>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Write a message..." disabled={count > 0 && convId ? false : true} onChange={(e) => setInput(e.target.value)} value={input}/>
                        <button type="submit" className="btn border-0" disabled={count > 0 && convId ? false : true} style={{backgroundColor : "#10b981"}}><i class="fa-solid fa-paper-plane text-white"></i></button>
                    </div>
                </form>
            </div>
            
        </div>
    );
};

export default SupportChat; //exporting component