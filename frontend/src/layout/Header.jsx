import axios from "axios"; //importing axios library
import { BACKEND_URL } from "../../config"; //importing backend url from config file

import { useEffect, useState } from "react"; //importing react hooks

import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom"; //importing react-router library

import { useTheme, useToggle } from "../context/ThemeContext"; //importing context api

const Header = ({ setProducts, setToggleAlert, toggleAlert }) => {

    const regexContainsSpecial = /[^\w\s]/; //regex to validate search input
    const [searchItem, setSearchItem] = useState(''); //search input state
    
    const location = useLocation(); //defining useLocation
    const { theme, toggleTheme } = useTheme(); //defining theme context
    const { toggle , toggleSidebar} = useToggle(); //defining sidebar toggle contxext

    const fetchDataList = async() => {

        if(searchItem.trim().length < 1 || searchItem.trim() === "" || searchItem === "" || 
        searchItem.trim() === undefined || searchItem.trim() === null || searchItem.length > 30 || 
        regexContainsSpecial.test(searchItem))return; //validating search input and returning empty promise if input is invalid

        try{

            const response = await axios.post(`${BACKEND_URL}/api/product/search-product` , {searchItem , type : location?.pathname.split('/')[1]}); //calling api and passing parameters
            
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
        <div className="header-container  d-flex justify-content-between" >

            <div className="header-start">
                <div className="input-group  align-items-center ">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" className='form-control' list="searchlist" onChange={(e) => setSearchItem(e.target.value)} value={searchItem} tabIndex={1}/>
                </div>
            </div>

            <div className="header-end ">
                <button className="btn" onClick={() => toggleTheme(theme === 'light' ? 'dark' : 'light')}>{theme == 'dark' ? <i class="fa-solid fa-moon"></i> :  <i class="fa-solid fa-sun"></i> }</button>
                <Link to='/dashboard'><i class="fa-regular fa-user"></i></Link>
                <button className="btn" onClick={() => toggleSidebar(!toggle)}><i class="fa-solid fa-bars"></i></button>
            </div>
            
        </div>
    );
};

export default Header;//exporting component