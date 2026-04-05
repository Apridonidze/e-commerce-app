import axios from "axios"; //importing axios library
import { BACKEND_URL } from "../../config"; //importing backend url from config file

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";  //importing react-router library's utilities

import { useContext, useEffect, useState } from "react"; //importing react hooks

import { UserContext } from "../context/UserContext";
import { useTheme, useToggle } from "../context/ThemeContext"; //importing context api

import '../styles/layout.css'; //importing css file

const Header = ({ setProducts, setToggleAlert, fetchProducts }) => {

    const { user } = useContext(UserContext);

    const regexContainsSpecial = /[^\w\s]/; //regex to validate search input
    const [searchItem, setSearchItem] = useState(''); //search input state
    
    const location = useLocation(); //defining useLocation
    const { theme, toggleTheme } = useTheme(); //defining theme context
    const { toggle , toggleSidebar} = useToggle(); //defining sidebar toggle contxext

    const fetchDataList = async() => {

        if(searchItem.trim().length < 1 || searchItem.trim() === "" || searchItem === "" || 
        searchItem.trim() === undefined || searchItem.trim() === null || searchItem.length > 30 || 
        regexContainsSpecial.test(searchItem)) return fetchProducts() ; //validating search input and returning empty promise if input is invalid

        try{

            const response = await axios.post(`${BACKEND_URL}/api/product/search-product` , {searchItem : searchItem , type : location?.pathname.split('/')[1]}); //calling api and passing parameters
 
            if(response.status === 204)setProducts([]); //handing 204 status code
            if(response.status === 200)setProducts(response.data.products) ; //handling 200 status code 

        }catch(err){
            setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});
        };
    };

    useEffect(() => {

        if(location.pathname == '/' || location.pathname == '/sales' ) fetchDataList(); // checking location of from which path api call is made (only Main and OnSale pages are allowed to make this api call) and executing function if route is valid
        return; //else returning empty promise

    },[searchItem]); //logic executes on searchItem dependency change

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
                    <button className="btn" style={{fontSize: "18px", border : 'none'}} onClick={() => toggleTheme(theme === 'light' ? 'dark' : 'light')}>{theme == 'dark' ? <i class="fa-solid fa-moon"></i> :  <i class="fa-solid fa-sun"></i> }</button>
                    <div className="user d-flex gap-2 align-items-center">
                        <Link to='/dashboard' className="text-decoration-none ">
                            <small><strong>{user?.fullname}</strong> <br /> <span >{user?.email.length > 20 ? user?.email.slice(0, 21) : user?.email}</span></small>
                        </Link>
                        <Link to='/dashboard'><i class="fa-regular fa-user border border-2 border-dark rounded-5 px-3 py-2 d-flex align-items-center justify-content-center" style={{fontSize: "18px", border : 'none'}}></i></Link>
                    </div>
                </div>
                <button className="menu btn border-0" onClick={() => toggleSidebar(!toggle)}><i class="fa-solid fa-bars" style={{fontSize: "18px", border : 'none'}}></i></button>
            </div>
            
        </header>
    );
};

export default Header;//exporting component