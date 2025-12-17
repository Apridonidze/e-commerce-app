import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Link, NavLink } from 'react-router-dom'
import { useEffect , useState } from 'react'
import { BACKEND_URL } from '../../config'
const Sidebar = () => {

    const [ cookies ] = useCookies(['token'])
    const [ isAdmin, setIsAdmin ] = useState(null)

    useEffect(() => {

        const fetchStatus = async() => {

            try{

                await axios.get(`${BACKEND_URL}/admin` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) ; setIsAdmin(resp.data.isAdmin)})

            }catch(err){
                console.log(err)
            }

        }
        
        return () => {fetchStatus()};

    },[])

    return(
        <div className="sidebar-container d-flex flex-column justify-content-between border position-sticky " style={{maxHeight:"100vh"}}>
            <div className="sidebar-top">

            </div>
            <div className="sidebar-center row g-4">
                <div className="center-header col-12 h-auto">
                    <div className="text d-flex flex-column">
                        <Link to='/home-page'>Home</Link>
                        <Link>Top Products</Link>
                    </div>
                </div>
                <div className="center-center col-12 h-auto">
                    {cookies.token ? <div className="text d-flex flex-column">
                        <Link to='/dashboard'>Dashboard</Link>
                        <Link to='/dashboard#cart-items'>Cart</Link>
                        <Link to='/dashboard#saved-items'>Saved</Link>
                    </div> : <></>}
                </div>
                <div className="center-bottom col-12 h-auto">
                    {isAdmin !== null && isAdmin ? <div className="text d-flex flex-column">
                        <Link to='/admin-dashboard'>Admin Dashboard</Link>
                        <Link to='/admin-dashboard#manage-products'>Manage Products</Link>
                        <Link to='/admin-dashboard#reports'>Reports</Link>
                    </div> : <></>}
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
                    <Link>Help</Link>
                    <Link>Feedback</Link>
                    <Link>Settings</Link>
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

export default Sidebar