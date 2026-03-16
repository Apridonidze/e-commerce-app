import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { useEffect , useState, useRef, useContext } from 'react'
import { BACKEND_URL } from '../../config'
import { UserContext } from '../context/UserContext'


const Sidebar = () => {

    const [ cookies ] = useCookies(['token'])
    const [ messagesCount , setMessagesCount] = useState(0)
    const socketRef = useRef(null)
    
    const { user } = useContext(UserContext)

    useEffect(() => {


        socketRef.current = new WebSocket(`ws://${BACKEND_URL.split('/')[2]}?token=${cookies.token}&gainAdminAccess=${true}`)

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data)

            if(data.type === 'recieve_conv_ids'){
                const count = data.rooms.filter(msg => msg.sender_id !== 'You' && msg.status === 'Delivered').length
                setMessagesCount(count)
            }

            if (data.type === "token_error" || data.type === 'internal_error') {
                socketRef.current.close();
            }
        }

        return () => {socketRef.current?.close() };
    },[])



    return(
        <div className="sidebar-container d-flex flex-column justify-content-between border position-sticky w-25 text-break" style={{maxHeight:"100vh"}}>
            <div className="sidebar-top">
                <h1>E-commerce-app-icon</h1>
            </div>
            <div className="sidebar-center row g-4">
                <div className="center-header col-12 h-auto">
                    <div className="text d-flex flex-column">
                        <Link to='/'>Home</Link>
                        <Link>Top Products</Link>
                    </div>
                </div>
                <div className="center-center col-12 h-auto">
                    {cookies?.token ? <div className="text d-flex flex-column">
                        <Link to='/dashboard'>Dashboard</Link>
                        <Link to='/dashboard#cart-items'>Cart</Link>
                        <Link to='/dashboard#order-list'>Orders</Link>
                    </div> : <></>}
                </div>
                <div className="center-bottom col-12 h-auto">
                    {user !== null && user.role === 'admin' ? 
                        <div className="text d-flex flex-column gap-3">
                            <div className="text-top d-flex flex-column">
                                <Link to='/admin-dashboard'>Admin Dashboard</Link>
                                <Link to='/admin-dashboard#manage-products'>Manage Products</Link>
                                <Link to='/admin-dashboard#reports'>Reports</Link>
                                <Link to='/admin-dashboard#feedbacks'>Feedbacks</Link>
                            </div>
                            <div className="text-bottom">
                                <Link to='/admin-dashboard/admin-support-chat'>Support Chat <span>{messagesCount}</span></Link> {/* add limit for messageCount (max 9 , after 9 return 9+) */}
                            </div>
                        </div> : <></>
                    }
                </div>
                <div className="center-auth col-12 h-auto">
                    {!cookies.token ? <div className="text d-flex flex-column">
                        <Link to='/login'>Login</Link>
                        <Link to='/sign'>Sign</Link>
                    </div> : <></>}
                </div>
            </div>
            <div className="sidebar-end"> 
                
                <div className="end-start">
                    <Link to={'/faq'}>FAQ</Link>
                    <Link>Feedback</Link>
                    <Link>Report</Link>
                </div>
                <div className="end-bottom">
                    <span>Terms</span>
                    <span>Privacy</span>
                    <span>Policy</span>
                    <span>copyright 2022</span>
                </div>
            </div>
        </div>
    )
}

//add user account in sidebar footer + move settings to very bottom and assign it as a gear icon , remove sidebar-end texts that will collide with user component

export default Sidebar