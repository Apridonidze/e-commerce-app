import axios from "axios";
import { BACKEND_URL } from "../../../config";

import { useState, useEffect, useContext, useRef } from "react"
import { useCookies } from "react-cookie";
import { UserContext } from "../../context/UserContext";
import AdminRow from "./AdminRow";


const ManageAdmins = ({ setToggleManageAdmins, setAdmins, admins, setToggleAlert }) => {

    const [ cookies ] = useCookies(['token'])
    const { user } = useContext(UserContext);

    const [selectedUser, setSelectedUser] = useState();
    const [dataList,setDataList] = useState([]);
    const [searchItem, setSearchItem] = useState('');

    const btnRefs = useRef([null])

    const regexContainsSpecial = /[^\w\s]/;

    let adminList = [...admins?.onlineAdmins , ...admins?.offlineAdmins]


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

            setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message

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
                btnRefs.current = btnRefs.current.filter(ref => ref.value == id);
                btnRefs.current.disabled = true
                setAdmins(prev => ({...prev,offlineAdmins: [...prev.offlineAdmins, id]}));
                adminList.push({id , fullname : "placeholder  for fullname"})
            }

        }catch(err){
            // return alert message
            
            if(err.status === 400) return setToggleAlert({status: true, type: "Failed", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message
            if(err.status === 404) return setToggleAlert({status: true, type: "Failed", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message
            return setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message

        }
    }

    const handleRemoveAdmin = async(id) => {
        try{

            const response = await axios.delete(`${BACKEND_URL}/api/admin/${id}` , {headers: {Authorization  : `Bearer ${cookies.token}`}})

            if(response.status === 200){
                setAdmins(prev => ({...prev, onlineAdmins: prev.onlineAdmins.filter(a => a !== id), offlineAdmins: prev.offlineAdmins.filter(a => a != id)}));
                adminList.filter(adm => adm.id !== id)
                // toggle success message and tell them to refreshh page to seee updated admin list
            }

        }catch(err){
            if(err.status === 400) return setToggleAlert({status: true, type: "Failed", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message
            return setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message
        }
    }

    console.log(dataList)

    return(
        <div className="manage-admins-container position-relative p-3 rounded-3" style={{zIndex : 999}}>
            
            <div className={`data-list-bg d-${dataList.length == 0 ? 'none'  : 'flex'}`} onClick={() => setSearchItem('')}></div>

             <div className="manage-admin-header py-2 d-flex justify-content-between">
                <h4> <i class="fa-solid fa-user-group me-2" style={{color: "#10b981"}}></i> Admin Squad</h4>
                <button className="btn btn-none border-0" onClick={() => setToggleManageAdmins(false)}><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div className="search-bar position-relative">
                <div className="form-floating" style={{zIndex : 999}}>
                    <input type="text" id="searchUsers" className='form-control' placeholder="Searchs Users..." list="searchlist" onChange={(e) => {setSearchItem(e.target.value); if(dataList.length === 0 || dataList[0] === null) return ; const selected = dataList.find((u) => u.fullname === e.target.value);if (selected) setSelectedUser(selected.id)}} value={searchItem} tabIndex={1}/>
                    <label htmlFor="searchUsers">Searchs Users...</label>
                </div>
                
                <div className={`data-list p-2 d-${dataList.length ==  0 ? 'none'  : 'flex'} flex-column gap-2`} >
                    <span className="text-secondary">Search Results ( {dataList[0] !== null ? dataList.length : 0} )</span>
                    {dataList[0] !== null ? (
                        dataList?.map((u, uId) => (
                            <div className="admin-search-row py-2 px-3 rounded-3 d-flex align-items-center justify-content-between" key={u.id}>
                                <span>{u.fullname} - {u.email}</span>
                                <button className="promoteBtn btn-0 border-0" value={u.id} onClick={() => handleAddAdmin(u.id)} disabled={admins?.offlineAdmins.some(adm => adm.id == u.id) || admins?.onlineAdmins.some(adm => adm.id == u.id)} ref={(e) => btnRefs.current[uId] = e}><i class="fa-solid fa-user-shield"></i> Promote</button>
                            </div>
                    ))) : <div className="emptyAdminRow py-2 px-3 rounded-3 d-flex w-100 "><span><i class="fa-solid fa-user-slash"></i> No User Found</span></div>}
                    <span className="text-secondary text-center mt-3" style={{fontSize : '14px'}}>End of results for "{searchItem}"</span>
                </div>
            </div>

            <div className="admin-lists d-flex flex-column gap-2 mt-2">
                {adminList.length ? adminList?.map(admin => 
                    <AdminRow admin={admin} status={admins.onlineAdmins.some(adm => adm.id === admin.id) ? true : false} disabled={user.id === admin.id ? true : false} handleRemoveAdmin={handleRemoveAdmin}/>
                ) : 'empty row'}
            </div>
        </div>
    )
}

export default ManageAdmins