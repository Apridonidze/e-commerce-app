import axios from "axios"
import { useState } from "react"
import { BACKEND_URL } from "../../config"
import { useCookies } from "react-cookie"
import { useEffect } from "react"

const SupportChat = () => {

    const [ cookies ] = useCookies(['token'])

    const [input, setInput] = useState('')

    const handleMessageSend = async(e) => {
        e.preventDefault()

        //add input filtering here

        try{

            await axios.post(`${BACKEND_URL}/support-chat/send-user-message`, {content : input} , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => console.log(resp))
            
        }catch(err){
            console.log(err)
        }
    }

    const RecieveMessage = async () => {
        try{
            await axios.get(`${BACKEND_URL}/support-chat` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => console.log(resp.data))
        }catch(err){
            console.log(err)
        }
    }


    useEffect(() => {
        RecieveMessage() //mount on messsages change
    },[])

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
                        <input type="text" className="form-control" placeholder="Send Message..." onChange={(e) => setInput(e.target.value)} value={input}/>
                        <input type="submit" className="btn btn-primary" value='Send'/>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default SupportChat