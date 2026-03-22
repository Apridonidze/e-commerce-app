import axios from "axios";
import { BACKEND_URL } from "../../../config";

import { useState, useEffect, useContext } from "react"
import { useCookies } from "react-cookie";
import { UserContext } from "../../context/UserContext";


const ManageAdmins = ({ setToggleManageAdmins, setAdmins, admins }) => {

    const [ cookies ] = useCookies(['token'])
    const { user } = useContext(UserContext);

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

    const handleAddAdmin = async(id) => {
        try{

            const response = await axios.post(`${BACKEND_URL}/api/admin`, {id} , {headers: {Authorization  : `Bearer ${cookies.token}`}})

            if(response.status === 200){
                admins.offlineAdmins.push(id);
            }

        }catch(err){
            // return alert message
            
            if(err.status === 400){
                // toggle error message
            }

            console.log(err)
        }
    }

    const handleRemoveAdmin = async(id) => {
        try{

            const response = await axios.delete(`${BACKEND_URL}/api/admin/${id}` , {headers: {Authorization  : `Bearer ${cookies.token}`}})

            if(response.status === 200){
                console.log(response)
                // toggle success message and tell them to refreshh page to seee updated admin list
            }

        }catch(err){
            console.log(err)
        }
    }

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
                                <button onClick={() => handleAddAdmin(u.id)} disabled={admins?.offlineAdmins.some(adm => adm.id == u.id) || admins?.onlineAdmins.some(adm => adm.id == u.id)}>Promote</button>
                            </div>
                    ))) : dataList?.length === 0 ? <p></p>  : <p>No users found</p>}
                </div>
            </div>

            <div className="admin-lists">
                {admins?.onlineAdmins.length ? admins?.onlineAdmins.map((admin, adminId) => 
                <div className="admin d-flex justify-content-between" key={adminId}>
                    <div className="admin-start">
                        <span>{admin.fullname}</span>
                        <button onClick={() => handleRemoveAdmin(admin.id)} disabled={user.id === admin.id ? true : false}>Remove</button>
                    </div>
                </div>
            ) : 'No Admins Online'}

            {admins?.offlineAdmins.length ? admins?.offlineAdmins.map((admin, adminId) => 
                <div className="admin d-flex justify-content-between" key={adminId}>
                    <div className="admin-start">
                        <span>Fullname : {admin.fullname}</span>
                        <button onClick={() => handleRemoveAdmin(admin.id)} disabled={user.id === admin.id ? true : false}>Remove</button>
                    </div>
                </div>
            ) : 'No Offline Admins'}
            </div>
        </div>
    )
}

export default ManageAdmins