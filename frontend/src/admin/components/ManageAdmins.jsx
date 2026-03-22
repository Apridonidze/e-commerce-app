import axios from "axios";
import { BACKEND_URL } from "../../../config";

import { useState, useEffect } from "react"
import { useCookies } from "react-cookie";


const ManageAdmins = ({ setToggleManageAdmins, setAdmins, admins }) => {

    const [ cookies ] = useCookies(['token'])

    const [selectedUser, setSelectedUser] = useState();
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

            if(response.status === 204){
                setDataList([null]);
            }

        }catch(err){

            // toggle alert message
            console.log(err)
        }
    
    }

    useEffect(() => {

        if(searchItem.length === 0) setDataList([])
        
        fetchDataList()

    },[searchItem]) 

    return(
        <div className="manage-admins-container position-relative bg-white w-100" style={{zIndex : 999}}>
            <div className="manage-admins-header">
                <h4>Manage Admins</h4>
                <button onClick={() => setToggleManageAdmins(false)}>Close</button>
            </div>

            <div className="search-bar">
                <div className="form-floating">
                    <input type="text" id="searchUsers" className='form-control' placeholder="Searchs Users..." list="searchlist" onChange={(e) => {setSearchItem(e.target.value); if(dataList.length === 0 || dataList[0] === null) return ; const selected = dataList.find((u) => u.fullname === e.target.value);if (selected) setSelectedUser(selected.id)}} value={searchItem} tabIndex={1}/>
                    <label htmlFor="searchUsers">Searchs Users...</label>
                </div>
                <div className="data-list">
                    {dataList[0] !== null ? (
                        dataList.map(u => (
                            <div key={u.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                <span>{u.fullname} - {u.email}</span>
                                <button onClick={() => makeAdmin(u.id)}>Make Admin</button>
                            </div>
                    ))) : dataList?.length === 0 ? <p></p>  : <p>No users found</p>}
                </div>
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