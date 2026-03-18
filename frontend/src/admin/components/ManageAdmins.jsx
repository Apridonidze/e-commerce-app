import { useState, useEffect } from "react"


const ManageAdmins = ({ setToggleManageAdmins, setAdmins, admins }) => {

    const [dataList,setDataList] = useState([]);
    const [searchItem, setSearchItem] = useState('');

    const regexContainsSpecial = /[^\w\s]/;


    const fetchDataList = async() => {

        if(searchItem.trim().length < 1 || searchItem.trim() === "" || searchItem === "" || 
        searchItem.trim() === undefined || searchItem.trim() === null || searchItem.length > 30 || 
        regexContainsSpecial.test(searchItem))return;


        try{
            await axios.get(`${BACKEND_URL}/api/products/item-data-list?searchItem=${searchItem}`).then(resp => {console.log(resp) ; setDataList(resp.data.products) ; setProducts(resp.data.products)})
        }catch(err){
            console.log(err)
        }
    
    }

    useEffect(() => {
        fetchDataList()
    },[searchItem]) 

    return(
        <div className="manage-admins-container position-relative bg-white w-100" style={{zIndex : 999}}>
            <div className="manage-admins-header">
                <h4>Manage Admins</h4>
                <button onClick={() => setToggleManageAdmins(false)}>Close</button>
            </div>

            <div className="search-bar">
                <input type="text" className='form-control' list="searchlist" onChange={(e) => setSearchItem(e.target.value)} value={searchItem} tabIndex={1}/>
                <datalist id="searchlist">
                    {dataList?.map((dl, dlId) => <option key={dlId} value={dl.title} />)}
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