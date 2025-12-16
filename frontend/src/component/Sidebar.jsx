import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'

const Sidebar = ({ isAdmin }) => {

    const [cookies] = useCookies(['token'])

    return(
        <div className="sidebar-container d-flex flex-column justify-content-between border h-100 position-static" style={{maxHeight:"100vh"}}>
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
                        <Link to='/dashboard'>Cart</Link>
                        <Link to='/dashboard'>Saved</Link>
                    </div> : <></>}
                </div>
                <div className="center-bottom col-12 h-auto">
                    {isAdmin ? <div className="text d-flex flex-column">
                        <Link>Admin Dashboard</Link>
                        <Link>Product Pendings</Link>
                        <Link>Add New Products</Link>
                        <Link>Reports</Link>
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
                    <Link>Settings</Link>
                    <Link>Help</Link>
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