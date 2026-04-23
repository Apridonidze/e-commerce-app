import axios from "axios";
import { useCookies } from "react-cookie"; //importing react libraries

import { UserContext } from "../../context/UserContext"; //importing user context
import { BACKEND_URL } from "../../../config"; //defining backend url from config file

import { useState, useEffect, useContext, useRef } from "react"; //imporrting react hooks

import AdminRow from "./AdminRow"; //importing react component
const ManageAdmins = ({ setToggleManageAdmins, setAdmins, admins, setToggleAlert }) => { //importing params from parent component (AdminDashboard.jsx)

    const { user } = useContext(UserContext); //defining user context

    const [ cookies ] = useCookies(['token']); //defining user cookies
    const config = {headers: {Authorization  : `Bearer ${cookies.token}`}}; //defining headers that api will use

    const [dataList,setDataList] = useState([]);
    const [searchItem, setSearchItem] = useState(''); //component states for searched admins

    const [adminList , setAdminList] = useState([...admins?.onlineAdmins , ...admins?.offlineAdmins]); //all admins state
    const btnRefs = useRef([null]); //promote button refs 

    
    const fetchDataList = async() => {
        
        const regexContainsSpecial = /[^\w\s]/; //regex to validate search input

        if(searchItem.trim().length < 1 || searchItem.trim() === "" || searchItem === "" || 
        searchItem.trim() === undefined || searchItem.trim() === null || searchItem.length > 30 || 
        regexContainsSpecial.test(searchItem)) return; //returning empty promise if any of the given case is given  

        try{
            const response = await axios.get(`${BACKEND_URL}/api/admin/search-users?targetUser=${searchItem}` , config); //calling api to search admins

            if(response.status === 200) return setDataList(response.data.users); //handling 200 status code
            if(response.status === 204) return setDataList([null]);//handling 204 status code

        }catch(err){//handling errors
            setDataList([null]); //setting empty array in datalist state
            setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message
        };
    };

    useEffect(() => {

        if(searchItem.length === 0) setDataList([]); //checking search input length and settign state into empty array if its clear
        fetchDataList() ; //calling api if input is not empty

    },[searchItem]); //executing login on searchItem state change only

    const handleAddAdmin = async(id, fullname) => { //recieving values
        try{
            const response = await axios.post(`${BACKEND_URL}/api/admin`, { id } , config); //making api call and passing params with headers

            if(response.status === 200){ //handling 200 status code
                btnRefs.current = btnRefs.current.filter(ref => ref.value == id); //targeting promote button of newly added admins row
                btnRefs.current.disabled = true; //disabling it instantly
                
                setSearchItem(''); //clearing input after adding user
                setAdmins(prev => ({...prev,offlineAdmins: [...prev.offlineAdmins, {id , fullname }]})); //updating parent state
                setAdminList(prev => [...prev, {id , fullname}]); // updating local admins state
            };

        }catch(err){
            
            setAdminList(prev); //setting prev value in state

            if(err.status === 400) return setToggleAlert({status: true, type: "Failed", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message
            if(err.status === 404) return setToggleAlert({status: true, type: "Failed", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message
            return setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message
        };
    };

    const handleRemoveAdmin = async(id) => {//recieving values
        try{
            
            const response = await axios.delete(`${BACKEND_URL}/api/admin/${id}` , config); //making api call

            setAdmins(prev => ({...prev, onlineAdmins: (prev.onlineAdmins || []).filter(a => a.id !== id), offlineAdmins: (prev.offlineAdmins || []).filter(a => a.id !== id),})); //filtering parent state from deleted user instantly
            setAdminList(prev => prev.filter(adm => adm.id !== id)); //filtering local state from delete user
            
            setToggleAlert({status: true, type: "Success", statusCode: 200, message: response.data.message})

        }catch(err){
            
            setAdmins(prev);
            setAdminList(prev); //setting previous value in states

            if(err.status === 400) return setToggleAlert({status: true, type: "Failed", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message
            return setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message
        };
    };

    useEffect(() => {
        
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden'; //hiding overflowed elements from body
            
        return () => {document.documentElement.style.overflow = ''; document.body.style.overflow = ''}; //cleanup funciton

    }, []); //triggering fucntion on toggleAddToCart status chagnes

    return(
        <div className="manage-admins-container position-relative p-3 rounded-3 mx-auto" style={{zIndex : 999}}>
           
            <div className={`data-list-bg d-${dataList.length == 0 ? 'none'  : 'flex'}`} onClick={() => setSearchItem('')}></div>

            <div className="manage-admin-header py-2 d-flex justify-content-between">
                <h4> <i class="fa-solid fa-user-group me-2" style={{color: "#10b981"}}></i> Admin Squad</h4>
                <button className="btn btn-none border-0" onClick={() => setToggleManageAdmins(false)}><i class="fa-solid fa-xmark"></i></button>
            </div>
            
            <div className="search-bar position-relative">
                
                <div className="form-floating" style={{zIndex : 999}}>
                    <input type="text" id="searchUsers" className='form-control' placeholder="Filter by name or email..." list="searchlist" onChange={(e) => {setSearchItem(e.target.value); if(dataList.length === 0 || dataList[0] === null) return;}} value={searchItem} tabIndex={1}/>
                    <label htmlFor="searchUsers">Filter by name or email...</label>
                </div>
                
                <div className={`data-list p-2 d-${dataList.length ==  0 ? 'none'  : 'flex'} flex-column gap-2`} >
                    <span className="text-secondary">Search Results ( {dataList[0] !== null ? dataList.length : 0} )</span>
                    {dataList[0] !== null ? (
                        dataList?.map((u, uId) => (
                            <div className="admin-search-row py-2 px-3 rounded-3 d-flex align-items-center justify-content-between" key={u.id}>
                                <span>{u.fullname} - {u.email}</span>
                                <button className="promoteBtn btn-0 border-0" value={u.id} onClick={() => handleAddAdmin(u.id, u.fullname)} disabled={admins?.offlineAdmins.some(adm => adm.id == u.id) || admins?.onlineAdmins.some(adm => adm.id == u.id)} ref={(e) => btnRefs.current[uId] = e}><i class="fa-solid fa-user-shield"></i> Promote</button>
                            </div>
                    ))) : <div className="emptyAdminRow py-2 px-3 rounded-3 d-flex w-100 "><span><i class="fa-solid fa-user-slash"></i> No User Found</span></div>}
                    <span className="text-secondary text-center mt-3" style={{fontSize : '14px'}}>End of results for "{searchItem}"</span>
                </div>

            </div>

            <div className="admin-lists d-flex flex-column gap-2 mt-2">
                {adminList.length ? adminList?.map(admin => 
                    <AdminRow admin={admin} status={admins.onlineAdmins.some(adm => adm.id === admin.id) ? true : false} disabled={user.id === admin.id ? true : false} handleRemoveAdmin={handleRemoveAdmin} />
                ) : <></>}
            </div>

        </div>
    );
};

export default ManageAdmins; //exportring component