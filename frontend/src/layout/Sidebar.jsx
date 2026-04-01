import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { useEffect , useState, useRef, useContext } from 'react'
import { BACKEND_URL } from '../../config'
import { UserContext } from '../context/UserContext'
import { useToggle } from "../context/ThemeContext";

import '../styles/layout.css'

const Sidebar = () => {

    const [ cookies ] = useCookies(['token'])
    const [ messagesCount , setMessagesCount] = useState(0)
    const socketRef = useRef(null)
    const containerRef=  useRef(null)
    const backgroundRef = useRef(null)
    const { user } = useContext(UserContext)
    const { toggle , toggleSidebar} = useToggle()


    useEffect(() => {
        if(containerRef && containerRef.current && backgroundRef && backgroundRef.current){
        
            if(toggle){containerRef.current.classList.add("active") ; backgroundRef.current.classList.add('active')}
            if(!toggle){containerRef.current.classList.remove("active") ; backgroundRef.current.classList.remove('active')}
        }
    },[toggle,containerRef, backgroundRef])

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
        <div className="sidebar-main-container">
            <div className="sidebar-background" ref={backgroundRef} onClick={() => toggleSidebar(false)}></div>
            <div className="sidebar-container d-flex flex-column justify-content-between "  ref={containerRef} style={{height:"97vh"}}>
                <div className="sidebar-top">
                    <div className="icon-container d-flex align-items-center gap-3">
                        <span className="icon"></span>
                        <span className='fs-3 fw-bold' style={{color : "#10b981"}}>Shoptic</span>
                    </div>
                </div>
                <div className="sidebar-center row g-4">
                    <div className="center-header col-12 h-auto">
                        <div className="text d-flex flex-column">
                            <Link to='/'>Home</Link>
                            <Link to='/sales'>On Sale</Link>
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
                                    <Link to='/admin-dashboard/admin-support-chat'>Support Chat <span>{messagesCount < 9  ? messagesCount : '9+' }</span></Link> {/* add limit for messageCount (max 9 , after 9 return 9+) */}
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
                        <Link to={`/leave-feedback`}>Feedback</Link>
                        <Link to={'/report-platform'}>Report</Link>
                    </div>
                    <div className="end-main">
                        <Link to={'/legal#terms'}>Terms of Service</Link>
                        <Link to={'/legal#privacy'}>Privacy Policy</Link>
                        <span>Copyright 2026</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar