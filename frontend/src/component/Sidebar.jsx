import { Link } from 'react-router-dom'

import Icon from '../assets/icons/logo-base.png'
import Bar from '../assets/icons/bars.png'

const Sidebar = () => {
    return(
        <div className="sidebar-container">
            <div className="sidebar-top">
                <img src={Icon} alt="Logo Icon" />
                <img src={Bar} alt="Bars Icon" />
            </div>
            <div className="sidebar-center">
                <div className="center-header">
                    <Link>Home</Link>
                    <Link>Discover</Link>
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