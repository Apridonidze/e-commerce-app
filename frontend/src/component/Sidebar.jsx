import { Link } from 'react-router-dom'

const Sidebar = () => {
    return(
        <div className="sidebar-container">
            <div className="sidebar-top">
            </div>
            <div className="sidebar-center">
                <div className="center-header">
                    <Link>Home</Link>
                    <Link>Discover</Link> {/**make it dropdownable for dropdown categories */}
                    <Link>Product</Link>
                </div>
                <div className="center-bottom">{/** make it visible only for admins */}
                    <Link>Add New Product</Link>
                    <Link>Update Products</Link>
                    <Link>Dashboard</Link>
                </div>
            </div>
            <div className="sidebar-end"> 
                <div className="end-start"></div>
                <div className="end-bottom"></div>
            </div>
        </div>
    )
}

export default Sidebar