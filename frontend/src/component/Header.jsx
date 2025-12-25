import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import { BACKEND_URL } from "../../config";

import { Link } from "react-router-dom";

const Header = ({ setProducts }) => {

    const [dataList,setDataList] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    useEffect(() => {
        const fetchDataList = async() => {

            try{
                await axios.get(`${BACKEND_URL}/products/item-data-list?searchItem=${searchItem}`).then(resp => {console.log(resp) ; setDataList(resp.data.products) ; setProducts(resp.data.products)})
            }catch(err){
                console.log(err)
            }

        }

        return () => {fetchDataList()}
    },[searchItem]) 

    return(
        <div className="header-container  d-flex justify-content-between">

            <div className="header-start">
                <div className="input-group  align-items-center ">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" className='form-control' list="searchlist" onChange={(e) => setSearchItem(e.target.value)} value={searchItem}/>
                    <datalist id="searchlist">
                        {dataList?.map((dl, dlId) => <option key={dlId}>{dl.title}</option>)}
                    </datalist>
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

export default Header