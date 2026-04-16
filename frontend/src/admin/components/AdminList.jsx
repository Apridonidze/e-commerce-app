import Admin from "./Admin"

const AdminList = ({ admins, setToggleManageAdmins }) => {

    let adminList = [...admins.onlineAdmins.slice(0, 3) , ...admins.offlineAdmins.slice(0, 2)].slice(0, 5)
    
    return(
        <div className="admin-list-container p-2">
            
            <div className="admin-header d-flex justify-content-between ms-3 mt-2">
                <h4> <i class="fa-solid fa-user-group me-2"></i> Admin Squad</h4>
                <button onClick={() => setToggleManageAdmins(true)}>Manage Admins <i class="fa-solid fa-arrow-right"></i></button>
            </div>

            <div className="row gap-3 m-3">
                {adminList.length ? adminList.map(admin => 
                    <Admin admin={admin} status={admins.onlineAdmins.some(adm => adm.id === admin.id) ? true : false}/>
                ) : 'No Admins Online'}
            </div>

        </div>
    )
}
export default AdminList