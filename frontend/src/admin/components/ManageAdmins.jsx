import axios from "axios";
import { BACKEND_URL } from "../../../config";

import { useState, useEffect } from "react"
import { useCookies } from "react-cookie";


const ManageAdmins = ({ setToggleManageAdmins, setAdmins, admins }) => {

    const [ cookies ] = useCookies(['token'])

    const [dataList,setDataList] = useState([]);
    const [searchItem, setSearchItem] = useState('');

    const regexContainsSpecial = /[^\w\s]/;
    
    const fetchDataList = async() => {

        if(searchItem.trim().length < 1 || searchItem.trim() === "" || searchItem === "" || 
        searchItem.trim() === undefined || searchItem.trim() === null || searchItem.length > 30 || 
        regexContainsSpecial.test(searchItem))return;


        try{
            const response = await axios.get(`${BACKEND_URL}/api/admin/search-users?targetUser=${searchItem}` , {headers : {Authorization : `Bearer ${cookies.token}`}})

            console.log(response)

            if(response.status === 200) {
                setDataList(response.data.users)
            }

            if(response.status === 404){
                setDataList([]);
            }

        }catch(err){

            // toggle alert message
            console.log(err)
        }
    
    }

    useEffect(() => {
        fetchDataList()
    },[searchItem]) 


    // finish component functionalities

    return(
        <div className="manage-admins-container position-relative bg-white w-100" style={{zIndex : 999}}>
            <div className="manage-admins-header">
                <h4>Manage Admins</h4>
                <button onClick={() => setToggleManageAdmins(false)}>Close</button>
            </div>

            <div className="search-bar">
                <div className="form-floating">
                    <input type="text" id="searchUsers" className='form-control' placeholder="Searchs Users..." list="searchlist" onChange={(e) => setSearchItem(e.target.value)} value={searchItem} tabIndex={1}/>
                    <label htmlFor="searchUsers">Searchs Users...</label>
                </div>
                <datalist id="searchlist">
                    {dataList?.map(dl => <option key={dl.id} value={dl.fullname} label={`${dl.fullname} - ${dl.email}`} />)}
                </datalist>
            </div>

            <div className="admin-lists">
                {admins?.onlineAdmins.length ? admins?.onlineAdmins.map((admin, adminId) => 
                <div className="admin d-flex justify-content-between" key={adminId}>
                    <div className="admin-start">
                        <span>Fullname : {admin.fullname}</span>
                        <span>Id : {admin.id}</span>
                    </div>
                </div>
            ) : 'No Admins Online'}

            {admins?.offlineAdmins.length ? admins?.offlineAdmins.map((admin, adminId) => 
                <div className="admin d-flex justify-content-between" key={adminId}>
                    <div className="admin-start">
                        <span>Fullname : {admin.fullname}</span>
                        <span>Id : {admin.id}</span>
                    </div>
                </div>
            ) : 'No Offline Admins'}
            </div>
        </div>
    )
}

export default ManageAdmins