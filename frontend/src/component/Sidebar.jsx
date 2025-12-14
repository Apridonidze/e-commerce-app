import { Link } from 'react-router-dom'

const Sidebar = () => {
    return(
        <div className="sidebar-container d-flex flex-column justify-content-between border h-100 position-static" style={{maxHeight:"100vh"}}>
            <div className="sidebar-top">

            </div>
            <div className="sidebar-center row g-4">
                <div className="center-header col-12 h-auto">
                    <div className="text d-flex flex-column">
                        <Link to='/home-page'>Home</Link>
                        <Link>Top Sellers</Link>
                        <Link>Contact</Link>
                    </div>
                </div>
                <div className="center-center col-12 h-auto"> {/**if clicked and user does not have cookies popup sign/login alert message */}
                    <div className="text d-flex flex-column">
                        <Link>Add New Product</Link>
                        <Link to='/dashboard'>Dashboard</Link>
                    </div>
                </div>
                <div className="center-bottom col-12 h-auto">{/**trigger it when user has cookies and role === admin */}
                    <div className="text d-flex flex-column">
                        <Link>Reports</Link>
                        <Link>Dashboard</Link>
                    </div>
                </div>
                <div className="center-auth col-12 h-auto"> {/**trigger it when user does not have cookies */}
                    <div className="text d-flex flex-column">
                        <Link to='/login'>Login</Link>
                        <Link to='/sign'>Sign</Link>
                    </div>
                </div>
            </div>
            <div className="sidebar-end"> 
                <div className="end-start">
                    <span>Settings</span>
                    <span>Help</span>
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