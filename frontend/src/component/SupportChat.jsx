import axios from "axios"
import { useCookies } from "react-cookie"
import { useEffect , useState } from "react"

import { BACKEND_URL } from "../../config"

import { io } from "socket.io-client"

const SupportChat = () => {

    const [ cookies ] = useCookies(['token'])

    const [input, setInput] = useState('')
    const [messages , setMessages] = useState([])

    const socket = io(BACKEND_URL)


    useEffect(() => {},[]) //function to recieve messages when user is online and once new message is created + join socket 

    const handleMessageSend = async(e) => {
        e.preventDefault()


        //send message via axios to server
    } //function to send messages to server

    useEffect(() => {
        const fetchMessages = async() => {
            try{

                await axios.get(`${BACKEND_URL}/support-chat` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) })

            }catch(err){
                console.log(err)
            }
        }

        fetchMessages()
    },[])

    return(
        <div className="support-chat-container position-fixed border border-1 bg-white w-25 bottom-0 end-0">
            <div className="support-chat-header d-flex justify-content-between">
                <h4>Support Chat</h4>
                
            </div>

            <div className="support-chat-header d-flex flex-column">
                {messages?.map((m , mId) => <span key={mId}>{m.content}</span>)}
            </div>

            <div className="support-chat-header">
                <form onSubmit={handleMessageSend}>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Send Message..." onChange={(e) => setInput(e.target.value)} value={input}/>
                        <input type="submit" className="btn btn-primary" value='Send'/>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default SupportChat