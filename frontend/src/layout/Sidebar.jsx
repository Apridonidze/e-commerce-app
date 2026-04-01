import { useCookies } from 'react-cookie'
import { Link, NavLink } from 'react-router-dom'
import { useEffect , useState, useRef, useContext } from 'react'
import { BACKEND_URL } from '../../config'
import { UserContext } from '../context/UserContext'
import { useToggle } from "../context/ThemeContext";

import '../styles/layout.css'
import { useLocation } from 'react-router-dom'


const Sidebar = () => {

    const [ cookies ] = useCookies(['token'])
    const [ messagesCount , setMessagesCount] = useState(0)
    const socketRef = useRef(null)
    const containerRef=  useRef(null)
    const backgroundRef = useRef(null)
    const { user } = useContext(UserContext)
    const { toggle , toggleSidebar} = useToggle()

const location = useLocation()

    const isActiveHash = (hash) => location.pathname === "/dashboard" && location.hash === hash || location.pathname === "/admin-dashboard" && location.hash === hash

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
                <div className="sidebar-top" style={{minHeight : "87px"}}>
                    <div className="icon-container d-flex align-items-center gap-3">
                        <span className="icon"></span>
                        <span className='fs-3 fw-bold' style={{color : "#10b981"}}>Shoptic</span>
                    </div>
                </div>
                <div className="sidebar-center row h-100" style={{overflowY: "hidden"}}>
                    <div className="center-header col-12 h-auto">
                        <div className="text d-flex flex-column">
                            <span className='p-2 fw-medium' style={{fontSize : '12px' , letterSpacing : '0.8px'}}>SHOPPING</span>
                            <NavLink to='/' className={({ isActive }) => isActive ? "active-link" : ""}><i class="fa-solid fa-house pe-3"></i> Home</NavLink>
                            <NavLink to='/sales' className={({ isActive }) => isActive ? "active-link" : ""}><i class="fa-solid fa-tag pe-3"></i> On Sale</NavLink>
                        </div>
                    </div>
                    <div className="center-center col-12 h-auto">
                        {cookies?.token ? <div className="text d-flex flex-column">
                            <span className='p-2 fw-medium' style={{fontSize : '12px' , letterSpacing : '0.8px'}}>Dashboard</span>
                            <NavLink to='/dashboard' className={({ isActive }) => isActive ? "active-link" : ""}><i class="fa-solid fa-chart-line pe-4"></i> Dashboard</NavLink>
                            <Link to='/dashboard#cart-items' className={isActiveHash("#cart-items") ? "active-link" : ""}><i class="fa-solid fa-cart-shopping pe-4"></i> Cart</Link>
                            <Link to='/dashboard#order-list' className={isActiveHash("#order-list") ? "active-link" : ""}><i class="fa-solid fa-box-open pe-4"></i> Orders</Link>
                        </div> : <></>}
                    </div>
                    <div className="center-bottom col-12 h-auto">
                        {user !== null && user.role === 'admin' ? 
                            <div className="text d-flex flex-column ">
                                <span className='p-2 fw-medium' style={{fontSize : '12px' , letterSpacing : '0.8px'}}>MANAGMENT</span>

                                <NavLink to='/admin-dashboard' className={({ isActive }) => isActive ? "active-link" : ""}><i class="fa-solid fa-chart-pie pe-4"></i> Admin Dashboard</NavLink>
                                <Link to='/admin-dashboard#manage-products' className={isActiveHash("#manage-products") ? "active-link" : ""}><i class="fa-solid fa-box pe-4"></i> Manage Products</Link>
                                <Link to='/admin-dashboard#reports' className={isActiveHash("#reports") ? "active-link" : ""}><i class="fa-solid fa-newspaper pe-4"></i> Reports</Link>
                                <Link to='/admin-dashboard#feedbacks' className={isActiveHash("#feedbacks") ? "active-link" : ""}><i class="fa-solid fa-message pe-4"></i> Feedbacks</Link>
                                
                                <NavLink to='/admin-dashboard/admin-support-chat' className={({ isActive }) => isActive ? "active-link" : ""}><i class="fa-solid fa-comments pe-4"></i> Support Chat <span>{messagesCount < 9  ? messagesCount : '9+' }</span></NavLink> {/* add limit for messageCount (max 9 , after 9 return 9+) */}
                                
                            </div> : <></>
                        }
                    </div>
                    <div className="center-auth col-12 h-auto">
                        {!cookies.token ? <div className="text d-flex flex-column">
                            <span className='p-2 fw-medium' style={{fontSize : '12px' , letterSpacing : '0.8px'}}>SIGNUP / LOGIN</span>
                            <NavLink to='/login' className={({ isActive }) => isActive ? "active-link" : ""}>Login</NavLink>
                            <NavLink to='/sign' className={({ isActive }) => isActive ? "active-link" : ""}>Sign</NavLink>
                        </div> : <></>}
                    </div>
                </div>
                <div className="sidebar-end  d-flex flex-column"> 
                    <span className='p-2 fw-medium' style={{fontSize : '12px' , letterSpacing : '0.8px'}}>HELP</span>
                    <NavLink to={'/faq'} className={({ isActive }) => isActive ? "active-link" : ""}><i class="fa-solid fa-circle-question pe-4"></i> FAQ</NavLink>
                    <NavLink to={`/leave-feedback`} className={({ isActive }) => isActive ? "active-link" : ""}><i class="fa-solid fa-comment-dots pe-4"></i> Feedback</NavLink>
                    <NavLink to={'/report-platform'} className={({ isActive }) => isActive ? "active-link" : ""}><i class="fa-solid fa-flag pe-4"></i> Report</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Sidebar

