import { useContext, useState } from "react";

import { useTheme, useToggle } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";

import { Link } from "react-router-dom";

const AdminHeader = ({ onClick }) => {


    const { user } = useContext(UserContext);

    const [searchItem, setSearchItem] = useState(''); //search input state
    
    const { theme, toggleTheme } = useTheme(); //defining theme context
    const { toggle , toggleSidebar} = useToggle(); //defining sidebar toggle contxext


    return(
        <header className="header-container d-flex justify-content-between align-items-center px-2 py-3 rounded-3" >

            <div className="header-start">
                <div className="headerSearchInput input-group">
                    
                    <span className="input-group-text " style={{fontSize : '15px'}}><i className="fa-solid fa-magnifying-glass"></i></span>
                    <input type="text" id="searchlist" name="searchlist" className='form-control border-0 shadow-none' placeholder="Search Products..." onChange={(e) => setSearchItem(e.target.value)} style={{fontSize : '15px'}} value={searchItem} tabIndex={1}/>
                    
                </div>
            </div>

            <div className="header-end d-flex align-items-center gap-2">

                <div className="side-buttons gap-3">
                    <button className="createBtn btn btn-none border-0" onClick={onClick}><i class="fa-solid fa-plus text-white me-1"></i> Create Product</button>
                    <button className="btn" style={{fontSize: "18px", border : 'none'}} onClick={() => toggleTheme(theme === 'light' ? 'dark' : 'light')}>{theme == 'dark' ? <i class="fa-solid fa-moon"></i> :  <i class="fa-solid fa-sun"></i> }</button>
                    {user ? <div className="user d-flex gap-2 align-items-center" >
                        <Link to='/dashboard' className="text-decoration-none ">
                            <small ><strong>{user?.fullname}</strong> <br /> <span >{user?.email.length > 20 ? user?.email.slice(0, 21) : user?.email}</span></small>
                        </Link>
                        <Link to='/dashboard'><i class="fa-regular fa-user border border-2 border-dark rounded-3 px-3 py-2 d-flex align-items-center justify-content-center" style={{fontSize: "18px", border : 'none'}}></i></Link>
                    </div> : <></>}
                </div>
                <button className="menu btn border-0" onClick={() => toggleSidebar(!toggle)}><i class="fa-solid fa-bars" style={{fontSize: "18px", border : 'none'}}></i></button>
            </div>
            
        </header>
    );
};

export default AdminHeader