import { useCookies } from 'react-cookie'
import { NavLink } from 'react-router-dom'
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
                            <NavLink to='/' className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink>
                            <NavLink to='/sales' className={({ isActive }) => isActive ? "active-link" : ""}>On Sale</NavLink>
                        </div>
                    </div>
                    <div className="center-center col-12 h-auto">
                        {cookies?.token ? <div className="text d-flex flex-column">
                            <NavLink to='/dashboard' className={({ isActive }) => isActive ? "active-link" : ""}>Dashboard</NavLink>
                            <NavLink to='/dashboard#cart-items' className={({ isActive }) => isActive ? "active-link" : ""}>Cart</NavLink>
                            <NavLink to='/dashboard#order-list' className={({ isActive }) => isActive ? "active-link" : ""}>Orders</NavLink>
                        </div> : <></>}
                    </div>
                    <div className="center-bottom col-12 h-auto">
                        {user !== null && user.role === 'admin' ? 
                            <div className="text d-flex flex-column gap-3">
                                <div className="text-top d-flex flex-column">
                                    <NavLink to='/admin-dashboard' className={({ isActive }) => isActive ? "active-link" : ""}>Admin Dashboard</NavLink>
                                    <NavLink to='/admin-dashboard#manage-products' className={({ isActive }) => isActive ? "active-link" : ""}>Manage Products</NavLink>
                                    <NavLink to='/admin-dashboard#reports' className={({ isActive }) => isActive ? "active-link" : ""}>Reports</NavLink>
                                    <NavLink to='/admin-dashboard#feedbacks' className={({ isActive }) => isActive ? "active-link" : ""}>Feedbacks</NavLink>
                                </div>
                                <div className="text-bottom">
                                    <NavLink to='/admin-dashboard/admin-support-chat' className={({ isActive }) => isActive ? "active-link" : ""}>Support Chat <span>{messagesCount < 9  ? messagesCount : '9+' }</span></NavLink> {/* add limit for messageCount (max 9 , after 9 return 9+) */}
                                </div>
                            </div> : <></>
                        }
                    </div>
                    <div className="center-auth col-12 h-auto">
                        {!cookies.token ? <div className="text d-flex flex-column">
                            <NavLink to='/login' className={({ isActive }) => isActive ? "active-link" : ""}>Login</NavLink>
                            <NavLink to='/sign' className={({ isActive }) => isActive ? "active-link" : ""}>Sign</NavLink>
                        </div> : <></>}
                    </div>
                </div>
                <div className="sidebar-end"> 
                    <div className="end-start">
                        <NavLink to={'/faq'} className={({ isActive }) => isActive ? "active-link" : ""}>FAQ</NavLink>
                        <NavLink to={`/leave-feedback`} className={({ isActive }) => isActive ? "active-link" : ""}>Feedback</NavLink>
                        <NavLink to={'/report-platform'} className={({ isActive }) => isActive ? "active-link" : ""}>Report</NavLink>
                    </div>
                    <div className="end-main">
                        <NavLink to={'/legal#terms'} className={({ isActive }) => isActive ? "active-link" : ""}>Terms of Service</NavLink>
                        <NavLink to={'/legal#privacy'} className={({ isActive }) => isActive ? "active-link" : ""}>Privacy Policy</NavLink>
                        <span>Copyright 2026</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar