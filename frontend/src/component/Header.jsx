import { useEffect } from "react";
import { useState } from "react"

const Header = () => {

    const [dataList,setDataList] = useState([]);

    useEffect(() => {
        const fetchDataList = async() => {

            try{
                
            }catch(err){

            }

        }
    },[])

    return(
        <div className="header-container  d-flex justify-content-between">

            <div className="header-start  ">
                <div className="input-group  align-items-center ">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" className='form-control' list="searchlist"/>
                    <datalist id="searchlist">
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