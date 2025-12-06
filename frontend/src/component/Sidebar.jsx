import { Link } from 'react-router-dom'

const Sidebar = () => {
    return(
        <div className="sidebar-container">
            <div className="sidebar-top">
            </div>
            <div className="sidebar-center">
                <div className="center-header">
                    <Link>Discover</Link>
                    <Link>Product</Link>
                    <Link>Top Sellers</Link>
                    <Link>Contact</Link>
                </div>
                <div className="center-center"> {/**if clicked and user does not have cookies popup sign/login alert message */}
                    <Link>Add New Product</Link>
                    <Link>My Products</Link>
                </div>
                <div className="center-bottom">{/**trigger it when user has cookies and role === admin */}
                    <Link>Reports</Link>
                    <Link>Dashboard</Link>
                </div>
                <div className="center-auth"> {/**trigger it when user does not have cookies */}
                    <Link>Login</Link>
                    <Link>Sign</Link>
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