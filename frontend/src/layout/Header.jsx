import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import { BACKEND_URL } from "../../config";
import { useLocation } from "react-router-dom";

const Header = ({ setProducts }) => {

    const [searchItem, setSearchItem] = useState('');

    const regexContainsSpecial = /[^\w\s]/;

    const location = useLocation()

    const fetchDataList = async() => {

        if(searchItem.trim().length < 1 || searchItem.trim() === "" || searchItem === "" || 
        searchItem.trim() === undefined || searchItem.trim() === null || searchItem.length > 30 || 
        regexContainsSpecial.test(searchItem))return;


        try{
            const response = await axios.post(`${BACKEND_URL}/api/product/search-product` , {searchItem , type : location?.pathname.split('/')[1]})
            if(response.status === 204){
                setProducts([])
            }
            setProducts(response.data.products)
            // .then(resp => {console.log(resp) ; setDataList(resp.data.products) ; setProducts(resp.data.products)})
        }catch(err){
            console.log(err)
        }
    
    }

    useEffect(() => {
        fetchDataList()
    },[searchItem])


    // make header.jsx reads its location with useLocation and do not trigger api call if it is on different route than Main.jsx

    // add menu button that is visible on small devices , make it add classList to sidebar that will be visible by the classlists

    return(
        <div className="header-container  d-flex justify-content-between" >

            <div className="header-start">
                <div className="input-group  align-items-center ">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" className='form-control' list="searchlist" onChange={(e) => setSearchItem(e.target.value)} value={searchItem} tabIndex={1}/>
                </div>
            </div>

            <div className="header-end ">
                <i class="fa-solid fa-moon"></i>
                <i class="fa-solid fa-sun"></i>
                <i class="fa-solid fa-basket-shopping"></i>
                <i class="fa-solid fa-bell"></i>
            </div>
            
        </div>
    )
}

// disable serach function when user is not on main page . use useLocation() to define where is header.jsx component decleared

export default Header